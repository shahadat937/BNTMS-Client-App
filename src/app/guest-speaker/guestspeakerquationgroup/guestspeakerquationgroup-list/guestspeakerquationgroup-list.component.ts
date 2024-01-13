import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { GuestSpeakerQuationGroupService } from '../../service/GuestSpeakerQuationGroup.service';
 import { GuestSpeakerQuestionName } from '../../models/GuestSpeakerQuestionName';
import { Role } from 'src/app/core/models/role';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-guestspeakerquationgroup-list',
  templateUrl: './guestspeakerquationgroup-list.component.html',
  styleUrls: ['./guestspeakerquationgroup-list.component.sass']
})
export class GuestSpeakerQuationGroupListComponent implements OnInit {
  buttonText: string;
  loading = false;
  pageTitle: string;
  destination: string;
  GuestSpeakerQuationGroupForm: FormGroup;
  validationErrors: string[] = [];
  selectScoolName: SelectedModel[];
  selectedcoursedurationbyschoolname: SelectedModel[];
  selectedSubjectNamebyschoolnameAndCourse: SelectedModel[];
  selectTraineePno: SelectedModel[];
  selectGuestSpeakerQuestionName: SelectedModel[];
  questionGroupList: any[];
  courseNameId: any;
  courseDurationId:any;
  getinstructorid:number;
  getinstructorname:string="";
  traineeId:number;
  selectedCourseDuration: number;
  baseSchoolNameId: number;
  isShown: boolean = false ;
  TraineeListFormDtos:GuestSpeakerQuestionName[];
  role:any;
  //traineeId:any;
  branchId:any;
  userRole = Role;

  options = [];
  filteredOptions;

