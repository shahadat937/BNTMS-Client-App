import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReadingMaterialService } from '../../service/readingmaterial.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { CourseNameService } from 'src/app/basic-setup/service/CourseName.service';
import { ReadingMaterial } from '../../models/readingmaterial';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { HttpEvent, HttpEventType  } from '@angular/common/http';
import {FileDialogMessageComponent} from '../file-dialog-message/file-dialog-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-readingmaterial',
  templateUrl: './new-readingmaterial.component.html',
  styleUrls: ['./new-readingmaterial.component.sass']
})
export class NewReadingMaterialComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  roleList = Role;
  buttonText: string;
  pageTitle: string;
  destination: string;
  ReadingMaterialForm: FormGroup;
  validationErrors: string[] = [];
  selectedcourse: SelectedModel[];
  selectedschool: SelectedModel[];
  selecteddocs: SelectedModel[];
  selectedLocationType: SelectedModel[];
  selecteddownload: SelectedModel[];
  selectedReadingMaterialTitle: SelectedModel[];
  isShown: boolean = false;
  options = [];
  courseNameId: number;
  traineeId: any;
  role:any;
  loggedTraineeId:any;
  branchId:any;
  schoolId: any;
  baseSchoolNameId: number;
  readingMaterialTitleId: number;
  readingMaterialList: ReadingMaterial[];
  public files: any[];
  progress: number = 0;
  btnShow=true;
  showSpinner=false;
  documentTypeId:any;
  IsAuthorNameShow:boolean=false;
  IsPublisherNameShow:boolean=false;
  displayedColumns: string[] = ['ser', 'readingMaterialTitle', 'documentName', 'documentType', 'document', 'actions'];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  filteredOptions;

  constructor(public dialog: MatDialog,private snackBar: MatSnackBar, private authService: AuthService,private courseNameService: CourseNameService, private confirmService: ConfirmService, private CodeValueService: CodeValueService, private ReadingMaterialService: ReadingMaterialService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,) {
    this.files = [];
  }

  ngOnInit(): void {
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    const id = this.route.snapshot.paramMap.get('readingMaterialId');

    this.role = this.authService.currentUserValue.role.trim();
    this.loggedTraineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
   // console.log(this.role, this.traineeId, this.branchId)


    if (id) {
      this.pageTitle = 'Edit Reading Material';
      this.destination = "Edit";
      this.buttonText = "Update"
      this.ReadingMaterialService.find(+id).subscribe(
        res => {
         // console.log('update data' , res);
          this.ReadingMaterialForm.patchValue({
            readingMaterialId: res.readingMaterialId,
            readingMaterialTitleId: res.readingMaterialTitleId,
            courseNameId: res.courseNameId,
            documentName: res.documentName,
           // baseSchoolNameId: res.baseSchoolNameId,
            documentTypeId: res.documentTypeId,
            documentLink: res.documentLink,
            showRightId: res.showRightId,
            downloadRightId: res.downloadRightId,
            isApproved: res.isApproved,
            approvedDate: res.approvedDate,
            approvedUser: res.approvedUser,
            status: res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
            course: res.courseName,
          });
        //  console.log("Response");
         // console.log(res);
          this.courseNameId = res.courseNameId;
        }
      );
    } else {
      this.pageTitle = 'Create Reading Material';
      this.destination = "Add";
      this.buttonText = "Save"
    }
    this.intitializeForm();
    if(this.role != this.roleList.MasterAdmin){
      this.ReadingMaterialForm.get('baseSchoolNameId').setValue(this.branchId);
      this.ReadingMaterialForm.get('showRightId').setValue(this.branchId);
    }
    this.getselectedcoursename();
    this.getselectedschools();
    this.getselectedDocumentType();
    this.getselecteddownloadright();
    this.getSelectedReadingMaterial();
  }
  intitializeForm() { 
    this.ReadingMaterialForm = this.fb.group({
      readingMaterialId: [0],
      readingMaterialTitleId: [''],
      courseNameId: [''],
      course: [''],
      documentName: [''],
      baseSchoolNameId: [''],
      documentTypeId: [],
      documentLink: [''],
      doc: [''],
      showRightId: [''],
      downloadRightId: [''],
      isApproved: [true],
      approvedDate: [],
      approvedUser: [''],
      status: [1],
      isActive: [true],
      aurhorName:[''],
      publisherName:['']
    })
    //autocomplete
    this.ReadingMaterialForm.get('course').valueChanges
      .subscribe(value => {
        this.getSelectedCourseByName(value);
      })
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
    //  console.log(file);
      if(file.size >2147483648){
        let tempDirection;
        if (localStorage.getItem('isRtl') === 'true') {
          tempDirection = 'rtl';
        } else {
          tempDirection = 'ltr';
        }
        const dialogRef = this.dialog.open(FileDialogMessageComponent, {
         // data: this.spareStockBySpRequest,
          direction: tempDirection,
        });
         this.btnShow=false;
       //  console.log("file size greater then 1Gb");
      }

      else{
        this.btnShow=true;
      }
      this.ReadingMaterialForm.patchValue({
        doc: file,
      });
    }
  }

  //autocomplete
  onCourseSelectionChanged(item) {
    // console.log(item);
    this.courseNameId = item.value
    this.ReadingMaterialForm.get('courseNameId').setValue(item.value);
    this.ReadingMaterialForm.get('course').setValue(item.text);
    this.baseSchoolNameId = this.ReadingMaterialForm.get('baseSchoolNameId').value;

    
  }
  onDocumentTypeSelectionChange(event){
    if (event.isUserInput) {
      this.documentTypeId = event.source.value;
      if(this.documentTypeId == 2){
        this.IsAuthorNameShow = true;
        this.IsPublisherNameShow =true;
      }
      else{
        this.IsAuthorNameShow = false;
        this.IsPublisherNameShow =false;
      }
    }
  }
  onShowRightSelectionChange(dropdown) {
    this.isShown = true;
    if (dropdown.isUserInput) {
      this.readingMaterialTitleId = dropdown.source.value;
      //console.log(this.readingMaterialTitleId);
    }
  }

  onMaterialTitleSelectionChange(dropdown) {
    this.isShown = true;
    if (dropdown.isUserInput) {
      this.ReadingMaterialForm.get('readingMaterialTitleId').setValue(dropdown.source.value);
      this.baseSchoolNameId = this.ReadingMaterialForm.get('baseSchoolNameId').value;
      this.courseNameId = this.ReadingMaterialForm.get('courseNameId').value;
      this.readingMaterialTitleId = dropdown.source.value;

      this.ReadingMaterialService.getSelectedReadingMaterialByMaterialTitleIdBaseSchoolIdAndCourseNameId(this.baseSchoolNameId, this.courseNameId, this.readingMaterialTitleId).subscribe(response => {
        this.readingMaterialList = response;
        //console.log(this.readingMaterialList);
      })
    }
  }
  //autocomplete
  getSelectedCourseByName(coursename) {
    this.courseNameService.getSelectedCourseByName(coursename).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }

  getSelectedReadingMaterial() {
    this.ReadingMaterialService.getSelectedReadingMaterial().subscribe(res => {
      this.selectedReadingMaterialTitle = res;
    });
  }
  getselectedcoursename() {
    this.ReadingMaterialService.getselectedcoursename().subscribe(res => {
      this.selectedcourse = res;
    });
  }

  getselectedschools() {
    this.ReadingMaterialService.getselectedschools().subscribe(res => {
      this.selectedschool = res;
    });
  }

  getselectedDocumentType() {
    this.ReadingMaterialService.getselectedDocumentType().subscribe(res => {
      this.selecteddocs = res
    });
  }

  getselecteddownloadright() {
    this.ReadingMaterialService.getselecteddownloadright().subscribe(res => {
      this.selecteddownload = res
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  onSubmit() {
    const id = this.ReadingMaterialForm.get('readingMaterialId').value;
    //console.log(this.ReadingMaterialForm.value)
    this.ReadingMaterialForm.get('approvedDate').setValue((new Date(this.ReadingMaterialForm.get('approvedDate').value)).toUTCString());
    const formData = new FormData();
    for (const key of Object.keys(this.ReadingMaterialForm.value)) {
      const value = this.ReadingMaterialForm.value[key];
      formData.append(key, value);
    }

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
       // console.log(result);
        if (result) {
          this.loading = true;
          this.ReadingMaterialService.update(+id, formData).subscribe(response => {
            if(this.traineeId){              
              const url = '/admin/dashboard/readingmateriallistinstructor/'+this.traineeId+'/'+this.schoolId;          
              this.router.navigateByUrl(url);
            }else{

              this.router.navigateByUrl('/reading-materials/readingmaterial-list');
            }
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
      this.loading = true;
      this.ReadingMaterialService.submit(formData).subscribe((event: HttpEvent<any>) => {
       // console.log(this.ReadingMaterialForm);

        switch (event.type) {
          case HttpEventType.Sent:
          //  console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
          //  console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
           // console.log(`Uploaded! ${this.progress}%`);
            this.showSpinner=true;
            break;
          case HttpEventType.Response:
            //console.log('User successfully created!', event.body);

            setTimeout(() => {
              this.progress = 0;
            }, 1500);
            this.snackBar.open('Information Inserted Successfully ', '', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success'
            });
            this.showSpinner =false;
            this.router.navigateByUrl('/reading-materials/readingmaterial-list');
        }
      //  this.reloadCurrentRoute();
        
        // }, error => {
        //   this.validationErrors = error;
        // })

        // if(this.progress == 100){
        //   this.snackBar.open('Information Inserted Successfully ', '', {
        //     duration: 2000,
        //     verticalPosition: 'bottom',
        //     horizontalPosition: 'right',
        //     panelClass: 'snackbar-success'
        //   });
        // }
      }, error => {
        this.validationErrors = error;
      });

      // if(this.traineeId){  
      //     const url = '/admin/dashboard/readingmateriallistinstructor/'+this.traineeId+'/'+this.schoolId;            
      //     this.router.navigateByUrl(url);
      //   }else{    
      //     this.router.navigateByUrl('/reading-materials/readingmaterial-list');
      //   }

          // }, error => {
          //   this.validationErrors = error;
          // })
    
    // else {
    //   this.ReadingMaterialService.submit(formData).subscribe(response => {
    //     console.log(this.ReadingMaterialForm);
    //     if(this.traineeId){  
    //       const url = '/admin/dashboard/readingmateriallistinstructor/'+this.traineeId+'/'+this.schoolId;            
    //       this.router.navigateByUrl(url);
    //     }else{

    //       this.router.navigateByUrl('/reading-materials/readingmaterial-list');
    //     }
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

  // }
    }
  }
}
