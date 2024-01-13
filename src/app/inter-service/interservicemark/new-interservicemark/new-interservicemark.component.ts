import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { InterServiceMarkService } from '../../service/interservicemark.service';
import { MasterData } from 'src/assets/data/master-data';
import { InterServiceMark } from '../../models/interservicemark';
import { TraineeNominationService } from '../../service/traineenomination.service';
import { TraineeListforInterService } from '../../models/traineeListforinterservice';
import { CourseDurationService } from '../../service/courseduration.service';

@Component({
  selector: 'app-new-interservicemark',
  templateUrl: './new-interservicemark.component.html',
  styleUrls: ['./new-interservicemark.component.sass']
})
export class NewInterServiceMarkComponent implements OnInit {
  buttonText: string;
  pageTitle: string;
   masterData = MasterData;
  loading = false;
  destination: string;
  InterServiceMarkForm: FormGroup;
  validationErrors: string[] = [];
  courseTypeId: 19;
  selectedCourseName: SelectedModel[];
  selectedOrganization: SelectedModel[];
  selectedDocument: SelectedModel[];
  selectedPno: SelectedModel[];
  selectedCourseValue: SelectedModel[];
  traineeId: number;
  courseDurationId: number;
  courseNameId: string;
  interServiceMarkList: InterServiceMark[];
  isShown: boolean = false;
  traineeList: TraineeListforInterService[]
  selectedSubjectNameByBaseSchoolNameIdAndCourseNameId: SelectedModel[];
  selectedCourseDuration: number;
  organizationNameId: number;

  durateDateForm:any;
  durationDateTo:any;

