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
  selector: 'app-new-courseduration',
  templateUrl: './new-courseduration.component.html',
  styleUrls: ['./new-courseduration.component.sass']
}) 
export class NewCourseDurationComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  CourseDurationForm: FormGroup;
  validationErrors: string[] = [];
  selectedcourse:SelectedModel[];
  selectedbaseschool:SelectedModel[];
  selectedcountry:SelectedModel[];
  selectedLocationType:SelectedModel[];
  selectedcoursetype:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private CourseDurationService: CourseDurationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseDurationId'); 
    if (id) {
      this.pageTitle = 'Edit Course Duration'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.CourseDurationService.find(+id).subscribe(
        res => {
          this.CourseDurationForm.patchValue({          
            courseDurationId:res.courseDurationId, 
            courseNameId: res.courseNameId, 
            courseTitle:res.courseTitle, 
            baseSchoolNameId:res.baseSchoolNameId, 
            durationFrom:res.durationFrom, 
            durationTo:res.durationTo,
            professional:res.durationTo,
            nbcd:res.nbcd,
            remark:res.remark,
            courseTypeId:res.courseTypeId,
            countryId:res.countryId,
            isCompletedStatus:res.isCompletedStatus,
            isApproved:res.isApproved,
            approvedBy:res.approvedBy,
            approvedDate:res.approvedDate,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Course Duration';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedcoursename();
    this.getselectedbaseschools();
    this.getselectedcountry();
    this.getselectedcoursetype();
  }
  intitializeForm() {
    this.CourseDurationForm = this.fb.group({
      courseDurationId: [0],
      courseNameId:['',Validators.required],
      courseTitle:['',Validators.required],
      baseSchoolNameId:['',Validators.required],
      durationFrom:[],
      durationTo:[],    
      professional:[''],
      nbcd:[''], 
      remark:[''],
      courseTypeId:[],
      countryId:[],
      isCompletedStatus:[],
      isApproved:[],
      approvedBy:[],
      approvedDate:[],
      status:[1],
      isActive: [true],    
    })
  }
  

  getselectedcoursename(){
    this.CourseDurationService.getselectedcoursename().subscribe(res=>{
      this.selectedcourse=res
    });
  } 

  getselectedcoursetype(){
    this.CourseDurationService.getselectedcoursetype().subscribe(res=>{
      this.selectedcoursetype=res
    });
  } 

  getselectedbaseschools(){
    this.CourseDurationService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschool=res
    });
  }

  getselectedcountry(){
    this.CourseDurationService.getselectedcountry().subscribe(res=>{
      this.selectedcountry=res
    });
  }

  onSubmit() {
    const id = this.CourseDurationForm.get('courseDurationId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.CourseDurationService.update(+id,this.CourseDurationForm.value).subscribe(response => {
            this.router.navigateByUrl('/course-management/courseduration-list');
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
      this.loading = true;
      this.CourseDurationService.submit(this.CourseDurationForm.value).subscribe(response => {
        this.router.navigateByUrl('/course-management/courseduration-list');
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
