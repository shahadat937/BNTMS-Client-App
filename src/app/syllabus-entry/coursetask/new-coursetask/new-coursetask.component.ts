import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { AuthService } from 'src/app/core/service/auth.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MasterData } from 'src/assets/data/master-data';
import { CourseTask } from '../../models/CourseTask';
import { CourseTaskService } from '../../service/CourseTask.service';

@Component({
  selector: 'app-new-coursetask',
  templateUrl: './new-coursetask.component.html',
  styleUrls: ['./new-coursetask.component.sass']
})
export class NewCourseTaskComponent implements OnInit {
  buttonText: string;
  pageTitle: string;
   masterData = MasterData;
  loading = false;
  destination: string;
  CourseTaskForm: FormGroup;
  validationErrors: string[] = [];
  selectScoolName: SelectedModel[];
  selectedcoursedurationbyschoolname: SelectedModel[];
  selectedSubjectNamebyschoolnameAndCourse: SelectedModel[];
  courseTaskList: CourseTask[];
  courseNameId: any;
  courseDurationId:any;
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

  displayedColumns: string[] = ['sl', 'schoolName', 'courseName', 'subjectName', 'taskDetail', 'actions'];

  constructor(private snackBar: MatSnackBar, private authService: AuthService, private CourseTaskService: CourseTaskService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseTaskId');
    
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    if (id) {
      this.pageTitle = 'Edit Course Task';
      this.destination = 'Edit';
      this.buttonText = "Update";
      this.CourseTaskService.find(+id).subscribe(
        res => {
          this.CourseTaskForm.patchValue({

            courseTaskId: res.courseTaskId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId: res.courseNameId,
            bnaSubjectNameId: res.bnaSubjectNameId,
            taskDetail: res.taskDetail,
            course: res.courseName,
            remarks: res.remarks

          });
          this.courseNameId = res.courseNameId;
          this.getSelectedSubjectNameBySchoolNameIdAndCourseNameId();
        }
      );
    } else {
      this.pageTitle = 'Create Course Task';
      this.destination = 'Add';
      this.buttonText = "Save";
    }
    this.intitializeForm();
    if(this.role === 'Super Admin'){
      this.CourseTaskForm.get('baseSchoolNameId').setValue(this.branchId);
    }
    this.getselectedBaseScoolName();
    //this.getSelectedSubjectNameBySchoolNameIdAndCourseNameId();
  }
  intitializeForm() {
    this.CourseTaskForm = this.fb.group({
      courseTaskId: [0],
      baseSchoolNameId: [],
      courseNameId: [],
      course: [''],
      bnaSubjectNameId: [],
      taskDetail: [''],
      remarks: [''],
      isActive: [true]

    })
    //autocomplete for Course
    this.CourseTaskForm.get('course').valueChanges
      .subscribe(value => {
        this.getSelectedCourseName(value);
      })
  }
  getselectedBaseScoolName() {
    this.CourseTaskService.getselectedBaseScoolName().subscribe(res => {
      this.selectScoolName = res
    });
  }
  //autocomplete for Course
  onCourseSelectionChanged(item) {
    console.log(item.value);
    this.courseNameId = item.value
    this.CourseTaskForm.get('courseNameId').setValue(item.value);
    this.CourseTaskForm.get('course').setValue(item.text);
  }
  //autocomplete for Course
  getSelectedCourseName(courseName) {
    this.CourseTaskService.getselectedCourseName(courseName).subscribe(response => {
      this.getSelectedSubjectNameBySchoolNameIdAndCourseNameId()
      this.options = response;
      this.filteredOptions = response;
    })
  }

  getSelectedSubjectNameBySchoolNameIdAndCourseNameId() {
    var baseSchoolNameId = this.CourseTaskForm.value['baseSchoolNameId'];
    var courseNameId = this.CourseTaskForm.value['courseNameId'];
    this.CourseTaskService.getselectedSubjectBySchoolAndCourse(baseSchoolNameId, courseNameId).subscribe(res => {
      console.log("Subject name");
      this.selectedSubjectNamebyschoolnameAndCourse = res;

    });
  }
  
  onSubjectSelectionChange(dropdown) {
    this.isShown = true;
    if (dropdown.isUserInput) {
      this.CourseTaskForm.get('bnaSubjectNameId').setValue(dropdown.source.value);
      // this.baseSchoolNameId = this.CourseTaskForm.get('baseSchoolNameId').value;
      // this.courseNameId = this.CourseTaskForm.get('courseNameId').value;
      // this.bnaSubjectNameId = dropdown.source.value;
      var baseSchoolNameId = this.CourseTaskForm.value['baseSchoolNameId'];
      var courseNameId = this.CourseTaskForm.value['courseNameId'];
      var bnaSubjectNameId = this.CourseTaskForm.value['bnaSubjectNameId'];
      console.log(baseSchoolNameId + " -" + courseNameId + " -" + bnaSubjectNameId)
      this.CourseTaskService.getSelectedSubjectShowCourseTasklist(baseSchoolNameId, courseNameId, bnaSubjectNameId).subscribe(response => {
        this.courseTaskList = response;
        console.log(this.courseTaskList);
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
    const id = this.CourseTaskForm.get('courseTaskId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.CourseTaskService.update(+id, this.CourseTaskForm.value).subscribe(response => {
            this.router.navigateByUrl('/syllabus-entry/add-coursetask');
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
      this.CourseTaskService.submit(this.CourseTaskForm.value).subscribe(response => {
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
    const id = row.courseTaskId;
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.CourseTaskService.delete(id).subscribe(() => {
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
