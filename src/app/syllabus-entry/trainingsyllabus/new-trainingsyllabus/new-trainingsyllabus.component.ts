import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { AuthService } from 'src/app/core/service/auth.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MasterData } from 'src/assets/data/master-data';
import { TrainingSyllabus } from '../../models/TrainingSyllabus';
import { TrainingSyllabusService } from '../../service/TrainingSyllabus.service';

@Component({
  selector: 'app-new-trainingsyllabus',
  templateUrl: './new-trainingsyllabus.component.html',
  styleUrls: ['./new-trainingsyllabus.component.sass']
})
export class NewTrainingSyllabusComponent implements OnInit {
  buttonText: string;
  pageTitle: string;
   masterData = MasterData;
  loading = false;
  destination: string;
  TrainingSyllabusForm: FormGroup;
  validationErrors: string[] = [];
  selectScoolName: SelectedModel[];
  selectedcoursedurationbyschoolname: SelectedModel[];
  selectedSubjectNamebyschoolnameAndCourse: SelectedModel[];
  selectCourseTask: SelectedModel[];
  selectTrainingObjective:SelectedModel[];
  trainingSyllabusList: TrainingSyllabus[];
  courseNameId: number;
  baseSchoolNameId: number;
  bnaSubjectNameId: number;
  isShown: boolean = false;
  courseName:any;
  
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

  displayedColumns: string[] = ['sl', 'schoolName', 'courseName', 'subjectName', 'courseTask', 'trainingObjective','syllabusDetail', 'actions'];

  constructor(private snackBar: MatSnackBar,private authService: AuthService, private TrainingSyllabusService: TrainingSyllabusService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('trainingSyllabusId');
    
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    if (id) {
      this.pageTitle = 'Edit Training Syllabus';
      this.destination = 'Edit';
      this.buttonText = "Update";
      this.TrainingSyllabusService.find(+id).subscribe(
        res => {
          this.TrainingSyllabusForm.patchValue({
            trainingSyllabusId:res.trainingSyllabusId,
            trainingObjectiveId: res.trainingObjectiveId,
            courseTaskId: res.courseTaskId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseDurationId: res.courseDurationId,
            courseNameId: res.courseNameId,
            bnaSubjectNameId: res.bnaSubjectNameId,
            syllabusDetail: res.syllabusDetail,
            t:res.t,
            p:res.p,
            m:res.m,
            course: res.courseName,
            remarks: res.remarks

          });
          //this.courseNameId = res.courseNameId;
         // this.courseName=res.courseNameId;
          console.log("Response");
          console.log(res);
          this.getSelectedSubjectNameBySchoolNameIdAndCourseNameId();
        }
      );
    } else {
      this.pageTitle = 'Create Training Syllabus';
      this.destination = 'Add';
      this.buttonText = "Save";
    }
    this.intitializeForm();
    if(this.role === 'Super Admin'){
      this.TrainingSyllabusForm.get('baseSchoolNameId').setValue(this.branchId);
    }
    this.getselectedBaseScoolName();
    //this.getSelectedSubjectNameBySchoolNameIdAndCourseNameId();
    this.getselectedCourseTask();
    this.getselectedTrainingObjective();
  }
  intitializeForm() {
    this.TrainingSyllabusForm = this.fb.group({
      trainingSyllabusId:[0],
      trainingObjectiveId: [],
      courseTaskId: [],
      baseSchoolNameId: [],
      courseDurationId: [],
      courseNameId: [],
      course: [''],
      bnaSubjectNameId: [],
      syllabusDetail: [''],
      t:[],
      p:[],
      m:[],
      remarks: [''],
      isActive: [true]

    })
    //autocomplete for Course
    this.TrainingSyllabusForm.get('course').valueChanges
      .subscribe(value => {
        this.getSelectedCourseName(value);
      })
  }
  getselectedBaseScoolName() {
    this.TrainingSyllabusService.getselectedBaseScoolName().subscribe(res => {
      this.selectScoolName = res
    });
  }
  //autocomplete for Course
  onCourseSelectionChanged(item) {
    console.log(item.value);
    this.courseNameId = item.value
    this.TrainingSyllabusForm.get('courseNameId').setValue(item.value);
    this.TrainingSyllabusForm.get('course').setValue(item.text);
  }
  //autocomplete for Course
  getSelectedCourseName(courseName) {
    this.TrainingSyllabusService.getselectedCourseName(courseName).subscribe(response => {
      this.getSelectedSubjectNameBySchoolNameIdAndCourseNameId()
      this.options = response;
      this.filteredOptions = response;
    })
  }
  getselectedCourseTask() {
    this.TrainingSyllabusService.getselectedCourseTask().subscribe(res => {
      this.selectCourseTask = res
    });
  }
  getselectedTrainingObjective() {
    this.TrainingSyllabusService.getselectedTrainingObjective().subscribe(res => {
      this.selectTrainingObjective = res
    });
  }
  getSelectedSubjectNameBySchoolNameIdAndCourseNameId() {

    var baseSchoolNameId = this.TrainingSyllabusForm.value['baseSchoolNameId'];
    var courseNameId = this.TrainingSyllabusForm.value['courseNameId'];
    this.TrainingSyllabusService.getselectedSubjectFromObjectiveBySchoolAndCourse(baseSchoolNameId, courseNameId).subscribe(res => {
      console.log(res);
      console.log("subject Id");
      this.selectedSubjectNamebyschoolnameAndCourse = res;
      

    });
  }
  onSubjectSelectionChange(dropdown) {
    this.isShown = true;
    if (dropdown.isUserInput) {
      this.TrainingSyllabusForm.get('bnaSubjectNameId').setValue(dropdown.source.value);
      // this.baseSchoolNameId = this.CourseTaskForm.get('baseSchoolNameId').value;
      // this.courseNameId = this.CourseTaskForm.get('courseNameId').value;
      // this.bnaSubjectNameId = dropdown.source.value;
      var baseSchoolNameId = this.TrainingSyllabusForm.value['baseSchoolNameId'];
      var courseNameId = this.TrainingSyllabusForm.value['courseNameId'];
      var bnaSubjectNameId = this.TrainingSyllabusForm.value['bnaSubjectNameId'];
      console.log(baseSchoolNameId + " -" + courseNameId + " -" + bnaSubjectNameId)
      this.TrainingSyllabusService.getSelectedSubjectShowTrainingSyllabuslist(baseSchoolNameId, courseNameId, bnaSubjectNameId).subscribe(response => {
        this.trainingSyllabusList = response;
        console.log(this.trainingSyllabusList);
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
    const id = this.TrainingSyllabusForm.get('trainingSyllabusId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.TrainingSyllabusService.update(+id, this.TrainingSyllabusForm.value).subscribe(response => {
            this.router.navigateByUrl('/syllabus-entry/add-trainingsyllabus');
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
      this.TrainingSyllabusService.submit(this.TrainingSyllabusForm.value).subscribe(response => {
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
    const id = row.trainingSyllabusId;
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.TrainingSyllabusService.delete(id).subscribe(() => {
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
