import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseWeekService } from '../../service/CourseWeek.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-new-courseweek',
  templateUrl: './new-courseweek.component.html',
  styleUrls: ['./new-courseweek.component.sass']
}) 
export class NewCourseWeekComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  CourseWeekForm: FormGroup;
  validationErrors: string[] = [];
  selectedcourseduration:SelectedModel[];
  selectedbaseschool:SelectedModel[]; 
  selectedcoursename:SelectedModel[];
  selectedcoursedurationbyschoolname: any;
  courseDurationId:any;

  role:any;
  traineeId:any;
  branchId:any;

  constructor(private snackBar: MatSnackBar, private authService: AuthService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private CourseWeekService: CourseWeekService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute ) { }

  ngOnInit(): void {

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)


    const id = this.route.snapshot.paramMap.get('courseWeekId'); 
    if (id) {
      this.pageTitle = 'Edit Course Week'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.CourseWeekService.find(+id).subscribe(
        res => {
          this.CourseWeekForm.patchValue({    
            
            courseWeekId: res.courseWeekId,
            courseDurationId: res.courseDurationId,
            courseNameId: res.courseNameId,
            baseSchoolNameId: res.baseSchoolNameId,
            weekName: res.weekName,
            dateFrom: res.dateFrom,
            dateTo: res.dateTo,
            remarks: res.remarks,
            status: res.status,
            menuPosition: res.menuPosition,
           // isActive: true
          });  
          console.log("Response");
          console.log(res);
          this.getselectedcoursedurationbyschoolname();
          var editArr = [res.courseDurationId, res.courseNameId, res.baseSchoolNameId];
          this.getselectedbnasubjectname(editArr)        
        }
      );
    } else {
      this.pageTitle = 'Create Course Week';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    if(this.role === 'Super Admin'){
      this.CourseWeekForm.get('baseSchoolNameId').setValue(this.branchId);
      this.getselectedcoursedurationbyschoolname();
     }
    this.getselectedbaseschools();
    this.getselectedcoursename();
    
    
  }
  intitializeForm() {
    this.CourseWeekForm = this.fb.group({
      courseWeekId: [0],
      courseDurationId:[''],
      courseNameId:[''],
      baseSchoolNameId:[''],
      weekName: [''],
      dateFrom: [],
      dateTo: [],
      remarks:[''],
      status:['0'],
      isActive: [true],   
    })
  }

  getselectedbaseschools(){
    this.CourseWeekService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschool=res
    });
  }

  getselectedcoursedurationbyschoolname(){
   
     var baseSchoolNameId=this.CourseWeekForm.value['baseSchoolNameId'];
    this.CourseWeekService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res=>{
      console.log(res);
      this.selectedcoursedurationbyschoolname=res;
    });
  } 

  getselectedbnasubjectname(dropdown){
    const id = this.route.snapshot.paramMap.get('courseWeekId'); 
    if(id){
      var courseDurationId = dropdown[0];
      var courseNameId=dropdown[1];
      var baseSchoolNameId=dropdown[2];
    }else{
      var baseSchoolNameId=this.CourseWeekForm.value['baseSchoolNameId'];
      var courseNameArr = dropdown.value.split('_');
      var courseDurationId = courseNameArr[0];
      var courseNameId=courseNameArr[1];
      this.CourseWeekForm.get('courseName').setValue(dropdown.text);
      this.CourseWeekForm.get('courseNameId').setValue(courseNameId);
      this.CourseWeekForm.get('courseDurationId').setValue(courseDurationId);
      console.log("after select course")
      console.log(courseDurationId)
      console.log(courseNameId)
    } 
  } 

  getselectedcoursename(){
    this.CourseWeekService.getselectedcoursename().subscribe(res=>{
      this.selectedcoursename=res
    });
  }

  onSubmit() {
    const id = this.CourseWeekForm.get('courseWeekId').value;   
    // console.log(this.CourseWeekForm.value)
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.CourseWeekService.update(+id,this.CourseWeekForm.value).subscribe(response => {
            this.router.navigateByUrl('/course-management/courseweek-list');
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
      this.CourseWeekService.submit(this.CourseWeekForm.value).subscribe(response => {
        console.log(this.CourseWeekForm.value)
        this.router.navigateByUrl('/course-management/courseweek-list');
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
