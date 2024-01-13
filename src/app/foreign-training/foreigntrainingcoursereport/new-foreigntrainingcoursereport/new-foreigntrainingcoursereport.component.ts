import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { ForeignTrainingCourseReport } from '../../models/ForeignTrainingCourseReport';
//import { ForeignTrainingCourseReport } from 'src/app/foreign-training/models/ForeignTrainingCourseReport';
//import { ForeignTrainingCourseReportService } from 'src/app/fore';
import { ForeignTrainingCourseReportService } from '../../service/ForeignTrainingCourseReport.service';
import { CourseBudgetAllocationService } from 'src/app/budget-management/service/courseBudgetAllocation.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-new-foreigntrainingcoursereport',
  templateUrl: './new-foreigntrainingcoursereport.component.html',
  styleUrls: ['./new-foreigntrainingcoursereport.component.sass']
})
export class NewForeignTrainingCourseReportComponent implements OnInit {
  buttonText:string;
  pageTitle: string;
  destination:string;
  courseDurationId:any;
  selectedCourseDuration:number;
  ForeignTrainingCourseReportForm: FormGroup;
  validationErrors: string[] = [];
  selectedCountryGroup:SelectedModel[];
  selectedCourseName:SelectedModel[];
  selectedCountry:SelectedModel[];
  selectedAllowancePercentages:SelectedModel[];
  selectedRanks:SelectedModel[];
  selectedCountryValue:SelectedModel[];
  selectedCurrencyValue:SelectedModel[];
  selectedTrainee:SelectedModel[];
  selectedDocType:SelectedModel[];
  traineeId:any;
  isShown: boolean = false;
  courseNameId:any;
  ForeignCourseOtherDocumentId:any;
  fileAttr = 'Choose File';
  imageUrl:string="/assets/img/icon.png";
  public files: any[];


   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Document[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl', 'remarks','fileUpload', 'actions'];
  dataSource: MatTableDataSource<ForeignTrainingCourseReport> = new MatTableDataSource();

  selection = new SelectionModel<ForeignTrainingCourseReport>(true, []);


  //displayedColumns: string[] = ['countryGroup', 'country', 'currencyName', 'allowancePercentage', 'dailyPayment',   'actions'];
  constructor(private snackBar: MatSnackBar, private authService: AuthService,private CourseBudgetAllocationService:CourseBudgetAllocationService, private ForeignTrainingCourseReportService: ForeignTrainingCourseReportService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('foreignTrainingCourseReportid'); 

    const role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    // const branchId =  this.authService.currentUserValue.branchId.trim();
    const branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(role, this.traineeId, branchId)

    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    console.log(this.traineeId, this.courseDurationId,  this.courseNameId)

    if (id) {
      this.pageTitle = 'Edit Course Report';
      this.destination='Edit';
     this.buttonText="Update";
      this.ForeignTrainingCourseReportService.find(+id).subscribe(
        res => {
          this.ForeignTrainingCourseReportForm.patchValue({          

            foreignTrainingCourseReportid: res.foreignTrainingCourseReportid,
            courseDurationId:res.courseDurationId,
            courseNameId:res.courseNameId,
            traineeId:res.traineeId,
            remarks: res.remarks,
            doc: res.doc,
            //menuPosition:res.menuPosition,
            isActive: res.isActive        
          });    
          //this.onCountryGroupSelectionChangeGetCountry(res.countryGroupId),
          //this.onCountrySelectionChangeGetCurrency(res.countryId)      
        }
      );
    } else {
      this.pageTitle = 'Upload Course Report';
      this.destination='Add';
     this.buttonText="Save";
    }
    this.intitializeForm();
    this.getStudentForeignTrainingCourseReports();
    if(!id){
      this.ForeignTrainingCourseReportForm.get('courseNameId').setValue(this.courseNameId);
      this.ForeignTrainingCourseReportForm.get('courseDurationId').setValue(this.courseDurationId);
      this.ForeignTrainingCourseReportForm.get('traineeId').setValue(this.traineeId);
    }
  }
  intitializeForm() {
    this.ForeignTrainingCourseReportForm = this.fb.group({

      foreignTrainingCourseReportid: [0],
      courseDurationId:[''],
      courseNameId:[''],
      traineeId:[''],
      remarks: [''],
      doc:[''],
      docFile:[''],
      // menuPosition:[''],
      isActive: [true]          
    })
  }

  getStudentForeignTrainingCourseReports() {
    this.isLoading = true;
    this.ForeignTrainingCourseReportService.getStudentForeignTrainingCourseReports(this.paging.pageIndex, this.paging.pageSize,this.searchText, this.traineeId, this.courseDurationId).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      console.log(this.dataSource.data);
    })
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.ForeignTrainingCourseReportForm.patchValue({
        docFile: file,
      });
    }
  }
    
  deleteItem(row) {
    const id = row.foreignTrainingCourseReportid; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.ForeignTrainingCourseReportService.delete(id).subscribe(() => {
          this.reloadCurrentRoute();
          //this.getStudentInterServiceCourseReports();
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
    const id = this.ForeignTrainingCourseReportForm.get('foreignTrainingCourseReportid').value;  
    console.log(this.ForeignTrainingCourseReportForm.value); 
    const formData = new FormData();
    for (const key of Object.keys(this.ForeignTrainingCourseReportForm.value)) {
      const value = this.ForeignTrainingCourseReportForm.value[key];
      formData.append(key, value);
    } 
   // console.log(formData)
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.ForeignTrainingCourseReportService.update(+id,formData).subscribe(response => {
            //this.router.navigateByUrl('/foreigntraining-dashboard/document-list');
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
    } else {
      
      this.loading=true;
      this.ForeignTrainingCourseReportService.submit(formData).subscribe(response => {
        // this.router.navigateByUrl('/foreigntraining-dashboard/document-list');
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
