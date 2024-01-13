import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForeignDashboardService } from '../services/ForeignDashboard.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-budgetinfo-list.component',
  templateUrl: './budgetinfo-list.component.html',
  styleUrls: ['./budgetinfo-list.component.sass'] 
}) 
export class BudgetInfoListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
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

  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  groupArrays:{ baseSchoolName: string; courses: any; }[];
  displayedColumnsBudgetCode: string[] = ['sl', 'budgetCodes', 'availableAmount','targetAmount'];
  
  branchId:any;
  traineeId:any;
  role:any;

  constructor(private snackBar: MatSnackBar,private authService: AuthService,private foreignDashboardService: ForeignDashboardService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    this.pageTitle = "Budget Information";
    this.destination = "All";

    this.getBudgetCodeList();
  }


  getBudgetCodeList(){
    this.foreignDashboardService.getBudgetCodeList().subscribe(res=>{
      this.budgetCodes=res 
      console.log(this.budgetCodes)
     });  
  }

}
