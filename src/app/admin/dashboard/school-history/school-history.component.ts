import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { dashboardService } from '../services/dashboard.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from 'src/app/core/models/role';
import { AuthService } from 'src/app/core/service/auth.service';
import { BaseSchoolNameService } from 'src/app/security/service/BaseSchoolName.service';
import { StudentDashboardService } from 'src/app/student/services/StudentDashboard.service';
import { InstructorDashboardService } from 'src/app/teacher/services/InstructorDashboard.service';

@Component({
  selector: 'app-school-history',
  templateUrl: './school-history.component.html',
  styleUrls: ['./school-history.component.sass']
})
export class SchoolHistoryComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  schoolList:any;
  showSchoolHistory:any;
  isLoading = false;
  showHideDiv= false;
  BaseSchoolNameForm: FormGroup;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  isUpdateable = false;
    
  branchId:any;
  traineeId:any;
  role:any;

  baseSchoolNameId:any;
  validationErrors: string[] = [];
  groupArrays:{ baseName: string; schools: any; }[];

  displayedColumns: string[] = ['ser','schoolName','courseCount'];

  
  constructor(private snackBar: MatSnackBar,private fb: FormBuilder,private instructorDashboardService: InstructorDashboardService,private studentDashboardService: StudentDashboardService,private authService: AuthService,private baseSchoolNameService: BaseSchoolNameService,private dashboardService: dashboardService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
        
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)
    if(this.role == this.userRole.SchoolOIC){
      this.isUpdateable = true;
    }

    if(this.role == this.userRole.Student){
      console.log("student")
      this.studentDashboardService.getSpStudentInfoByTraineeId(this.traineeId).subscribe(res=>{
        console.log(res)
        if(res){
          let infoList=res        
          this.baseSchoolNameId=infoList[0].baseSchoolNameId;
          this.loadSchoolDataById(this.baseSchoolNameId);
        }
      });
    }else if(this.role == this.userRole.Instructor){
      this.loadSchoolDataById(this.branchId);
      this.instructorDashboardService.getSpInstructorInfoByTraineeId(this.traineeId).subscribe(res=>{
        if(res){
          let infoList=res;
          this.baseSchoolNameId=infoList[0].baseSchoolNameId, 
          this.loadSchoolDataById(this.baseSchoolNameId);
        }
      });
    }else{
      this.loadSchoolDataById(this.branchId);
    }
    
    this.intitializeForm();
    
  }
  loadSchoolDataById(schoolId){
    this.baseSchoolNameService.find(+schoolId).subscribe(res => {
      this.BaseSchoolNameForm.patchValue({          
        baseSchoolNameId: res.baseSchoolNameId,
        schoolName: res.schoolName,
        shortName: res.shortName,
        schoolLogo: res.schoolLogo,
        //status: res.status,
        //menuPosition:res.menuPosition,
        isActive: res.isActive,
        contactPerson: res.contactPerson,
        address: res.address,
        telephone: res.telephone,
        cellphone: res.cellphone,
        email: res.email,
        fax: res.fax,
        branchLevel: res.branchLevel,
        firstLevel: res.firstLevel,
        secondLevel: res.secondLevel,
        thirdLevel: res.thirdLevel,
        fourthLevel: res.fourthLevel,
        //fifthLevel: res.fifthLevel,
        serverName: res.serverName,
        schoolHistory: res.schoolHistory,
      });  
      this.showSchoolHistory = res.schoolHistory;
    });
  }

  intitializeForm() {
    this.BaseSchoolNameForm = this.fb.group({
      baseSchoolNameId: [0],
      schoolName: [''],
      shortName: [''],
      schoolLogo: [''],
      image:[''],
      status: [''],
      menuPosition: [''],
      isActive: [],
      contactPerson: [],
      address: [],
      telephone: [],
      cellphone: [],
      email: [],
      fax: [],
      branchLevel: [''],
      firstLevel: [""],
      secondLevel: [""],
      thirdLevel: [""],
      fourthLevel: [""],
      fifthLevel: [""],
      serverName: [],
      schoolHistory: [''],  
    })
  }
 
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  onSubmit(){
    const id = this.BaseSchoolNameForm.get('baseSchoolNameId').value;   
    console.log(this.BaseSchoolNameForm.value);

    const formData = new FormData();
    for (const key of Object.keys(this.BaseSchoolNameForm.value)) {
      const value = this.BaseSchoolNameForm.value[key];
      formData.append(key, value);
    }
    console.log(formData)
    // if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.baseSchoolNameService.update(+id,formData).subscribe(response => {
            // this.router.navigateByUrl('/security/new-basename');
            // this.getBaseNameList(this.commendingAreaId);
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
    // }
  }
}