  options = [];
  filteredOptions;
  searchText = "";

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }


  displayedColumnsForTraineeList: string[] = ['sl', 'traineeName', 'coursePosition', 'obtaintMark', 'documentId', 'remarks'];
  constructor(private snackBar: MatSnackBar, private courseDurationService: CourseDurationService , private traineeNominationService: TraineeNominationService, private InterServiceMarkService: InterServiceMarkService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('interServiceMarkId');

    if (id) {
      this.pageTitle = 'Edit Subject Mark Entry';
      this.destination = 'Edit';
      this.buttonText = "Update";
      this.InterServiceMarkService.find(+id).subscribe(
        res => {
          this.InterServiceMarkForm.patchValue({

            interServiceMarkId: res.interServiceMarkId,
            courseDurationId: res.courseDurationId,
            courseNameId: res.courseNameId,
            organizationNameId: res.organizationNameId,
            //documentId: res.documentId,
            courseTypeId: res.courseTypeId,
            traineeNominationId: res.traineeNominationId,
            //traineeId: res.traineeId,
            //coursePosition: res.coursePosition,
            //obtaintMark: res.obtaintMark,
            //remarks: res.remarks,

          });
          this.onOrganizationNameSelectionChangeGetCourse(res.organizationNameId)
        }
      );
    } else {
      this.pageTitle = 'Create Subject Mark Entry';
      this.destination = 'Add';
      this.buttonText = "Save";
    }
    this.intitializeForm();
    this.getSelectedOrganizationName();
    //this.getSelectedDocument();
    //this.getSelectedPno();
    //this.getselectedCourseNameByCourseTypeIdFromDuration();
    //this.getSelectedCourseName();

  }
  intitializeForm() {
    this.InterServiceMarkForm = this.fb.group({
      interServiceMarkId: [0],
      courseDurationId: [],
      courseNameId: [],
      organizationNameId: [],
      //documentId: [],
      courseTypeId: [this.courseTypeId],
      traineeNominationId: [],
      traineeId: [],
      traineeName: [''],
      coursePosition: [''],
      obtaintMark: [''],
      remarks: [''],
      traineeListForm: this.fb.array([
        this.createTraineeData()
      ]),
      isActive: [true],
      pno: ['']
    })

  }
  getControlLabel(index: number, type: string) {
    return (this.InterServiceMarkForm.get('traineeListForm') as FormArray).at(index).get(type).value;
  }
  private createTraineeData() {

    return this.fb.group({

      courseDurationId: [],
      courseNameId:[],
      traineeId: [],
      traineeNominationId:[],
      traineePNo: [],
      traineeName: [],
      rankPosition: [],
      coursePosition: [],
      obtaintMark: [],
      doc: [''],
    
      remarks: []
    });
  }
  getTraineeListonClick() {
    const control = <FormArray>this.InterServiceMarkForm.controls["traineeListForm"];
    console.log(this.traineeList)
    for (let i = 0; i < this.traineeList.length; i++) {
      control.push(this.createTraineeData());
      console.log("value...");
      console.log(this.traineeList)
    }
    this.InterServiceMarkForm.patchValue({ traineeListForm: this.traineeList });
    console.log("value...");
    console.log(this.traineeList)
  }

  clearList() {
    const control = <FormArray>this.InterServiceMarkForm.controls["traineeListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }
  onOrganizationNameSelectionChangeGetCourse(organizationNameId) {
    console.log(organizationNameId)
    this.InterServiceMarkService.getCourseNameByOrganizationNameId(organizationNameId).subscribe(res => {
      this.selectedCourseValue = res
      console.log(this.selectedCourseValue);

      
    });
  }
  onCourseNameSelectionChangeGetTraineeList(dropdown) {
    if (dropdown.isUserInput) {
    this.isShown = true;
      this.courseDurationId = this.InterServiceMarkForm.get('courseDurationId').value;
      this.courseDurationId = dropdown.source.value;

      this.InterServiceMarkForm.get('courseDurationId').setValue(dropdown.source.value)
      console.log("courseDurationId")
      console.log(this.courseDurationId)
      console.log("ddddd")

      this.courseDurationService.find(this.courseDurationId).subscribe(res => {
        this.durateDateForm = res.durationFrom;
        this.durationDateTo = res.durationTo;
        console.log(this.durateDateForm)
        console.log(this.durationDateTo)
      });

      this.traineeNominationService.getTraineeNominationByCourseDurationId(this.courseDurationId).subscribe(res => {
        this.traineeList = res;
        console.log(this.traineeList);
        this.clearList()
        this.getTraineeListonClick();
      });
    }
  }

  getSelectedOrganizationName() {
    this.InterServiceMarkService.getSelectedOrganizationName().subscribe(res => {
      this.selectedOrganization = res
    });
  }
  getSelectedDocument() {
    this.InterServiceMarkService.getSelectedDocument().subscribe(res => {
      this.selectedDocument = res
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  // onFileChanged(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log(file);
  //     this.ForeignCourseGOInfoForm.patchValue({
  //       doc: file,
  //     });
  //   }
  // }

  onFileChanged(event,form) {
    console.log(form);
   
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.labelImport.nativeElement.value = file.name;
      form.controls["doc"].setValue(event.target.files[0]);
    // this.BIODataGeneralInfoForm.controls["picture"].setValue(event.target.files[0]);
    // this.InterServiceMarkForm.get('traineeListForm')['controls'].patchValue({
    //     doc: file,
    //   });
    // this.InterServiceMarkForm.patchValue({
    //   doc: file
    // });
    }
  }

  onSubmit() {
    const id = this.InterServiceMarkForm.get('interServiceMarkId').value;
   // console.log(this.InterServiceMarkForm.value);

    // const formData = new FormData();
    // for (const key of Object.keys(this.InterServiceMarkForm.value)) {
    //   const value = this.InterServiceMarkForm.value[key];
    //   formData.append(key, value);

    // }  
  console.log("form data");
  console.log(this.InterServiceMarkForm.value);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.InterServiceMarkService.update(+id, this.InterServiceMarkForm.value).subscribe(response => {
            this.router.navigateByUrl('/inter-service/add-interservicemark');
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
    else {
      this.confirmService.confirm('Confirm Save message', 'Are You Sure Save This Records?').subscribe(result => {
        console.log(result);
        
        if(result){
          this.loading=true;
          this.InterServiceMarkService.submit(this.InterServiceMarkForm.value).subscribe(response => {
            
            console.log(response)
            this.reloadCurrentRoute();
            
            this.isShown = false;
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
      })
    }

  }
}
