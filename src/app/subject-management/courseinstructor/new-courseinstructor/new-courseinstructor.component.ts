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
import { ClassRoutineService } from '../../../routine-management/service/classroutine.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-new-courseinstructor',
  templateUrl: './new-courseinstructor.component.html',
  styleUrls: ['./new-courseinstructor.component.sass']
})
export class NewCourseInstructorComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
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
  selectedmarktype:SelectedModel[];
  selectedModule: SelectedModel[];
  selectedCourseSection: SelectedModel[];
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

  displayedColumns: string[] = ['ser', 'courseModule', 'bnaSubjectName', 'trainee', 'markentry', 'status', 'actions'];

  constructor(private snackBar: MatSnackBar, private authService: AuthService,private ClassRoutineService: ClassRoutineService, private confirmService: ConfirmService, private CodeValueService: CodeValueService, private CourseInstructorService: CourseInstructorService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    //console.log(this.role, this.traineeId, this.branchId)


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
            courseSectionId: res.courseSectionId,
            traineeId: res.traineeId,
            subjectMarkId:res.subjectMarkId,
            markTypeId:res.markTypeId,
            traineeName:res.trainee,
            status: res.status,
            menuPosition: res.menuPosition, 
            isActive: res.isActive,
            courseName: res.courseDurationId+'_'+res.courseNameId,
            examMarkEntry:res.examMarkEntry
           // courseName: res.courseDurationId+'_'+res.courseNameId
          //  traineeName:res.traineePno+'_'+res.
          }); 
          console.log("Response");
          console.log(res);
          //console.log("Response");
          this.traineeId = res.traineeId;
          //this.courseNameId = res.courseNameId;
          //this.baseSchoolId=res.baseSchoolName;    
          this.getselectedcoursedurationbyschoolname();
          this.getselectedbnasubjectname();
          this.getCourseModuleOnEdit(res.baseSchoolNameId,res.courseNameId);
          //console.log("ccc"+this.CourseInstructorForm.value);
        }
      );
    } else {
      this.pageTitle = 'Course Instructor Assign';
      this.destination = "Assign";
      this.buttonText = "Save"
    }
    this.intitializeForm();
    if(this.role === this.userRole.SuperAdmin || this.role === this.userRole.BNASchool || this.role === this.userRole.JSTISchool){
      this.getselectedcoursedurationbyschoolname();
    }
    
    this.getselectedschools();
    //this.getselectedbnasubjectname();
    //this.getselectedcoursedurationbyschoolname();
    this.getSelectedModule();
  }

  intitializeForm() {
    this.CourseInstructorForm = this.fb.group({
      courseInstructorId: [0],
      courseDurationId: ['', Validators.required],
      baseSchoolNameId: ['', Validators.required],
      courseModuleId: ['', Validators.required],
      bnaSubjectNameId: ['', Validators.required],
      courseSectionId: ['', Validators.required],
      traineeId: ['', Validators.required],
      subjectMarkId: ['', Validators.required],
      markTypeId: [''],
      courseName: [''],
      traineeName: [''], 
      courseNameId: [],
      status: [0],
      isActive: [true],
      examMarkEntry:[]
    })

    //autocomplete
    this.CourseInstructorForm.get('traineeName').valueChanges
      .subscribe(value => {

        this.getSelectedTraineeByPno(value);

      })

  }
  getselectedcoursedurationbyschoolname() {
    if(this.role === this.userRole.SuperAdmin || this.role === this.userRole.BNASchool || this.role === this.userRole.JSTISchool){
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
    console.log(element)
    this.confirmService.confirm('Confirm Stop message', 'Are You Sure Stop This Item').subscribe(result => {
      if (result) {
        this.CourseInstructorService.stopCourseInstructor(element.courseInstructorId).subscribe(() => {

          var baseSchoolNameId = element.baseSchoolNameId;
          var bnaSubjectNameId = element.bnaSubjectNameId;
          var courseModuleId = element.courseModuleId;
          var courseNameId = element.courseNameId;
          var courseDurationId = element.courseDurationId;
          var courseSectionId = element.courseSectionId;

          
          this.snackBar.open('Information Stop Successfully ', '', {
            
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-warning'
          });
          if (baseSchoolNameId != null && bnaSubjectNameId != null && courseModuleId != null && courseNameId != null) {

            this.CourseInstructorService.getInstructorByParameters(baseSchoolNameId,bnaSubjectNameId, courseModuleId, courseNameId,courseDurationId,courseSectionId).subscribe(res => {
              this.GetInstructorByParameters = res;
              console.log("after stop");
              console.log(this.GetInstructorByParameters);
            });
          }
        })
      }
    })
  }

  //Running Course Instructor
  RunningCourseInstructor(element) {
    //console.log("Number");
    console.log(element)

    this.confirmService.confirm('Confirm Stop message', 'Are You Sure Stop This Item').subscribe(result => {
      if (result) {
        

        this.CourseInstructorService.RunningCourseInstructor(element.courseInstructorId).subscribe(() => {

          var baseSchoolNameId = element.baseSchoolNameId;
          var bnaSubjectNameId = element.bnaSubjectNameId;
          var courseModuleId = element.courseModuleId;
          var courseNameId = element.courseNameId;
          var courseDurationId = element.courseDurationId;
          var courseSectionId = element.courseSectionId;
          
          
          this.snackBar.open('Instructor Running Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-success'
          });

          if (baseSchoolNameId != null && bnaSubjectNameId != null && courseModuleId != null && courseNameId != null) {

            this.CourseInstructorService.getInstructorByParameters(baseSchoolNameId,bnaSubjectNameId, courseModuleId, courseNameId,courseDurationId,courseSectionId).subscribe(res => {
              this.GetInstructorByParameters = res;
              console.log("after running");
              console.log(this.GetInstructorByParameters);
            });
          }
        })

        
      }
    })
  }

  //autocomplete
  onTraineeSelectionChanged(item) {
    //console.log(item);
    this.traineeId=item.value;
    this.CourseInstructorForm.get('traineeId').setValue(item.value);
    this.CourseInstructorForm.get('traineeName').setValue(item.text);
  }

  onBaseNameSelectionChangeGetModule(dropdown) {
    
    if (dropdown.isUserInput) {
      
      var baseSchoolNameId = this.CourseInstructorForm.value['baseSchoolNameId'];
      var courseNameArr = dropdown.source.value.split('_');
      var courseDurationId = courseNameArr[0];
      var courseNameId = courseNameArr[1];

      this.CourseInstructorForm.get('courseName').setValue(dropdown.text);
      this.CourseInstructorForm.get('courseNameId').setValue(courseNameId);
      this.CourseInstructorForm.get('courseDurationId').setValue(courseDurationId);

      if (baseSchoolNameId != null && courseNameId != null) {
        this.CourseInstructorService.getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId, courseNameId).subscribe(res => {
          this.selectedCourseModuleByBaseSchoolAndCourseNameId = res;
        });
      }
    }
  }

  getCourseModuleOnEdit(baseSchoolNameId, courseNameId){
    this.CourseInstructorService.getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId, courseNameId).subscribe(res => {
      this.selectedCourseModuleByBaseSchoolAndCourseNameId = res;
      console.log(this.selectedCourseModuleByBaseSchoolAndCourseNameId)
    });
  }

  getSelectedModule() {
    this.CourseInstructorService.getSelectedModule().subscribe(res => {
      this.selectedModule = res
      console.log(this.selectedModule)
    });
  }

  getselectedschools() {
    this.CourseInstructorService.getselectedschools().subscribe(res => {
      this.selectedSchool = res
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

  onSubjectSelectGetSection(){
    var baseSchoolNameId = this.CourseInstructorForm.value['baseSchoolNameId'];
    var courseNameId = this.CourseInstructorForm.value['courseNameId'];
    
    this.ClassRoutineService.getselectedCourseSection(baseSchoolNameId,courseNameId).subscribe(res=>{
      this.selectedCourseSection=res;
      console.log('section');
      console.log(this.selectedCourseSection);
    });
  }


  onSectionChangeGetInstructorList() {
    var baseSchoolNameId = this.CourseInstructorForm.value['baseSchoolNameId'];
    var bnaSubjectNameId = this.CourseInstructorForm.value['bnaSubjectNameId'];
    var courseModuleId = this.CourseInstructorForm.value['courseModuleId'];
    var courseNameId = this.CourseInstructorForm.value['courseNameId'];
    var courseDurationId = this.CourseInstructorForm.value['courseDurationId'];
    var courseSectionId = this.CourseInstructorForm.value['courseSectionId'];
    
    this.ClassRoutineService.getselectedmarktype(bnaSubjectNameId).subscribe(res=>{
      this.selectedmarktype=res;
      console.log(this.selectedmarktype)
    });


    this.isShown = true;
    if (baseSchoolNameId != null && bnaSubjectNameId != null && courseModuleId != null && courseNameId != null && courseSectionId != null) {

      this.CourseInstructorService.getInstructorByParameters(baseSchoolNameId,bnaSubjectNameId, courseModuleId, courseNameId,courseDurationId,courseSectionId).subscribe(res => {
        this.GetInstructorByParameters = res;
        console.log(this.GetInstructorByParameters);
      });
    }
  }
  onSubjectMarkSelectionGetMarkType(){
    var subjectMarkId = this.CourseInstructorForm.value['subjectMarkId'];
    console.log(subjectMarkId);
    this.ClassRoutineService.findSubjectMark(subjectMarkId).subscribe(res=>{
      console.log(res)
      this.CourseInstructorForm.get('markTypeId').setValue(res.markTypeId);
    });

  }
  GetInstructorListAfterDelete(baseSchoolNameId, bnaSubjectNameId, courseModuleId, courseNameId, courseDurationId,courseSectionId) {
    this.isShown = true;
    if (baseSchoolNameId != null && bnaSubjectNameId != null && courseModuleId != null && courseNameId != null) {

      this.CourseInstructorService.getInstructorByParameters(baseSchoolNameId,bnaSubjectNameId, courseModuleId, courseNameId,courseDurationId,courseSectionId).subscribe(res => {
        this.GetInstructorByParameters = res;
        //console.log(this.GetInstructorByParameters);
      });
    }
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  deleteItem(row) {
    const id = row.courseInstructorId;
    var baseSchoolNameId = row.baseSchoolNameId;
    var bnaSubjectNameId = row.bnaSubjectNameId;
    var courseModuleId = row.courseModuleId;
    var courseNameId = row.courseNameId;
    var courseDurationId = row.courseDurationId;
    var courseSectionId = row.courseSectionId;
    //console.log("deleted - " + baseSchoolNameId + " - " + bnaSubjectNameId + " - " + courseNameId + " - " + courseModuleId);
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      //console.log(result);
      if (result) {
        this.CourseInstructorService.delete(id).subscribe(() => {
          this.GetInstructorListAfterDelete(baseSchoolNameId, bnaSubjectNameId, courseModuleId, courseNameId,courseDurationId,courseSectionId);
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

  // getselectedbnasubjectname(){
  //   this.CourseInstructorService.getselectedbnasubjectname().subscribe(res=>{
  //     this.selectedsubjectname=res;
  //   });
  // } 

  onSubmit() {
    this.loading = true;
    const id = this.CourseInstructorForm.get('courseInstructorId').value;
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        //console.log(result);
        if (result) {
          this.loading = true;
          this.CourseInstructorService.update(+id, this.CourseInstructorForm.value).subscribe(response => {
            this.router.navigateByUrl('/subject-management/add-subjectinstructor');
            this.reloadCurrentRoute();
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
      this.loading = true;
      this.CourseInstructorService.submit(this.CourseInstructorForm.value).subscribe(response => {
        //this.router.navigateByUrl('/subject-management/subjectinstructor-list');
        this.onSectionChangeGetInstructorList();
        this.reloadCurrentRoute();
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
