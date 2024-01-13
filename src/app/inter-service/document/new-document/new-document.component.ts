import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { Document } from '../../models/document';
import { DocumentService } from '../../service/document.service';
import { CourseBudgetAllocationService } from 'src/app/budget-management/service/courseBudgetAllocation.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.sass']
})
export class NewDocumentComponent implements OnInit {
  buttonText:string;
  pageTitle: string;
  destination:string;
  courseDurationId:number;
  selectedCourseDuration:number;
  DocumentForm: FormGroup;
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

  displayedColumns: string[] = [ 'sl', 'foreignCourseDocType','fileUpload', 'actions'];
  dataSource: MatTableDataSource<Document> = new MatTableDataSource();

  selection = new SelectionModel<Document>(true, []);


  //displayedColumns: string[] = ['countryGroup', 'country', 'currencyName', 'allowancePercentage', 'dailyPayment',   'actions'];
  constructor(private snackBar: MatSnackBar,private CourseBudgetAllocationService:CourseBudgetAllocationService, private documentService: DocumentService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('documentId'); 
    if (id) {
      this.pageTitle = 'Edit Foreign Course Other Doc';
      this.destination='Edit';
     this.buttonText="Update";
      this.documentService.find(+id).subscribe(
        res => {
          this.DocumentForm.patchValue({          

            documentId: res.documentId,
            courseTypeId:res.courseTypeId,
            courseDurationId:res.courseDurationId,
            courseNameId:res.courseNameId,
            interServiceCourseDocTypeId: res.interServiceCourseDocTypeId,
            documentName: res.documentName,
            documentUpload: res.documentUpload,
            //menuPosition:res.menuPosition,
            isActive: res.isActive        
          });    
          //this.onCountryGroupSelectionChangeGetCountry(res.countryGroupId),
          //this.onCountrySelectionChangeGetCurrency(res.countryId)      
        }
      );
    } else {
      this.pageTitle = 'Create Foreign Course Other Doc';
      this.destination='Add';
     this.buttonText="Save";
    }
    this.intitializeForm();
    // this.getselectedCourseName();
     //this.getselectedDocType();
     this.getSelectedCourseDurationByCourseTypeId();
    this.getSelectedInterServiceCourseDocType();
    //this.getselectedCountry();
    //this.getselectedAllowancePercentages();
    //this.getselectedRank();
  }
  intitializeForm() {
    this.DocumentForm = this.fb.group({

      documentId: [0],
      courseTypeId:[''],
      courseDurationId:[''],
      courseDurations:[''],
      courseNameId:[''],
      interServiceCourseDocTypeId:[''],
      documentName: [''],
      documentUpload: [''],
      doc:[''],
      menuPosition:[''],
      isActive: [true]          
    })
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.DocumentForm.patchValue({
        doc: file,
      });
    }
  }
    

  onCourseSelectionChangeGetCourseModule(dropdown){
    this.isShown=true
    console.log(dropdown)
    if (dropdown.isUserInput) {
      var courseNameArr = dropdown.source.value.split('_');
      this.courseDurationId = courseNameArr[0];
      this.courseNameId = courseNameArr[1];
      this.DocumentForm.get('courseNameId').setValue(this.courseNameId);
      this.DocumentForm.get('courseDurationId').setValue(this.courseDurationId);
      this.DocumentForm.get('courseTypeId').setValue(MasterData.coursetype.InterService);
      // this.CourseBudgetAllocationService.getSelectedTraineeByCourseDurationId(this.courseDurationId).subscribe(res=>{
      //   this.selectedTrainee=res 
      // });
    }
  }
  
  getSelectedCourseDurationByCourseTypeId(){
    this.CourseBudgetAllocationService.getSelectedCourseDurationByCourseTypeId(MasterData.coursetype.InterService).subscribe(res=>{
      this.selectedCourseName=res
    });
  }

   
  getSelectedInterServiceCourseDocType(){
    this.documentService.getSelectedInterServiceCourseDocType().subscribe(res=>{
      this.selectedDocType=res;
    });
  }
  


 
  

  

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  onSubmit() {
    const id = this.DocumentForm.get('documentId').value;  
    console.log(this.DocumentForm.value); 
    const formData = new FormData();
    for (const key of Object.keys(this.DocumentForm.value)) {
      const value = this.DocumentForm.value[key];
      formData.append(key, value);
    } 
   // console.log(formData)
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.documentService.update(+id,formData).subscribe(response => {
            this.router.navigateByUrl('/inter-service/document-list');
            //this.reloadCurrentRoute();
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
      this.documentService.submit(formData).subscribe(response => {
        this.router.navigateByUrl('/inter-service/document-list');
        //this.reloadCurrentRoute();
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
