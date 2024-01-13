import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForeignDashboardService } from '../services/ForeignDashboard.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { CourseBudgetAllocation } from '../../budget-management/models/coursebudgetallocation';
import { CourseBudgetAllocationService } from '../../budget-management/service/courseBudgetAllocation.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'; 
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-paymentschedule-list.component',
  templateUrl: './paymentschedule-list.component.html',
  styleUrls: ['./paymentschedule-list.component.sass'] 
}) 
export class PaymentScheduleListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  CourseBudgetAllocationForm: FormGroup;
  validationErrors: string[] = [];
  totalBudget:any;
  availableAmount:any;
  courseNameId:any;
  targetAmount:any;
  courseDurationId:any;
  budgetCodes:any[];
  isShown: boolean = false;
  PaymentScheduleList:any;
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  groupArrays:{ baseSchoolName: string; courses: any; }[];
  displayedColumnsBudgetCode: string[] = ['sl', 'budgetCodes', 'availableAmount','targetAmount'];
  
  dataSource: MatTableDataSource<CourseBudgetAllocation> = new MatTableDataSource();
  
  branchId:any;
  traineeId:any;
  role:any;
  dbType:any;

  constructor(private snackBar: MatSnackBar,private authService: AuthService, private courseBudgetAllocationService: CourseBudgetAllocationService ,private foreignDashboardService: ForeignDashboardService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    
    this.dbType = this.route.snapshot.paramMap.get('dbType'); 
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    this.pageTitle = "Budget Information";
    this.destination = "All";

    this.getCourseBudgetAllocationListByCourseDurationIdAndPaymentTypeId();
  }


  getCourseBudgetAllocationListByCourseDurationIdAndPaymentTypeId(){
    this.isLoading = true;
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 

      this.courseBudgetAllocationService.getPaymentScheduleListByDurationId(this.courseDurationId).subscribe(response => {
        this.PaymentScheduleList = response; 
        console.log("data source");
        console.log(this.PaymentScheduleList);


           //   this gives an object with dates as keys
      const groups = this.PaymentScheduleList.reduce((groups, courses) => {
        const schoolName = courses.traineeName;
        if (!groups[schoolName]) {
          groups[schoolName] = [];
        }
        groups[schoolName].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((baseSchoolName) => {
        return {
          baseSchoolName,
          courses: groups[baseSchoolName]
        };
      });
      
        // this.paging.length = response.totalItemsCount    
        // this.isLoading = false;
        // console.log("data source");
        // console.log(this.dataSource.data);
      })
  }

}
