import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseBudgetAllocationService } from '../../service/courseBudgetAllocation.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { CourseWeekService } from 'src/app/course-management/service/CourseWeek.service';

@Component({
  selector: 'app-new-coursebudgetallocation',
  templateUrl: './new-coursebudgetallocation.component.html',
  styleUrls: ['./new-coursebudgetallocation.component.sass']
}) 
export class NewCourseBudgetAllocationComponent implements OnInit {
   masterData = MasterData;
  loading = false;
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

  constructor(private snackBar: MatSnackBar,private CourseWeekService: CourseWeekService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private CourseBudgetAllocationService: CourseBudgetAllocationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
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
            presentBalance: res.presentBalance,
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
  }
  intitializeForm() {
    this.CourseBudgetAllocationForm = this.fb.group({
      courseBudgetAllocationId: [0],
      courseTypeId:[this.masterData.coursetype.ForeignCourse],
      courseNameId:[''],
      courseDurationId:[''],
      traineeId:[''],
      budgetCodeId:[''],
      paymentTypeId:[''],
      installmentAmount:[''],
      installmentDate:[],
      presentBalance: [],  
      menuPosition: [],  
      isActive:[true]
    })
  }
  
  getselectedcoursename(){
    this.CourseWeekService.getselectedcoursename().subscribe(res=>{
      this.selectedcoursename=res
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

  


 

  onSubmit() {
    const id = this.CourseBudgetAllocationForm.get('courseBudgetAllocationId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.CourseBudgetAllocationService.update(+id,this.CourseBudgetAllocationForm.value).subscribe(response => {
            this.router.navigateByUrl('/foreign-training/coursebudgetallocation-list');
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
        this.router.navigateByUrl('/foreign-training/coursebudgetallocation-list');
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