  constructor(private snackBar: MatSnackBar,private authService: AuthService,private GuestSpeakerQuationGroupService: GuestSpeakerQuationGroupService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('guestSpeakerQuationGroupId');

    this.role = this.authService.currentUserValue.role.trim();
  //  this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    if (id) {
      this.pageTitle = 'Edit GuestSpeaker Quation Group';
      this.destination = 'Edit';
      this.buttonText = "Update";
      this.GuestSpeakerQuationGroupService.find(+id).subscribe(
        res => {
          this.GuestSpeakerQuationGroupForm.patchValue({

            guestSpeakerQuationGroupId: res.guestSpeakerQuationGroupId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId: res.courseNameId,
            courseDurationId: res.courseDurationId,
            bnaSubjectNameId: res.bnaSubjectNameId,
            bnaExamInstructorAssignId: res.bnaExamInstructorAssignId,
            traineeId: res.traineeId,
            guestSpeakerQuestionNameId: res.guestSpeakerQuestionNameId

          });
          this.getselectedcoursedurationbyschoolname();
          this.getSelectedSubjectNameBySchoolNameIdAndCourseNameId(res.baseSchoolNameId);
        }
      );
    } else {
      this.pageTitle = 'Create GuestSpeaker Quation Group';
      this.destination = 'Add';
      this.buttonText = "Save";
    }
    this.intitializeForm();
    if((this.role === this.userRole.SuperAdmin || this.role === this.userRole.BNASchool || this.role === this.userRole.JSTISchool || this.role === this.userRole.SchoolOIC)){
      this.GuestSpeakerQuationGroupForm.get('baseSchoolNameId').setValue(this.branchId);
      this.getselectedcoursedurationbyschoolname();
    }
    this.getselectedBaseScoolName();
    this.getselectedGuestSpeakerQuestionName();
  }
  intitializeForm() {
    this.GuestSpeakerQuationGroupForm = this.fb.group({
      GuestSpeakerQuationGroupId: [0],
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
      guestSpeakerQuestionNameId: [],
      isActive: [true],
     // status:[true],
      traineeListForm: this.fb.array([
        this.createTraineeData()
      ]),

    })
    //autocomplete for pno
    this.GuestSpeakerQuationGroupForm.get('pno').valueChanges
      .subscribe(value => {
        this.getSelectedPno(value);
      })
  }

  getControlLabel(index: number,type: string){
    return  (this.GuestSpeakerQuationGroupForm.get('traineeListForm') as FormArray).at(index).get(type).value;
   }

   private createTraineeData() {
  
    return this.fb.group({
      guestSpeakerQuestionNameId: [],
      name:[''],
      status:['']
    });
  }

  clearList() {
    const control = <FormArray>this.GuestSpeakerQuationGroupForm.controls["traineeListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }

  getTraineeListonClick(){
    const control = <FormArray>this.GuestSpeakerQuationGroupForm.controls["traineeListForm"];
    for (let i = 0; i < this.TraineeListFormDtos.length; i++) {
      control.push(this.createTraineeData()); 
    }
    this.GuestSpeakerQuationGroupForm.patchValue
    ({
       traineeListForm: this.TraineeListFormDtos,
   });
   }

  //autocomplete for pno
  onTraineePnoSelectionChanged(item) {
    this.traineeId = item.value;
    this.GuestSpeakerQuationGroupForm.get('traineeId').setValue(item.value);
    this.GuestSpeakerQuationGroupForm.get('pno').setValue(item.text);
  }
  //autocomplete  Pno
  getSelectedPno(pno) {
    this.GuestSpeakerQuationGroupService.getSelectedPno(pno).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }
  getselectedBaseScoolName() {
    this.GuestSpeakerQuationGroupService.getselectedBaseScoolName().subscribe(res => {
      this.selectScoolName = res
    });
  }
  getselectedcoursedurationbyschoolname() {
    var baseSchoolNameId = this.GuestSpeakerQuationGroupForm.value['baseSchoolNameId'];
    this.GuestSpeakerQuationGroupService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res => {
      this.selectedcoursedurationbyschoolname = res;
    });
  }
  getSelectedSubjectNameBySchoolNameIdAndCourseNameId(dropdown) {
    
    if(dropdown.isUserInput) {
     var courseNameArr = dropdown.source.value.value.split('_');
     this.courseNameId=courseNameArr[0];
     this.courseDurationId=courseNameArr[1];

    var baseSchoolNameId=this.GuestSpeakerQuationGroupForm.value['baseSchoolNameId'];
      this.GuestSpeakerQuationGroupService.getSelectedSubjectNameBySchoolNameIdAndCourseNameId(baseSchoolNameId,this.courseNameId).subscribe(res=>{
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
    var baseSchoolNameId = this.GuestSpeakerQuationGroupForm.value['baseSchoolNameId'];

    this.GuestSpeakerQuationGroupForm.get('baseSchoolNameId').setValue(baseSchoolNameId);
    this.GuestSpeakerQuationGroupForm.get('courseDurationId').setValue(this.courseDurationId);
    this.GuestSpeakerQuationGroupForm.get('courseNameId').setValue(this.courseNameId);
    this.GuestSpeakerQuationGroupForm.get('bnaSubjectNameIds').setValue(bnaSubjectNameId);

    this.GuestSpeakerQuationGroupService.getGuestSpeakerQuationGroupByParamsSp(baseSchoolNameId,this.courseNameId,this.courseDurationId,bnaSubjectNameId).subscribe(res => {
      
      this.questionGroupList = res;
      console.log(res)
      // this.getinstructorid = this.selectedinstructorname[0].traineeId,
      // this.getinstructorname = this.selectedinstructorname[0].name;

      // this.GuestSpeakerQuationGroupForm.get('traineeId').setValue(this.getinstructorid);
      // //this.branchId == '' ? 0 :this.branchId
      // this.GuestSpeakerQuationGroupService.getGuestSpeakerQuestionNameList(this.branchId == '' ? 0 :this.branchId).subscribe(res => {
      //  this.TraineeListFormDtos=res;

      //  console.log("traineeee list");
      //  console.log(this.TraineeListFormDtos);
      //  this.clearList();
      //  this.getTraineeListonClick();
      // });
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
    getselectedGuestSpeakerQuestionName(){
      this.GuestSpeakerQuationGroupService.getselectedGuestSpeakerQuestionName().subscribe(res => {
        this.selectGuestSpeakerQuestionName = res
      });
    }
    
  }
