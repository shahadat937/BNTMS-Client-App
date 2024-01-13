import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { InterserviceReport } from '../../models/interservicereport';
import { InterserviceReportService } from '../../service/interservicereport.service';
import { CourseBudgetAllocationService } from 'src/app/budget-management/service/courseBudgetAllocation.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-new-Interservicereport',
  templateUrl: './new-Interservicereport.component.html',
  styleUrls: ['./new-Interservicereport.component.sass']
})
export class NewInterserviceReportComponent implements OnInit {
  buttonText:string;
  pageTitle: string;
  destination:string;
  courseDurationId:any;
  selectedCourseDuration:number;
  InterserviceReportForm: FormGroup;
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
  dataSource: MatTableDataSource<InterserviceReport> = new MatTableDataSource();

  selection = new SelectionModel<InterserviceReport>(true, []);


  //displayedColumns: string[] = ['countryGroup', 'country', 'currencyName', 'allowancePercentage', 'dailyPayment',   'actions'];
  constructor(private snackBar: MatSnackBar, private authService: AuthService,private CourseBudgetAllocationService:CourseBudgetAllocationService, private interserviceReportService: InterserviceReportService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('interServiceCourseReportid'); 

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
      this.interserviceReportService.find(+id).subscribe(
        res => {
          this.InterserviceReportForm.patchValue({          

            interServiceCourseReportid: res.interServiceCourseReportid,
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
    this.getStudentInterServiceCourseReports();
    if(!id){
      this.InterserviceReportForm.get('courseNameId').setValue(this.courseNameId);
      this.InterserviceReportForm.get('courseDurationId').setValue(this.courseDurationId);
      this.InterserviceReportForm.get('traineeId').setValue(this.traineeId);
    }
  }
  intitializeForm() {
    this.InterserviceReportForm = this.fb.group({

      interServiceCourseReportid: [0],
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

  getStudentInterServiceCourseReports() {
    this.isLoading = true;
    this.interserviceReportService.getStudentInterServiceCourseReports(this.paging.pageIndex, this.paging.pageSize,this.searchText, this.traineeId, this.courseDurationId).subscribe(response => {
     

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
      this.InterserviceReportForm.patchValue({
        docFile: file,
      });
    }
  }
    
  deleteItem(row) {
    const id = row.interServiceCourseReportid; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.interserviceReportService.delete(id).subscribe(() => {
          this.getStudentInterServiceCourseReports();
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
    const id = this.InterserviceReportForm.get('interServiceCourseReportid').value;  
    console.log(this.InterserviceReportForm.value); 
    const formData = new FormData();
    for (const key of Object.keys(this.InterserviceReportForm.value)) {
      const value = this.InterserviceReportForm.value[key];
      formData.append(key, value);
    } 
   // console.log(formData)
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.interserviceReportService.update(+id,formData).subscribe(response => {
            //this.router.navigateByUrl('/inter-service/document-list');
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
      this.interserviceReportService.submit(formData).subscribe(response => {
        // this.router.navigateByUrl('/inter-service/document-list');
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
