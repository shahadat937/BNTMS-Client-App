import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticeService } from '../../service/notice.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ClassRoutineService } from 'src/app/routine-management/service/classroutine.service';
import { TraineeNominationService } from 'src/app/central-exam/service/traineenomination.service';
import { Notice } from '../../models/notice';
import { TraineeList } from 'src/app/attendance-management/models/traineeList';
import {IndividualBulletinService} from '../../../notice-bulletin/service/individualbulletin.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-new-individualbulletin',
  templateUrl: './new-individualbulletin.component.html',
  styleUrls: ['./new-individualbulletin.component.sass']
}) 
export class IndividualBulletinComponent implements OnInit {
  masterData = MasterData;
  loading = false;
  userRole = Role;
  buttonText:string;
  pageTitle: string;
  destination:string;
  NoticeForm: FormGroup;
  validationErrors: string[] = [];
  selectedCourse:SelectedModel[];
  selectedbaseschools:SelectedModel[];
  selectedNotice:Notice[];
  isShown: boolean = false ;
  traineeNominationListForNotice:TraineeList[];
  IndividualBulletinByCourse:any[];
  courseName:any;
  role:any;
  traineeId:any;
  branchId:any;
  baseSchoolId:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['ser','courseName','noticeDetails','status'];
  displayedColumnsForTraineeList: string[] = ['sl','traineePNo','traineeName', 'obtaintMark','examMarkRemarksId'];
  constructor(
    private snackBar: MatSnackBar,
    private confirmService: ConfirmService,
    private individualBulletinService: IndividualBulletinService,
    private fb: FormBuilder, 
    private router: Router,  
    private route: ActivatedRoute, 
    private classRoutineService: ClassRoutineService,
    private traineeNominationService:TraineeNominationService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('individualBulletinId'); 
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role,this.traineeId,this.branchId)
    if (id) {
      this.pageTitle = 'Edit Individual Bulletin'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.individualBulletinService.find(+id).subscribe(
        res => {
          this.NoticeForm.patchValue({             
            individualBulletinId: res.individualBulletinId,
            courseDurationId: res.courseDurationId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId: res.courseNameId,
            traineeNominationId: res.traineeNominationId,
            courseInstructorId: res.courseInstructorId,
            status: res.status,
            noticeDetails: res.noticeDetails,
            endDate:res.endDate,
            menuPosition: res.menuPosition,
            isActive: res.isActive
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Individual Bulletin';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    if(this.role === this.userRole.SuperAdmin || this.role === this.userRole.JSTISchool || this.role === this.userRole.BNASchool){
      this.NoticeForm.get('baseSchoolNameId').setValue(this.branchId);
      this.getselectedcoursedurationbyschoolname();
     }
    this.getselectedbaseschools();
    //this.getselectedcoursedurationbyschoolname();
   // this.getNoticeBySchool();
  }
  intitializeForm() {
    this.NoticeForm = this.fb.group({
      individualBulletinId: [0],
      courseDurationId: [],
      baseSchoolNameId: [],
      courseNameId: [''],
      courseNameIds: [''],
      courseName:[''],
      traineeNominationId: [],
      courseInstructorId: [],
      status: [0],
      bulletinDetails: [''],
      endDate:[],
      menuPosition: [],
      isActive: [true],
      traineeListForm: this.fb.array([
        this.createTraineeData()
      ]),
    })
  }
  
  getControlLabel(index: number,type: string){
    return  (this.NoticeForm.get('traineeListForm') as FormArray).at(index).get(type).value;
   }
  private createTraineeData() {
 
    return this.fb.group({
      // courseNameId: [],
      status: [],
      courseInstructorId:[],
      traineeId: [],
      name:[],
      pno:[],
      position:[],
      subjectName:[],
      shortName:[],
      isNotify:[''],
    //   noticeDetails: [],
    //  examMarkRemarksId:[]
    });
  }

  getTraineeListonClick(){ 
    const control = <FormArray>this.NoticeForm.controls["traineeListForm"];
    console.log(this.traineeNominationListForNotice)   
    for (let i = 0; i < this.traineeNominationListForNotice.length; i++) {
      control.push(this.createTraineeData()); 
      // console.log("value...");
      // console.log(this.traineeNominationListForNotice)
    }
    this.NoticeForm.patchValue({ traineeListForm: this.traineeNominationListForNotice });
    // console.log("value...");
    // console.log(this.traineeNominationListForNotice)
   }
  
   clearList() {
    const control = <FormArray>this.NoticeForm.controls["traineeListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }

  // onBaseSchoolNameSelectionChangeGetCourse(baseSchoolNameId){
  //     this.classRoutineService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res=>{
  //     console.log(res);
  //     this.selectedCourse=res;
  //   });
  // var baseSchoolNameId=this.ClassRoutineForm.value['baseSchoolNameId'];
  // var courseNameArr = dropdown.value.split('_');
  // var courseDurationId = courseNameArr[0];
  // var courseNameId=courseNameArr[1];
  // this.courseName=dropdown.text;
  // this.ClassRoutineForm.get('courseName').setValue(dropdown.text);
  // this.ClassRoutineForm.get('courseNameId').setValue(courseNameId);
  // this.ClassRoutineForm.get('courseDurationId').setValue(courseDurationId);
  // }

  getSelectedCourseName(dropdown){
 
  this.NoticeForm.value['courseNameIds'];
  console.log("coursenameidss");
  console.log(dropdown);
  
  var baseSchoolNameId=this.NoticeForm.value['baseSchoolNameId'];
  var courseNameArr = dropdown.value.split('_');
  var courseDurationId = courseNameArr[0];
  var courseNameId=courseNameArr[1];
  this.courseName=dropdown.text;
  console.log("Course Name Id");
  console.log(courseNameId);
  console.log("Course Duration Id");
  console.log(courseDurationId);

  this.getIndividualBulletinList(baseSchoolNameId,courseNameId,courseDurationId);

  this.individualBulletinService.getInstructorListByCourse(baseSchoolNameId,courseNameId,courseDurationId).subscribe(res=>{
    this.traineeNominationListForNotice=res; 

    for(let i=0;i < this.traineeNominationListForNotice.length;i++ ){
      this.traineeNominationListForNotice[i].isNotify=true;
    }
    
    //console.log("Trainee Nomination");
    //console.log(this.traineeNominationListForNotice);
    this.isShown=true;
    this.clearList()
    this.getTraineeListonClick();
   });



  //this.NoticeForm.get('courseName').setValue(dropdown.text);
  this.NoticeForm.get('courseNameId').setValue(courseNameId);
  this.NoticeForm.get('courseDurationId').setValue(courseDurationId);
  }


  getIndividualBulletinList(baseSchoolNameId,courseNameId,courseDurationId){
    this.individualBulletinService.getIndividualBulletinByCourse(baseSchoolNameId,courseNameId,courseDurationId).subscribe(res=>{
      this.IndividualBulletinByCourse=res; 
      console.log(res);
    });
  }
  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  getselectedcoursedurationbyschoolname(){
    var baseSchoolNameId=this.NoticeForm.value['baseSchoolNameId'];
   // this.isShown=true;
    //console.log(baseSchoolNameId);
    this.classRoutineService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res=>{
     // console.log(baseSchoolNameId+"hhh");
      this.selectedCourse=res;   
     // console.log("lof");
     // console.log(this.selectedCourse)
    });
//     this.individualNoticeService.getNoticeBySchool(baseSchoolNameId).subscribe(res=>{
//       this.selectedNotice=res
// console.log("ffff");
//       console.log(this.selectedNotice);
//     }); 
} 

stopNotices(element){
  //console.log("Number");
  //console.log(id)
    this.confirmService.confirm('Confirm Stop message', 'Are You Sure Stop This Item').subscribe(result => {
      if (result) {
     this.individualBulletinService.stopNotices(element.noticeId).subscribe(() => {
      var baseSchoolNameId=this.NoticeForm.value['baseSchoolNameId'];

      this.individualBulletinService.getNoticeBySchool(baseSchoolNameId).subscribe(res=>{
        this.selectedNotice=res
  //console.log("ffff");
       // console.log(this.selectedNotice);
      }); 

     // this.getCourseplanCreates();
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
// stopNotices(id: number) {
//   this.individualNoticeService.st
// }
  // this.individualNoticeService.stopNotices(id).subscribe(res=>{
  //   this.Notices=res
  // }); 


// inActiveItem(){

//   if(row.isActive == true){
//     this.confirmService.confirm('Confirm Deactive message', 'Are You Sure Deactive This Item').subscribe(result => {
//       if (result) {
//     this.CourseplanCreateService.deactiveCoursePlan(id).subscribe(() => {
//       this.getCourseplanCreates();
//       this.snackBar.open('Information Deactive Successfully ', '', {
//         duration: 3000,
//         verticalPosition: 'bottom',
//         horizontalPosition: 'right',
//         panelClass: 'snackbar-warning'
//       });
//     })
//   }
// })
// }
//   this.individualNoticeService.stopNotices(id).subscribe(() => {
//     //this.getCourseplanCreates();
//     this.snackBar.open('Information Deactive Successfully ', '', {
//       duration: 3000,
//       verticalPosition: 'bottom',
//       horizontalPosition: 'right',
//       panelClass: 'snackbar-warning'
//     });
//   })
// }

  getselectedbaseschools(){
    this.individualBulletinService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschools=res
    }); 
  } 

  onSubmit() {
    const id = this.NoticeForm.get('individualBulletinId').value;
    console.log(this.NoticeForm.value); 
    //this.NoticeForm.value.filter(x=>x.isNotify==true)
  //  this.NoticeForm.value.filter((x:any)=>{ return x.isNotify})
  //  console.log(this.NoticeForm.value.traineeListForm.filter(x=>x.isNotify == true));  
   // console.lo
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.individualBulletinService.update(+id,this.NoticeForm.value).subscribe(response => {
            // this.router.navigateByUrl('/notice-bulletin/notice-list');
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
    }else {
      this.loading = true;
      this.individualBulletinService.submit(this.NoticeForm.value).subscribe(response => {
        // this.router.navigateByUrl('/notice-bulletin/notice-list');
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
    const id = row.individualBulletinId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.individualBulletinService.delete(id).subscribe(() => {
          this.getIndividualBulletinList(row.baseSchoolNameId,row.courseNameId,row.courseDurationId);
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
