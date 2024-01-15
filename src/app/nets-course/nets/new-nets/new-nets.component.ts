import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDurationService } from '../../service/courseduration.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-nets',
  templateUrl: './new-nets.component.html',
  styleUrls: ['./new-nets.component.sass']
})
export class NewNETSComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  CourseDurationForm: FormGroup;
  validationErrors: string[] = [];
  selectedcoursetype:SelectedModel[];
  courseTypeId:string;
  selectedcoursename:SelectedModel[];
  selectedschoolname:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private CourseDurationService: CourseDurationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseDurationId'); 
     this.courseTypeId= this.route.snapshot.paramMap.get('courseTypeId');  
     console.log(this.courseTypeId);
    if (id) {
      this.pageTitle = 'Edit NETS Course'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.CourseDurationService.find(+id).subscribe(
        res => {
          this.CourseDurationForm.patchValue({          
            courseDurationId:res.courseDurationId, 
            courseNameId: res.courseNameId, 
            courseTitle:res.courseTitle, 
            baseSchoolNameId:res.baseSchoolNameId, 
            noOfCandidates:res.noOfCandidates,
            durationFrom:res.durationFrom, 
            durationTo:res.durationTo,
            professional:res.professional,
            nbcd:res.nbcd,
            remark:res.remark,
            courseTypeId:res.courseTypeId,
            countryId:res.countryId,
            baseNameId:res.baseNameId,
            organizationNameId:res.organizationNameId,
            status:res.status,
            menuPosition: res.menuPosition,
            isCompletedStatus:res.isCompletedStatus,
            isActive: res.isActive,
          });     
          
        }
      );
    } else {
      this.pageTitle = 'Create NETS Course'; 
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedcoursename();
   // this.getselectedbaseschools();
   //this.selectedschoolname=this.masterData.schoolName.NETS
    
   this.CourseDurationForm.get('baseSchoolNameId').setValue(this.masterData.schoolName.NETS);
    this.getselectedcoursetype();
  }
  intitializeForm() {
    this.CourseDurationForm = this.fb.group({
      courseDurationId: [0],
      courseNameId:[''],
      courseTitle:[''],
      baseSchoolNameId:[''],
      noOfCandidates:[''],
      baseNameId:[],
      durationFrom:[],
      durationTo:[],    
      professional:[''],
      nbcd:[''], 
      remark:[''],
      courseTypeId:[this.masterData.coursetype.NETS], //nets Mean Course Type Graduation
      organizationNameId:[],
      isCompletedStatus:[0],
      status:[3],
      isActive: [true],    
    })
  }
  getselectedcoursename(){
    this.CourseDurationService. getSelectedCourseByType(this.masterData.coursetype.NETS).subscribe(res=>{
      this.selectedcoursename=res
      console.log(this.selectedcoursename)
    });
  }
  getselectedcoursetype(){
    this.CourseDurationService.getselectedcoursetype().subscribe(res=>{
      this.selectedcoursetype=res
      console.log(this.selectedcoursetype)
    });
  } 
  // getselectedbaseschools(){
  //   this.CourseDurationService.getselectedbaseschools().subscribe(res=>{
  //     this.selectedschoolname=res
  //   });
  // }
  onSubmit() {
    const id = this.CourseDurationForm.get('courseDurationId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        //console.log(result);
        if (result) {
          this.loading=true;
          this.CourseDurationService.update(+id,this.CourseDurationForm.value).subscribe(response => {
            this.router.navigateByUrl('/nets-course/nets-list');
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
      this.CourseDurationService.submit(this.CourseDurationForm.value).subscribe(response => {
        this.router.navigateByUrl('/nets-course/nets-list');
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
