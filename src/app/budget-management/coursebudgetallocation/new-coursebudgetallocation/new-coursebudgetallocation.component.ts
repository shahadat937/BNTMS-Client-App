import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/core/models/role';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseBudgetAllocationService } from '../../service/courseBudgetAllocation.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { CourseWeekService } from 'src/app/course-management/service/CourseWeek.service';
import { CourseBudgetAllocation } from '../../models/courseBudgetAllocation';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-new-coursebudgetallocation',
  templateUrl: './new-coursebudgetallocation.component.html',
  styleUrls: ['./new-coursebudgetallocation.component.sass']
}) 
export class NewCourseBudgetAllocationComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  buttonText:string;
  pageTitle: string;
  destination:string;
  CourseBudgetAllocationForm: FormGroup;
  validationErrors: string[] = [];
  selectedbaseschools:SelectedModel[];
  selectedcoursename:SelectedModel[];
  selectedcoursedurationbyschoolname:SelectedModel[];
  selectedBudgetCode:SelectedModel[];
  selectedBudgetType:SelectedModel[];
  selectedFiscalYear:SelectedModel[];
  selectedPaymentType:SelectedModel[];
  selectedCourseDuration:SelectedModel[];
  selectedTrainee:SelectedModel[];
  totalBudget:any;
  availableAmount:any;
  traineeId:any;
  courseNameId:any;
  targetAmount:any;
  budgetCodes:any[]; 

  branchId:any;
  role:any;

  ELEMENT_DATA: CourseBudgetAllocation[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','traineeName','budgetCode','paymentType','installmentAmount','nextInstallmentDate','status','actions'];
  dataSource: MatTableDataSource<CourseBudgetAllocation> = new MatTableDataSource();


   selection = new SelectionModel<CourseBudgetAllocation>(true, []);

  constructor(private snackBar: MatSnackBar, private authService: AuthService,private CourseWeekService: CourseWeekService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private CourseBudgetAllocationService: CourseBudgetAllocationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    const id = this.route.snapshot.paramMap.get('courseBudgetAllocationId'); 
    if (id) {
      this.pageTitle = 'Edit Budget Allocation'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.CourseBudgetAllocationService.find(+id).subscribe(
        res => {
          this.CourseBudgetAllocationForm.patchValue({          
            courseBudgetAllocationId:res.courseBudgetAllocationId,
            courseTypeId:res.courseTypeId,
            courseNameId:res.courseNameId,
            courseDurationId:res.courseDurationId,
            traineeId:res.traineeId,
            budgetCodeId:res.budgetCodeId,
            paymentTypeId:res.paymentTypeId,
            installmentAmount:res.installmentAmount,
            installmentDate: res.installmentDate,
            nextInstallmentDate:res.nextInstallmentDate,
            presentBalance: res.presentBalance,
            paymentConfirmStatus: res.paymentConfirmStatus,
            receivedStatus: res.receivedStatus,
            menuPosition: res.menuPosition,
            isActive: res.isActive
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Course Budget Allocation';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedBudgetCode();
    this.getselectedBudgetType();
    this.getselectedFiscalYear();
    this.getselectedcoursename();
    this.getselectedPaymentType();
    if(this.role == this.userRole.ForeignTraining){
      this.getSelectedCourseDuration(this.masterData.coursetype.ForeignCourse);
    }else if (this.role == this.userRole.InterSeeviceCourse){
      this.getSelectedCourseDuration(this.masterData.coursetype.InterService);
    }
    

  }
  intitializeForm() {
    this.CourseBudgetAllocationForm = this.fb.group({
      courseBudgetAllocationId: [0],
      courseTypeId:[this.masterData.coursetype.ForeignCourse],
      courseNameId:[''],
      courseNamesId:[''],
      courseDurationId:[''],
      traineeId:[''],
      budgetCodeId:[''],
      budgetCodesId:[''],
      paymentTypeId:[''],
      installmentAmount:[''],
      nextInstallmentDate:[],
      installmentDate:[],
      presentBalance: [],
      paymentConfirmStatus: [0],
      receivedStatus: [0], 
      status:[],
      menuPosition: [],  
      isActive:[true]
    })
  }
  
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getCourseBudgetAllocationList();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getCourseBudgetAllocationList();
  } 

  onTraineeSelectionChange(dropdown){
    if (dropdown.isUserInput) {
      this.traineeId=dropdown.source.value;
      this.courseNameId =  this.CourseBudgetAllocationForm.get('courseNameId').value;
      this.getCourseBudgetAllocationList();
    }
  }

  onBudgetCodeSelectionChange(dropdown){
    if (dropdown.isUserInput) {
       var budgetCodeId = dropdown.source.value.value; 

       this.CourseBudgetAllocationForm.get('budgetCodeId').setValue(budgetCodeId);

       this.CourseBudgetAllocationService.getTotalBudgetByBudgetCodeIdRequest(budgetCodeId).subscribe(res=>{
       this.totalBudget=res[0].text; 
      });

      this.CourseBudgetAllocationService.getAvailableAmountByBudgetCodeIdRequest(budgetCodeId).subscribe(res=>{
        this.availableAmount=res[0].text; 
       });

       this.CourseBudgetAllocationService.getTargetAmountByBudgetCodeIdRequest(budgetCodeId).subscribe(res=>{
        this.targetAmount=res[0].text; 
       });
     }
  }

  onCourseNameSelectionChange(dropdown){
    console.log("Dropdown");

    var courseNameArr = dropdown.source.value.split('_');
    var courseDurationId = courseNameArr[0];
    var courseNameId = courseNameArr[1];

    this.CourseBudgetAllocationService.getSelectedTraineeByCourseDurationId(courseDurationId).subscribe(res=>{
    this.selectedTrainee=res 
   });

    this.CourseBudgetAllocationForm.get('courseNameId').setValue(courseNameId);
    this.CourseBudgetAllocationForm.get('courseDurationId').setValue(courseDurationId);
}

  getCourseBudgetAllocationList(){
    this.isLoading = true;
      this.CourseBudgetAllocationService.getCourseBudgetAllocations(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.courseNameId,this.traineeId).subscribe(response => {
        this.dataSource.data = response.items; 
        this.paging.length = response.totalItemsCount    
        this.isLoading = false;
        console.log("data source");
        console.log(this.dataSource.data);
      })
  }


  getselectedcoursename(){
    this.CourseWeekService.getselectedcoursename().subscribe(res=>{
      this.selectedcoursename=res
    });
  }

  // getSelectedTraineeByCourseDurationId(){

  // }
  getTotalBudgetByBudgetCodeIdRequest(){
    this.CourseBudgetAllocationService.getTotalBudgetByBudgetCodeIdRequest(MasterData.coursetype.ForeignCourse).subscribe(res=>{
      this.selectedCourseDuration=res
    });
  }

  getSelectedCourseDuration(CourseTypeId){
    this.CourseBudgetAllocationService.getSelectedCourseDurationByCourseTypeId(CourseTypeId).subscribe(res=>{
      this.selectedCourseDuration=res
    });
  }
  // getSelectedCourseName(){
  //   this.CourseBudgetAllocationService.getselectedBudgetCode().subscribe(res=>{
  //     this.selectedBudgetCode=res
  //   });
  // } 

  getselectedBudgetCode(){
    this.CourseBudgetAllocationService.getselectedBudgetCode().subscribe(res=>{
      this.selectedBudgetCode=res
    });
  } 
  getselectedPaymentType(){
    this.CourseBudgetAllocationService.getselectedPaymentType().subscribe(res=>{
      this.selectedPaymentType=res
    });
  }

  getselectedBudgetType(){
    this.CourseBudgetAllocationService.getselectedBudgetType().subscribe(res=>{
      this.selectedBudgetType=res
    });
  } 
  getselectedFiscalYear(){
    this.CourseBudgetAllocationService.getselectedFiscalYear().subscribe(res=>{
      this.selectedFiscalYear=res
    });
  } 

  deleteItem(row) {
    const id = row.courseBudgetAllocationId; 
    console.log("Budget code id");
    console.log(row.budgetCodeId);
    console.log("Payment type");
    console.log(row.paymentTypeId);
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
     // console.log(result);
      if (result) {
        this.CourseBudgetAllocationService.delete(id).subscribe(() => {
          this.reloadCurrentRoute();
         // this.getCourseBudgetAllocations();
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

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  onSubmit() {
    const id = this.CourseBudgetAllocationForm.get('courseBudgetAllocationId').value; 
    console.log(this.CourseBudgetAllocationForm.value);  
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.CourseBudgetAllocationService.update(+id,this.CourseBudgetAllocationForm.value).subscribe(response => {
            // this.router.navigateByUrl('/budget-management/coursebudgetallocation-list');
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
      this.loading=true;
      this.CourseBudgetAllocationService.submit(this.CourseBudgetAllocationForm.value).subscribe(response => {
        // this.router.navigateByUrl('/budget-management/coursebudgetallocation-list');
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
