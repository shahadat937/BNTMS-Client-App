import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDurationService } from '../../../course-management/service/courseduration.service';
import { ConfirmService } from '../../../core/service/confirm.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-update-courseduration',
  templateUrl: './update-courseduration.component.html',
  styleUrls: ['./update-courseduration.component.sass']
})
export class UpdateCourseDurationComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  CourseDurationForm: FormGroup;
  validationErrors: string[] = [];
  selectedbaseschool:SelectedModel[];
  courseDurationId:any;
  selectedSchoolName:any;
  nbcdCourseList:any;
  nbcdStatus:any;

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CourseDurationService: CourseDurationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    if (this.courseDurationId) {
      this.pageTitle = 'Edit NBCD Course';
      this.destination = "Edit";
      this.btnText = 'Update';
      // this.CourseDurationService.find(+id).subscribe(
      //   res => {
      //     this.CourseDurationForm.patchValue({          
      //       nbcdSchoolId: res.nbcdSchoolId,
      //       nbcdDurationFrom: res.nbcdDurationFrom,
      //       nbcdDurationTo:res.nbcdDurationTo,
      //       nbcdStatus: res.nbcdStatus
      //     });          
      //   }
      // );
    } else {
      this.pageTitle = 'Create NBCD Course';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
    this.getselectedbaseschools();
    this.getNbcdSchoolByCourseDurationId();
  }
  intitializeForm() {
    this.CourseDurationForm = this.fb.group({
      courseDurationId:[this.courseDurationId],
     // nbcdSchoolId: [''],
      nbcdDurationFrom: [''],
      nbcdDurationTo:[''],
      nbcdStatus: [0]
    })
  }
  getselectedbaseschools(){
    this.CourseDurationService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschool=res
    });
  }
  getNbcdSchoolByCourseDurationId(){
    this.CourseDurationService.getNbcdSchoolByCourseDurationId(this.courseDurationId).subscribe(res=>{
      this.selectedSchoolName=res[0].schoolName;
    });
  }
  // onSchoolSelectionChange(){
  //   var baseSchoolNameId=this.CourseDurationForm.value['nbcdSchoolId'];
  //   this.CourseDurationService.getCourseDurationList(baseSchoolNameId,this.courseDurationId).subscribe(res=>{
  //     this.nbcdCourseList=res
  //    this.nbcdStatus =res[0].nbcdStatus;
  //   });
  // }
  onSubmit() {
   // const id = this.CourseDurationForm.get('courseDurationId').value;  
   // if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.CourseDurationService.updateNbcdCourseDuration(+this.courseDurationId,this.CourseDurationForm.value).subscribe(response => {
            this.router.navigateByUrl('/admin/dashboard/school-dashboard');
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
    // }  else {
    //   this.loading=true;
    //   this.CourseDurationService.submit(this.CourseDurationForm.value).subscribe(response => {
    //     this.router.navigateByUrl('/basic-setup/CourseDuration-list');
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
 
  }

}
