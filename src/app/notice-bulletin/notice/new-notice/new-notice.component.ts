import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticeService } from '../../service/notice.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ClassRoutineService } from 'src/app/routine-management/service/classroutine.service';
import { Notice } from '../../models/notice';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-new-notice',
  templateUrl: './new-notice.component.html',
  styleUrls: ['./new-notice.component.sass']
}) 
export class NewNoticeComponent implements OnInit {
  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('allSelectedCourse') private allSelectedCourse: MatOption;
  masterData = MasterData;
  loading = false;
  buttonText:string;
  userRole = Role;
  pageTitle: string;
  destination:string;
  NoticeForm: FormGroup;
  validationErrors: string[] = [];
  selectedCourse:SelectedModel[];
  selectedbaseschools:SelectedModel[];
  selectedNotice:Notice[];
  isShown: boolean = false ;
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

  displayedColumns: string[] = ['ser','noticeHeading','noticeDetails','courseName','status','actions'];
  constructor(
    private snackBar: MatSnackBar,
    private confirmService: ConfirmService,
    private noticeService: NoticeService,
    private fb: FormBuilder, 
    private router: Router,  
    private route: ActivatedRoute, 
    private classRoutineService: ClassRoutineService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('noticeId'); 
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();

    if (id) {
      this.pageTitle = 'Edit Notice'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.noticeService.find(+id).subscribe(
        res => {
          this.NoticeForm.patchValue({             
            noticeId: res.noticeId,
            courseDurationId: res.courseDurationId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId: res.courseNameId,
            //courseName: res.courseName,
            traineeNominationId: res.traineeNominationId,
            courseInstructorId: res.courseInstructorId,
            noticeHeading:res.noticeHeading,
            endDate:res.endDate,
            status: res.status,
            noticeDetails: res.noticeDetails,
            menuPosition: res.menuPosition,
            isActive: res.isActive
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Notice';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    if(this.role === this.userRole.SuperAdmin || this.role === this.userRole.JSTISchool || this.role === this.userRole.BNASchool){
      this.NoticeForm.get('baseSchoolNameId').setValue(this.branchId);
      this.getselectedcoursedurationbyschoolname();
     }
    this.getselectedbaseschools();
    // this.getselectedcoursedurationbyschoolname();
   // this.getNoticeBySchool();
  }
  intitializeForm() {
    this.NoticeForm = this.fb.group({
      noticeId: [0],
      courseDurationId: [''],
      baseSchoolNameId: [''],
      courseNameId: [''],
     // courseNameIds: [''],
      courseName:[''],
      noticeHeading:[''],
      endDate:[],
      traineeNominationId: [''],
      courseInstructorId: [''],
      status: [0],
      noticeDetails: [''],
      menuPosition: [''],
      isActive: [true]
    })
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
   var baseSchoolNameId=this.NoticeForm.value['baseSchoolNameId'];
  var courseNameArr = dropdown.value.split('_');
  var courseDurationId = courseNameArr[0];
  var courseNameId=courseNameArr[1];
  this.courseName=dropdown.text;
  console.log("Course Name Id");
  console.log(courseNameId);
  //this.NoticeForm.get('courseName').setValue(dropdown.text);
  this.NoticeForm.get('courseNameId').setValue(courseNameId);
  this.NoticeForm.get('courseDurationId').setValue(courseDurationId);
  }

  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  getselectedcoursedurationbyschoolname(){
    var baseSchoolNameId=this.NoticeForm.value['baseSchoolNameId'];
    this.isShown=true;
    //console.log(baseSchoolNameId);
    if (baseSchoolNameId.length ==1){ 
      this.classRoutineService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res=>{
        this.selectedCourse=res;   
      });
    }else{
      this.selectedCourse=[];
    }
   
    this.noticeService.getNoticeBySchool(baseSchoolNameId).subscribe(res=>{
      this.selectedNotice=res
      console.log(this.selectedNotice);
    }); 
} 

stopNotices(element){
  //console.log("Number");
  //console.log(id)
  if(element.status ===0){
    console.log("element id");
    console.log(element.status);
    this.confirmService.confirm('Confirm Stop message', 'Are You Sure Stop This Item').subscribe(result => {
      if (result) {
     this.noticeService.stopNotices(element.noticeId).subscribe(() => {
      var baseSchoolNameId=this.NoticeForm.value['baseSchoolNameId'];

      this.noticeService.getNoticeBySchool(baseSchoolNameId).subscribe(res=>{
        this.selectedNotice=res
  console.log("ffff");
        console.log(this.selectedNotice);
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

}


  getselectedbaseschools(){
    this.noticeService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschools=res
    }); 
  } 

  deleteItem(row) {
    const id = row.noticeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.noticeService.delete(id).subscribe(() => {
          //this.getNotices();
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
  onSubmit() {
    const id = this.NoticeForm.get('noticeId').value; 
    console.log(this.NoticeForm.value);  
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.noticeService.update(+id,this.NoticeForm.value).subscribe(response => {
             this.router.navigateByUrl('/notice-bulletin/add-notice');
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
    else if(this.role === this.userRole.SuperAdmin || this.role === this.userRole.JSTISchool || this.role === this.userRole.BNASchool){
      this.loading = true;
      this.selectedCourse.forEach(element => {
        var courseNameArr = element.value.split('_');
        var courseDurationId = courseNameArr[0];
        var courseNameId=courseNameArr[1];
        this.NoticeForm.get('courseNameId').patchValue(courseNameId);
        this.NoticeForm.get('courseDurationId').patchValue(courseDurationId);
      });
      
      this.NoticeForm.value.courseName.forEach(element => {
        this.NoticeForm.value.courseName=element;
        this.noticeService.submit(this.NoticeForm.value).subscribe(response => {
        this.reloadCurrentRoute();
        // this.getBulletins(baseSchoolNameId);
        this.snackBar.open('Information Inserted Successfully ', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-success'
        });
      }, error => {
        this.validationErrors = error;
      })

      });

      
     }
    else {
      this.loading = true;
      console.log('NoticeForm value', this.NoticeForm.value.baseSchoolNameId);
      this.NoticeForm.value.baseSchoolNameId.forEach(element => {
       if(element!=0){
        this.NoticeForm.value.baseSchoolNameId=element;
        if(this.NoticeForm.value.courseName!=""){
          this.NoticeForm.value.courseName.forEach((courseElement,index) => {
            if (index!=0){
              var courseNameArr = courseElement.split('_');
              var courseDurationId = courseNameArr[0];
              var courseNameId=courseNameArr[1];
               this.NoticeForm.get('courseNameId').patchValue(courseNameId);
                this.NoticeForm.get('courseDurationId').patchValue(courseDurationId);
              this.NoticeForm.value.courseName="" 
           //   this.NoticeForm.value.baseSchoolNameId=element;
            }
            this.noticeService.submit(this.NoticeForm.value).subscribe(response => {
              //    this.router.navigateByUrl('/notice-bulletin/notice-list');
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
          });

        }

       }
       

        // else{
        //   this.noticeService.submit(this.NoticeForm.value).subscribe(response => {
        //     this.reloadCurrentRoute();
        //     // this.getBulletins(baseSchoolNameId);
        //     this.snackBar.open('Information Inserted Successfully ', '', {
        //       duration: 2000,
        //       verticalPosition: 'bottom',
        //       horizontalPosition: 'right',
        //       panelClass: 'snackbar-success'
        //     });
        //   }, error => {
        //     this.validationErrors = error;
        //   })
    
        // }          
      });

    }
 
  }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      //console.log('Test Form ',this.BulletinForm.controls.baseSchoolNameId)
      this.NoticeForm.controls.baseSchoolNameId
        .patchValue([...this.selectedbaseschools.map(item => item.value), 0]);
    } else {
      this.NoticeForm.controls.baseSchoolNameId.patchValue([]);
    }
  }
  toggleAllSelectionCourse() {
    if (this.allSelectedCourse.selected) {
      //console.log('Test Form ',this.BulletinForm.controls.courseName)
      //console.log('Test selectedcoursedurationbyschoolname ',this.selectedcoursedurationbyschoolname)
      this.NoticeForm.controls.courseName
        .patchValue([...this.selectedCourse.map(item => item.value), 0]);
    } else {
      this.NoticeForm.controls.courseName.patchValue([]);
    }
  }
}
