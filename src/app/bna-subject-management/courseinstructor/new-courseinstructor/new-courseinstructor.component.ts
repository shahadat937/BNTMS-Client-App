import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseInstructorService } from '../../service/courseinstructor.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { CourseInstructor } from '../../models/courseinstructor';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-new-courseinstructor',
  templateUrl: './new-courseinstructor.component.html',
  styleUrls: ['./new-courseinstructor.component.sass']
})
export class NewCourseInstructorComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText: string;
  pageTitle: string;
  //traineeId: number;
  destination: string;
  CourseInstructorForm: FormGroup;
  validationErrors: string[] = [];
  coursesByBaseSchoolId: SelectedModel[];
  selectedcoursedurationbyschoolname: SelectedModel[];
  selectedSchool: SelectedModel[];
  selectedBatch: SelectedModel[];
  selectedRank: SelectedModel[];
  selectedLocationType: SelectedModel[];
  selectedsubjectname: SelectedModel[];
  selectedcourseduration: SelectedModel[];
  selectedModule: SelectedModel[];
  selectedCourseInstructor: CourseInstructor;
  selectedCourseModuleByBaseSchoolAndCourseNameId: SelectedModel[];
  GetInstructorByParameters: CourseInstructor[];
  isShown: boolean = false;
  courseDurationIdForList: number
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

  displayedColumns: string[] = ['ser', 'courseModule', 'bnaSubjectName', 'trainee', 'status', 'actions'];

  constructor(private snackBar: MatSnackBar, private authService: AuthService, private confirmService: ConfirmService, private CodeValueService: CodeValueService, private CourseInstructorService: CourseInstructorService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)


    const id = this.route.snapshot.paramMap.get('courseInstructorId');
    if (id) {
      this.pageTitle = 'Update Course Instructor Assign';
      this.destination = "Update";
      this.buttonText = "Update"

      this.CourseInstructorService.find(+id).subscribe(
        res => {
          this.CourseInstructorForm.patchValue({
            courseInstructorId: res.courseInstructorId,
            courseDurationId: res.courseDurationId,
            courseNameId: res.courseNameId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseModuleId: res.courseModuleId,
            bnaSubjectNameId: res.bnaSubjectNameId,
            traineeId: res.traineeId,
            status: res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,

          });
           console.log("Response");
           console.log(res);
        }
      );
    } else {
      this.pageTitle = 'Course Instructor Assign';
      this.destination = "Assign";
      this.buttonText = "Save"
    }
    this.intitializeForm();
    if(this.role === 'Super Admin'){
      this.getselectedcoursedurationbyschoolname();
    }
    
    this.getselectedschools();
    this.getSelectedModule();
  }

  intitializeForm() {
    this.CourseInstructorForm = this.fb.group({
      courseInstructorId: [0],
      courseDurationId: ['', Validators.required],
      baseSchoolNameId: ['', Validators.required],
      courseModuleId: ['', Validators.required],
      bnaSubjectNameId: ['', Validators.required],
      traineeId: ['', Validators.required],
      courseName: [''],
      traineeName: [''],
      courseNameId: [],
      status: [0],
      isActive: [true],
    })

    //autocomplete
    this.CourseInstructorForm.get('traineeName').valueChanges
      .subscribe(value => {

        this.getSelectedTraineeByPno(value);

      })

  }
  getselectedcoursedurationbyschoolname() {
    if(this.role === 'Super Admin'){
      this.CourseInstructorForm.get('baseSchoolNameId').setValue(this.branchId);
    }
    var baseSchoolNameId = this.CourseInstructorForm.value['baseSchoolNameId'];
    console.log(baseSchoolNameId);
    this.CourseInstructorService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res => {
      console.log(res);
      this.selectedcoursedurationbyschoolname = res;
    });
  }

  //autocomplete
  getSelectedTraineeByPno(pno) {
    this.CourseInstructorService.getSelectedTraineeByPno(pno).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }

  //Stop Course Instructor
  stopCourseInstructor(element) {
    //console.log("Number");
    //console.log(id)
    this.confirmService.confirm('Confirm Stop message', 'Are You Sure Stop This Item').subscribe(result => {
      if (result) {
        this.CourseInstructorService.stopCourseInstructor(element.courseInstructorId).subscribe(() => {

          var baseSchoolNameId = this.CourseInstructorForm.value['baseSchoolNameId'];
          var bnaSubjectNameId = this.CourseInstructorForm.value['bnaSubjectNameId'];
          var courseModuleId = this.CourseInstructorForm.value['courseModuleId'];
          var courseNameId = this.CourseInstructorForm.value['courseNameId'];
          var courseDurationId = this.CourseInstructorForm.value['courseDurationId'];

          if (baseSchoolNameId != null && bnaSubjectNameId != null && courseModuleId != null && courseNameId != null) {

            this.CourseInstructorService.getInstructorByParameters(baseSchoolNameId,bnaSubjectNameId, courseModuleId, courseNameId,courseDurationId).subscribe(res => {
              this.GetInstructorByParameters = res;
              console.log(this.GetInstructorByParameters);
            });
          }
          this.snackBar.open('Information Stop Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-warning'
          });
        })
      }
    })
  }

  //Running Course Instructor
  RunningCourseInstructor(element) {
    //console.log("Number");
    //console.log(id)

    this.confirmService.confirm('Confirm Stop message', 'Are You Sure Stop This Item').subscribe(result => {
      if (result) {
        this.CourseInstructorService.RunningCourseInstructor(element.courseInstructorId).subscribe(() => {

          var baseSchoolNameId = this.CourseInstructorForm.value['baseSchoolNameId'];
          var bnaSubjectNameId = this.CourseInstructorForm.value['bnaSubjectNameId'];
          var courseModuleId = this.CourseInstructorForm.value['courseModuleId'];
          var courseName = this.CourseInstructorForm.value['courseNameId'];
          var courseDurationId = this.CourseInstructorForm.value['courseDurationId'];

          console.log("Dropdown value");

          var courseNameArr = courseName.split('_');
          var courseNameId = courseNameArr[0];
          var courseDurationId = courseNameArr[1];
          if (baseSchoolNameId != null && bnaSubjectNameId != null && courseModuleId != null && courseNameId != null) {

            this.CourseInstructorService.getInstructorByParameters(baseSchoolNameId,bnaSubjectNameId, courseModuleId, courseNameId,courseDurationId).subscribe(res => {
              this.GetInstructorByParameters = res;
              console.log(this.GetInstructorByParameters);
            });
          }
          this.snackBar.open('Information Stop Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-warning'
          });
        })
      }
    })
  }

  //autocomplete
  onTraineeSelectionChanged(item) {
    console.log(item);
    this.CourseInstructorForm.get('traineeId').setValue(item.value);
    this.CourseInstructorForm.get('traineeName').setValue(item.text);
  }

  onBaseNameSelectionChangeGetModule(dropdown) {

    if (dropdown.isUserInput) {
      console.log(dropdown);

      var baseSchoolNameId = this.CourseInstructorForm.value['baseSchoolNameId'];
      var courseNameArr = dropdown.source.value.value.split('_');
      var courseDurationId = courseNameArr[0];
      var courseNameId = courseNameArr[1];

      this.CourseInstructorForm.get('courseName').setValue(dropdown.text);
      this.CourseInstructorForm.get('courseNameId').setValue(courseNameId);
      this.CourseInstructorForm.get('courseDurationId').setValue(courseDurationId);

      console.log("course duration" + courseDurationId);
      console.log("course name" + courseNameId);

      if (baseSchoolNameId != null && courseNameId != null) {
        this.CourseInstructorService.getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId, courseNameId).subscribe(res => {
          this.selectedCourseModuleByBaseSchoolAndCourseNameId = res;
        });
      }
    }
  }

  getSelectedModule() {
    this.CourseInstructorService.getSelectedModule().subscribe(res => {
      this.selectedModule = res
    });
  }

  getselectedschools() {
    this.CourseInstructorService.getselectedschools().subscribe(res => {
      this.selectedSchool = res
      console.log(this.selectedSchool);
    });
  }
  getselectedcourseduration() {
    this.CourseInstructorService.getselectedcourseduration().subscribe(res => {
      this.selectedcourseduration = res;
    });
  }

  getselectedbnasubjectname() {
    var baseSchoolNameId = this.CourseInstructorForm.value['baseSchoolNameId'];
    var courseNameId = this.CourseInstructorForm.value['courseNameId'];
    var courseModuleId = this.CourseInstructorForm.value['courseModuleId'];
    this.CourseInstructorService.getselectedbnasubjectnamebyparameters(baseSchoolNameId, courseNameId, courseModuleId).subscribe(res => {
      this.selectedsubjectname = res;
    });
  }

  onModuleSelectionChangeGetInstructorList() {
    var baseSchoolNameId = this.CourseInstructorForm.value['baseSchoolNameId'];
    var bnaSubjectNameId = this.CourseInstructorForm.value['bnaSubjectNameId'];
    var courseModuleId = this.CourseInstructorForm.value['courseModuleId'];
    var courseNameId = this.CourseInstructorForm.value['courseNameId'];
    var courseDurationId = this.CourseInstructorForm.value['courseDurationId'];
    console.log("Dropdown value");
    console.log(courseDurationId);
    

    this.isShown = true;
    if (baseSchoolNameId != null && bnaSubjectNameId != null && courseModuleId != null && courseNameId != null) {

      this.CourseInstructorService.getInstructorByParameters(baseSchoolNameId,bnaSubjectNameId, courseModuleId, courseNameId,courseDurationId).subscribe(res => {
        this.GetInstructorByParameters = res;
        console.log(this.GetInstructorByParameters);
      });
    }
  }
  GetInstructorListAfterDelete(baseSchoolNameId, bnaSubjectNameId, courseModuleId, courseNameId, courseDurationId) {
    this.isShown = true;
    if (baseSchoolNameId != null && bnaSubjectNameId != null && courseModuleId != null && courseNameId != null) {

      this.CourseInstructorService.getInstructorByParameters(baseSchoolNameId,bnaSubjectNameId, courseModuleId, courseNameId,courseDurationId).subscribe(res => {
        this.GetInstructorByParameters = res;
        console.log(this.GetInstructorByParameters);
      });
    }
  }

  deleteItem(row) {
    const id = row.courseInstructorId;
    var baseSchoolNameId = row.baseSchoolNameId;
    var bnaSubjectNameId = row.bnaSubjectNameId;
    var courseModuleId = row.courseModuleId;
    var courseNameId = row.courseNameId;
    var courseDurationId = row.courseDurationId;
    console.log("deleted - " + baseSchoolNameId + " - " + bnaSubjectNameId + " - " + courseNameId + " - " + courseModuleId);
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.CourseInstructorService.delete(id).subscribe(() => {
          this.GetInstructorListAfterDelete(baseSchoolNameId, bnaSubjectNameId, courseModuleId, courseNameId,courseDurationId);
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
  onSubmit() {
    const id = this.CourseInstructorForm.get('courseInstructorId').value;
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.CourseInstructorService.update(+id, this.CourseInstructorForm.value).subscribe(response => {
            this.router.navigateByUrl('/bna-subject-management/add-subjectinstructor');
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
    }

    else {
      this.loading=true;
      this.CourseInstructorService.submit(this.CourseInstructorForm.value).subscribe(response => {
        //this.router.navigateByUrl('/bna-subject-management/subjectinstructor-list');
        this.onModuleSelectionChangeGetInstructorList();
        this.CourseInstructorForm.reset();
        this.CourseInstructorForm.get('courseInstructorId').setValue(0);
        this.CourseInstructorForm.get('isActive').setValue(true);
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
}
