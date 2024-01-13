import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { TdecQuationGroupService } from '../../service/TdecQuationGroup.service';
import { TdecQuestionName } from '../../models/TdecQuestionName';
import { Role } from 'src/app/core/models/role';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-new-tdecquationgroup',
  templateUrl: './new-tdecquationgroup.component.html',
  styleUrls: ['./new-tdecquationgroup.component.sass']
})
export class NewTdecQuationGroupComponent implements OnInit {
  buttonText: string;
  loading = false;
  pageTitle: string;
  destination: string;
  TdecQuationGroupForm: FormGroup;
  validationErrors: string[] = [];
  selectScoolName: SelectedModel[];
  selectedcoursedurationbyschoolname: SelectedModel[];
  selectedSubjectNamebyschoolnameAndCourse: SelectedModel[];
  selectTraineePno: SelectedModel[];
  selectTdecQuestionName: SelectedModel[];
  selectedinstructorname: any[];
  courseNameId: any;
  courseDurationId:any;
  getinstructorid:number;
  getinstructorname:string="";
  traineeId:number;
  selectedCourseDuration: number;
  baseSchoolNameId: number;
  isShown: boolean = false ;
  TraineeListFormDtos:TdecQuestionName[];
  role:any;
  //traineeId:any;
  branchId:any;
  userRole = Role;

  options = [];
  filteredOptions;

