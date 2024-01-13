import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../service/notification.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ClassRoutineService } from 'src/app/routine-management/service/classroutine.service';
import { Notice } from '../../models/notice';
import { AuthService } from 'src/app/core/service/auth.service';
import { BaseSchoolNameService } from 'src/app/security/service/BaseSchoolName.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-new-school-notice',
  templateUrl: './new-school-notice.component.html',
  styleUrls: ['./new-school-notice.component.sass']
}) 
export class NewSchoolNoticeComponent implements OnInit {
  masterData = MasterData;
  userRole=Role;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  SchoolNoticeForm: FormGroup;
  validationErrors: string[] = [];
  selectedCourse:SelectedModel[];
  selectedbaseschools:SelectedModel[];
  selectedNotice:Notice[];
  isShown: boolean = false ;
  isResponseShown: boolean = false ;
  responseRole:any;
  courseName:any;
  role:any;
  traineeId:any;
  branchId:any;
  baseSchoolId:any;
  schoolByBaseList:any;
  headerSchoolName:any;
  FilterRoleFromSchool:any;
  NotificationListBySchool:any;
  NotificationResponseListBySchool:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['ser','noticeHeading','noticeDetails','courseName','status','actions'];
  constructor(
    private snackBar: MatSnackBar,
    private confirmService: ConfirmService,
    private notificationService: NotificationService,
    private baseSchoolNameService: BaseSchoolNameService,
    private fb: FormBuilder, 
    private router: Router,  
    private route: ActivatedRoute, 
    private classRoutineService: ClassRoutineService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();

    this.pageTitle = 'Create Notice';
    this.destination = "Add"; 
    this.buttonText= "Save"

    this.intitializeForm();
    if(this.role == Role.MasterAdmin || this.role == Role.DDNT || this.role == Role.Director){
      // this.SchoolNoticeForm.get('baseSchoolNameId').setValue(this.branchId);
      // this.getselectedcoursedurationbyschoolname();
      this.getSchoolListByBase(0);
    }else if(this.role == Role.CO || this.role == Role.TC || this.role == Role.TrainingOffice || this.role == Role.TCO){

      this.getSchoolListByBase(this.branchId);
    }else if (this.role == Role.SuperAdmin || this.role === this.userRole.BNASchool || this.role === this.userRole.JSTISchool || this.role == Role.SchoolOIC){
      this.getNotificationResponselistForSchool(this.branchId);
      this.baseSchoolNameService.find(this.branchId).subscribe(res=>{
        this.headerSchoolName=res.schoolName;
      });
    }
    // this.getselectedbaseschools();
    // this.getselectedcoursedurationbyschoolname();
   // this.getNoticeBySchool();
  }
  intitializeForm() {
    this.SchoolNoticeForm = this.fb.group({
      notificationId: [0],
      sendBaseSchoolNameId: [],
      receivedBaseSchoolNameId: [],
      senderRole: [''],
      receiverRole: [''],
      notes: [''],
      reciverSeenStatus:[0],
      endDate:[''],      
      isActive: [true]
    })
  }

  getSchoolListByBase(baseNameId){
    this.notificationService.getNotificationReminderForAdmin(baseNameId,this.role).subscribe(res=>{
      this.schoolByBaseList=res;
      console.log(res)
    });
  }
  

  schoolNoticeBox(data){
    
    console.log("inside click");
    console.log(data);
    this.getNotificationListBySchool(this.role,this.branchId,data.baseSchoolNameId);
    this.headerSchoolName=data.schoolName;
    this.isShown=true;

    if(this.role != Role.SuperAdmin){
      this.SchoolNoticeForm.get('receiverRole').setValue(Role.SuperAdmin);
    }
    
    // if(this.role != Role.MasterAdmin){
      this.SchoolNoticeForm.get('sendBaseSchoolNameId').setValue(this.branchId);
    // }
    //else if(this.role != Role.SuperAdmin){
      this.SchoolNoticeForm.get('receivedBaseSchoolNameId').setValue(data.baseSchoolNameId);
    //}
    this.SchoolNoticeForm.get('senderRole').setValue(this.role);
    
  }


  getNotificationListBySchool(filterRole,baseSchoolNameId,batchId){
    console.log(filterRole,baseSchoolNameId,batchId);
    this.notificationService.getNotificationsBySchool(filterRole,baseSchoolNameId,batchId).subscribe(res=>{
      this.NotificationListBySchool=res;
      console.log("notification list");
      console.log(res);
    });
  }
  getNotificationResponselistForSchool(baseSchoolNameId){
    this.notificationService.getNotificationResponselistForSchool(baseSchoolNameId).subscribe(res=>{
      this.NotificationResponseListBySchool=res;
      console.log("notification response list");
      console.log(res);
    });
  }
  
  replyingSpecificRole(data){
    // this.responseRole=data.senderRole;
    // this.isResponseShown=true;
    this.getNotificationListBySchool(data.senderRole,this.branchId,data.sendBaseSchoolNameId)
    this.isShown=true;
    this.FilterRoleFromSchool = data.senderRole;
    console.log(data);
    console.log(this.FilterRoleFromSchool);
    this.SchoolNoticeForm.get('receivedBaseSchoolNameId').setValue(data.sendBaseSchoolNameId);
    
    this.SchoolNoticeForm.get('sendBaseSchoolNameId').setValue(this.branchId);
    
    this.SchoolNoticeForm.get('senderRole').setValue(this.role);
    this.SchoolNoticeForm.get('receiverRole').setValue(data.senderRole);
  }
  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  updateSeenStatus(data){
    console.log(data);
    this.notificationService.ChangeNotificationSeenStatus(data.notificationId,1).subscribe(res=>{
      if(this.role == Role.SuperAdmin || this.role == Role.SchoolOIC){
        this.getNotificationResponselistForSchool(this.branchId);
        this.getNotificationListBySchool(data.senderRole,this.branchId,data.sendBaseSchoolNameId);
      }else if(this.role == Role.MasterAdmin || this.role == Role.DDNT || this.role == Role.Director){
        this.getSchoolListByBase(0);
        this.getNotificationListBySchool(this.role,data.sendBaseSchoolNameId,this.branchId);
      }else{
        this.getSchoolListByBase(this.branchId);
        this.getNotificationListBySchool(this.role,data.sendBaseSchoolNameId,this.branchId);
      }
    });
  }
  
  onSubmit() {
    // const id = this.SchoolNoticeForm.get('noticeId').value; 
    console.log(this.SchoolNoticeForm.value); 
    if(this.role == Role.SuperAdmin || this.role == Role.SchoolOIC){
      var schoolnameid = this.SchoolNoticeForm.get('receivedBaseSchoolNameId').value; 
    } else{
      var schoolnameid = this.SchoolNoticeForm.get('receivedBaseSchoolNameId').value; 
    }
    
    
      this.loading = true;
      this.notificationService.submit(this.SchoolNoticeForm.value).subscribe(response => {
        // this.reloadCurrentRoute();
        this.SchoolNoticeForm.get('notes').setValue('');
        if(this.role == Role.SuperAdmin || this.role == Role.SchoolOIC){          
          this.getNotificationListBySchool(this.FilterRoleFromSchool,this.branchId,schoolnameid);
        }else{
          this.getNotificationListBySchool(this.role,this.branchId,schoolnameid);
        }
        
        this.snackBar.open('Message Sent Successfully ', '', {
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
