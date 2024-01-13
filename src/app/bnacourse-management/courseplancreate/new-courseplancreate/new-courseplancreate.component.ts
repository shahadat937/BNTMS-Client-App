import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseplanCreateService } from '../../service/CourseplanCreate.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-CourseplanCreate',
  templateUrl: './new-CourseplanCreate.component.html',
  styleUrls: ['./new-CourseplanCreate.component.sass']
}) 
export class NewCourseplanCreateComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  CourseplanCreateForm: FormGroup;
  validationErrors: string[] = [];
  selectedcourseduration:SelectedModel[];
  selectedbaseschool:SelectedModel[]; 
  selectedcoursename:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private CourseplanCreateService: CourseplanCreateService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('coursePlanCreateId'); 
    if (id) {
      this.pageTitle = 'Edit Plan Create'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.CourseplanCreateService.find(+id).subscribe(
        res => {
          this.CourseplanCreateForm.patchValue({    
            
            coursePlanCreateId: res.coursePlanCreateId,
            courseDurationId: res.courseDurationId,
            courseNameId: res.courseNameId,
            baseSchoolNameId: res.baseSchoolNameId,
            coursePlanName: res.coursePlanName,
            value: res.value,
            status: res.status,
            menuPosition: res.menuPosition,
           // isActive: true
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Course Plan';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedcourseduration();
    this.getselectedbaseschools();
    this.getselectedcoursename();
    //this.multipleAddForm()
    
  }
  intitializeForm() {
    this.CourseplanCreateForm = this.fb.group({
      coursePlanCreateId: [0],
     // courseDurationId:[''],
      courseNameId:[''],
      baseSchoolNameId:[''],
      coursePlanName:[],    
      value:[''],
      status:['1'],
      isActive: [true],  
      courseplanlist: this.fb.array([]) ,  
    })
  }
 
  //multiple add
  coursePlanCreates() : FormArray {  
    return this.CourseplanCreateForm.get("courseplanlist") as FormArray  
  }  
  //multiple add
  newCoursePlan(): FormGroup {  
    return this.fb.group({  
      coursePlanName: [''],  
      value: [''],   
    })  
  }  
   //multiple add
  addCoursePlan() {  
    this.coursePlanCreates().push(this.newCoursePlan());  
    console.log(this.coursePlanCreates().value);
  }  
  //multiple add   
  removeCoursePlan(i:number) {    
    this.coursePlanCreates().removeAt(i);  
  }  


  getselectedcourseduration(){
    this.CourseplanCreateService.getselectedcourseduration().subscribe(res=>{
      this.selectedcourseduration=res
    });
  } 

  getselectedbaseschools(){
    this.CourseplanCreateService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschool=res
    });
  }

  getselectedcoursename(){
    this.CourseplanCreateService.getselectedcoursename().subscribe(res=>{
      this.selectedcoursename=res
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  onSubmit() {
    const id = this.CourseplanCreateForm.get('coursePlanCreateId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.CourseplanCreateService.update(+id,this.CourseplanCreateForm.value).subscribe(response => {
            this.router.navigateByUrl('/course-management/courseplancreate-list');
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
      this.CourseplanCreateService.submit(this.CourseplanCreateForm.value).subscribe(response => {
        console.log(this.CourseplanCreateForm.value)
        this.router.navigateByUrl('/course-management/courseplancreate-list');
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
