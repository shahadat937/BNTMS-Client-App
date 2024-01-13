import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { AuthService } from 'src/app/core/service/auth.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MasterData } from 'src/assets/data/master-data';
import { TrainingObjective } from '../../models/TrainingObjective';
import { TrainingObjectiveService } from '../../service/TrainingObjective.service';

@Component({
  selector: 'app-new-trainingobjective',
  templateUrl: './new-trainingobjective.component.html',
  styleUrls: ['./new-trainingobjective.component.sass']
})
export class NewTrainingObjectiveComponent implements OnInit {
  buttonText: string;
  pageTitle: string;
   masterData = MasterData;
  loading = false;
  destination: string;
  TrainingObjectiveForm: FormGroup;
  validationErrors: string[] = [];
  selectScoolName: SelectedModel[];
  selectedcoursedurationbyschoolname: SelectedModel[];
  selectedSubjectNamebyschoolnameAndCourse: SelectedModel[];
  selectCourseTask: SelectedModel[];
  trainingObjectiveList: TrainingObjective[];
  courseNameId: number;
  baseSchoolNameId: number;
  bnaSubjectNameId: number;
  isShown: boolean = false;

  role:any;
  traineeId:any;
  branchId:any;
  baseSchoolId:any;

  options = [];
  filteredOptions;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText = "";

  displayedColumns: string[] = ['sl', 'schoolName', 'courseName', 'subjectName', 'courseTask', 'trainingObjectDetail', 'actions'];

  constructor(private snackBar: MatSnackBar, private authService: AuthService, private TrainingObjectiveService: TrainingObjectiveService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('trainingObjectiveId');

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    if (id) {
      this.pageTitle = 'Edit Training Objective';
      this.destination = 'Edit';
      this.buttonText = "Update";
      this.TrainingObjectiveService.find(+id).subscribe(
        res => {
          this.TrainingObjectiveForm.patchValue({
            trainingObjectiveId: res.trainingObjectiveId,
            courseTaskId: res.courseTaskId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseDurationId: res.courseDurationId,
            courseNameId: res.courseNameId,
            bnaSubjectNameId: res.bnaSubjectNameId,
            trainingObjectDetail: res.trainingObjectDetail,
            course: res.courseName,
            remarks: res.remarks

          });
          this.courseNameId = res.courseNameId;
          this.getSelectedSubjectNameBySchoolNameIdAndCourseNameId();
        }
      );
    } else {
      this.pageTitle = 'Create Training Objective';
      this.destination = 'Add';
      this.buttonText = "Save";
    }
    this.intitializeForm();
    if(this.role === 'Super Admin'){
      this.TrainingObjectiveForm.get('baseSchoolNameId').setValue(this.branchId);
    }
    this.getselectedBaseScoolName();
    //this.getSelectedSubjectNameBySchoolNameIdAndCourseNameId();
    this.getselectedCourseTask();
  }
  intitializeForm() {
    this.TrainingObjectiveForm = this.fb.group({
      trainingObjectiveId: [0],
      courseTaskId: [],
      baseSchoolNameId: [],
      courseDurationId: [],
      courseNameId: [],
      course: [''],
      bnaSubjectNameId: [],
      trainingObjectDetail: [''],
      remarks: [''],
      isActive: [true]

    })
    //autocomplete for Course
    this.TrainingObjectiveForm.get('course').valueChanges
      .subscribe(value => {
        this.getSelectedCourseName(value);
      })
  }
  getselectedBaseScoolName() {
    this.TrainingObjectiveService.getselectedBaseScoolName().subscribe(res => {
      this.selectScoolName = res
    });
  }
  //autocomplete for Course
  onCourseSelectionChanged(item) {
    console.log(item.value);
    this.courseNameId = item.value
    this.TrainingObjectiveForm.get('courseNameId').setValue(item.value);
    this.TrainingObjectiveForm.get('course').setValue(item.text);
  }
  //autocomplete for Course
  getSelectedCourseName(courseName) {
    this.TrainingObjectiveService.getselectedCourseName(courseName).subscribe(response => {
      this.getSelectedSubjectNameBySchoolNameIdAndCourseNameId()
      this.options = response;
      this.filteredOptions = response;
    })
  }
  getselectedCourseTask() {
    this.TrainingObjectiveService.getselectedCourseTask().subscribe(res => {
      this.selectCourseTask = res
    });
  }
  getSelectedSubjectNameBySchoolNameIdAndCourseNameId() {

    var baseSchoolNameId = this.TrainingObjectiveForm.value['baseSchoolNameId'];
    var courseNameId = this.TrainingObjectiveForm.value['courseNameId'];
    this.TrainingObjectiveService.getselectedSubjectFromCourseTaskBySchoolAndCourse(baseSchoolNameId, courseNameId).subscribe(res => {
      console.log(res);
      console.log("subject Id");
      this.selectedSubjectNamebyschoolnameAndCourse = res;
      

    });
  }
  onSubjectSelectionChange(dropdown) {
    this.isShown = true;
    if (dropdown.isUserInput) {
      this.TrainingObjectiveForm.get('bnaSubjectNameId').setValue(dropdown.source.value);
      // this.baseSchoolNameId = this.CourseTaskForm.get('baseSchoolNameId').value;
      // this.courseNameId = this.CourseTaskForm.get('courseNameId').value;
      // this.bnaSubjectNameId = dropdown.source.value;
      var baseSchoolNameId = this.TrainingObjectiveForm.value['baseSchoolNameId'];
      var courseNameId = this.TrainingObjectiveForm.value['courseNameId'];
      var bnaSubjectNameId = this.TrainingObjectiveForm.value['bnaSubjectNameId'];
      console.log(baseSchoolNameId + " -" + courseNameId + " -" + bnaSubjectNameId)
      this.TrainingObjectiveService.getSelectedSubjectShowTrainingObjectivelist(baseSchoolNameId, courseNameId, bnaSubjectNameId).subscribe(response => {
        this.trainingObjectiveList = response;
        console.log(this.trainingObjectiveList);
      })
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit() {
    const id = this.TrainingObjectiveForm.get('trainingObjectiveId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.TrainingObjectiveService.update(+id, this.TrainingObjectiveForm.value).subscribe(response => {
            this.router.navigateByUrl('/syllabus-entry/add-trainingobjective');
            this.snackBar.open('Information Updated Successfully ', '', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success'
            });
          }, error => {
            this.validationErrors = error;
          })
        }
      })
    } else {
      this.loading=true;
      this.TrainingObjectiveService.submit(this.TrainingObjectiveForm.value).subscribe(response => {
        //this.router.navigateByUrl('/syllabus-entry/coursetask-list');
        this.reloadCurrentRoute();
        this.snackBar.open('Information Inserted Successfully ', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-success'
        });
      }, error => {
        this.validationErrors = error;
      })
    }


  }
  deleteItem(row) {
    const id = row.trainingObjectiveId;
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.TrainingObjectiveService.delete(id).subscribe(() => {
          //this.getCourseTasks();
          this.reloadCurrentRoute();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })

  }

}