  constructor(private snackBar: MatSnackBar,private authService: AuthService,private TdecQuationGroupService: TdecQuationGroupService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('tdecQuationGroupId');

    this.role = this.authService.currentUserValue.role.trim();
  //  this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    if (id) {
      this.pageTitle = 'Edit Tdec Quation Group';
      this.destination = 'Edit';
      this.buttonText = "Update";
      this.TdecQuationGroupService.find(+id).subscribe(
        res => {
          this.TdecQuationGroupForm.patchValue({

            tdecQuationGroupId: res.tdecQuationGroupId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId: res.courseNameId,
            courseDurationId: res.courseDurationId,
            bnaSubjectNameId: res.bnaSubjectNameId,
            bnaExamInstructorAssignId: res.bnaExamInstructorAssignId,
            traineeId: res.traineeId,
            tdecQuestionNameId: res.tdecQuestionNameId

          });
          this.getselectedcoursedurationbyschoolname();
          this.getSelectedSubjectNameBySchoolNameIdAndCourseNameId(res.baseSchoolNameId);
        }
      );
    } else {
      this.pageTitle = 'Create Tdec Quation Group';
      this.destination = 'Add';
      this.buttonText = "Save";
    }
    this.intitializeForm();
    if((this.role === this.userRole.SuperAdmin || this.role === this.userRole.BNASchool || this.role === this.userRole.JSTISchool) || (this.role === this.userRole.SchoolOIC)){
      this.TdecQuationGroupForm.get('baseSchoolNameId').setValue(this.branchId);
      this.getselectedcoursedurationbyschoolname();
    }
    this.getselectedBaseScoolName();
    this.getselectedTdecQuestionName();
  }
  intitializeForm() {
    this.TdecQuationGroupForm = this.fb.group({
      tdecQuationGroupId: [0],
      baseSchoolNameId: [],
      courseNameId: [],
      courseName: [''],
      courseDurationId: [],
      bnaSubjectNameId: [],
      bnaSubjectNameIds: [],
      bnaSubjectName: [''],
      bnaExamInstructorAssignId: [],
      traineeId: [],
      pno: [''],
      tdecQuestionNameId: [],
      isActive: [true],
     // status:[true],
      traineeListForm: this.fb.array([
        this.createTraineeData()
      ]),

    })
    //autocomplete for pno
    this.TdecQuationGroupForm.get('pno').valueChanges
      .subscribe(value => {
        this.getSelectedPno(value);
      })
  }

  getControlLabel(index: number,type: string){
    return  (this.TdecQuationGroupForm.get('traineeListForm') as FormArray).at(index).get(type).value;
   }

   private createTraineeData() {
  
    return this.fb.group({
      guestSpeakerQuestionNameId: [],
      name:[''],
      status:['']
    });
  }

  clearList() {
    const control = <FormArray>this.TdecQuationGroupForm.controls["traineeListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }

  getTraineeListonClick(){
    const control = <FormArray>this.TdecQuationGroupForm.controls["traineeListForm"];
    for (let i = 0; i < this.TraineeListFormDtos.length; i++) {
      control.push(this.createTraineeData()); 
    }
    this.TdecQuationGroupForm.patchValue
    ({
       traineeListForm: this.TraineeListFormDtos,
   });
   }

  //autocomplete for pno
  onTraineePnoSelectionChanged(item) {
    this.traineeId = item.value;
    this.TdecQuationGroupForm.get('traineeId').setValue(item.value);
    this.TdecQuationGroupForm.get('pno').setValue(item.text);
  }
  //autocomplete  Pno
  getSelectedPno(pno) {
    this.TdecQuationGroupService.getSelectedPno(pno).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }
  getselectedBaseScoolName() {
    this.TdecQuationGroupService.getselectedBaseScoolName().subscribe(res => {
      this.selectScoolName = res
    });
  }
  getselectedcoursedurationbyschoolname() {
    var baseSchoolNameId = this.TdecQuationGroupForm.value['baseSchoolNameId'];
    this.TdecQuationGroupService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res => {
      this.selectedcoursedurationbyschoolname = res;
    });
  }
  getSelectedSubjectNameBySchoolNameIdAndCourseNameId(dropdown) {
    
    if(dropdown.isUserInput) {
     var courseNameArr = dropdown.source.value.value.split('_');
     this.courseNameId=courseNameArr[0];
     this.courseDurationId=courseNameArr[1];

    var baseSchoolNameId=this.TdecQuationGroupForm.value['baseSchoolNameId'];
      this.TdecQuationGroupService.getSelectedSubjectNameBySchoolNameIdAndCourseNameId(baseSchoolNameId,this.courseNameId).subscribe(res=>{
        this.selectedSubjectNamebyschoolnameAndCourse=res;

      }); 
    }
  }
  onSubjectSelectionChangeGetinstructorNameByParams(dropdown) {
    this.isShown=true;
    this.getinstructorname="";
    this.getinstructorid=null;
    if(dropdown.isUserInput) {

      var bnaSubjectNameId = dropdown.source.value.value;
    var baseSchoolNameId = this.TdecQuationGroupForm.value['baseSchoolNameId'];

    this.TdecQuationGroupForm.get('baseSchoolNameId').setValue(baseSchoolNameId);
    this.TdecQuationGroupForm.get('courseDurationId').setValue(this.courseDurationId);
    this.TdecQuationGroupForm.get('courseNameId').setValue(this.courseNameId);
    this.TdecQuationGroupForm.get('bnaSubjectNameIds').setValue(bnaSubjectNameId);

    this.TdecQuationGroupService.getinstructorNameByParams(baseSchoolNameId,this.courseNameId,this.courseDurationId,bnaSubjectNameId).subscribe(res => {
      
      this.selectedinstructorname = res
      this.getinstructorid = this.selectedinstructorname[0].traineeId,
      this.getinstructorname = this.selectedinstructorname[0].name;

      this.TdecQuationGroupForm.get('traineeId').setValue(this.getinstructorid);
      //this.branchId == '' ? 0 :this.branchId
      this.TdecQuationGroupService.getTdecQuestionNameList(this.branchId == '' ? 0 :this.branchId).subscribe(res => {
       this.TraineeListFormDtos=res;

       this.clearList();
       this.getTraineeListonClick();
      });
    });
  }
}
  
reloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}
  getSubjectNameIdToFindInstructor(dropdown){
    var subjectNameId= dropdown.value;
    console.log(subjectNameId)
  }
    getselectedTdecQuestionName(){
      this.TdecQuationGroupService.getselectedTdecQuestionName().subscribe(res => {
        this.selectTdecQuestionName = res
      });
    }
    onSubmit() {
      const id = this.TdecQuationGroupForm.get('tdecQuationGroupId').value;
      if (id) {
        this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
          console.log(result);
          if (result) {
            this.loading=true;
            this.TdecQuationGroupService.update(+id, this.TdecQuationGroupForm.value).subscribe(response => {
              this.router.navigateByUrl('/teachers-evaluation/tdecquationgroup-list');
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
        this.TdecQuationGroupService.submit(this.TdecQuationGroupForm.value).subscribe(response => {
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

  }
