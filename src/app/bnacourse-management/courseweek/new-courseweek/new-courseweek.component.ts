import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseWeekService } from '../../service/CourseWeek.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

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

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private CourseWeekService: CourseWeekService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
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
          var editArr = [res.courseDurationId, res.courseNameId, res.baseSchoolNameId];
          this.getselectedbnasubjectname(editArr)  
          //this.getselectedcoursedurationbyschoolname(res.baseSchoolNameId);      
        }
      );
    } else {
      this.pageTitle = 'Create Course Week';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    //this.getselectedcourseduration();
    this.getselectedbaseschools();
    this.getselectedcoursename();
    //this.getselectedcoursedurationbyschoolname();
    //this.multipleAddForm()
    
  }
  intitializeForm() {
    this.CourseWeekForm = this.fb.group({
      courseWeekId: [0],
      courseDurationId:[''],
      courseName:[''],
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

  // getselectedcourseduration(){
  //   this.CourseWeekService.getselectedcourseduration().subscribe(res=>{
  //     this.selectedcourseduration=res
  //   });
  // } 

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
    // this.ClassRoutineService.getselectedSubjectNamesBySchoolAndCourse(baseSchoolNameId,courseNameId).subscribe(res=>{
    //   this.selectedsubjectname=res;
    //   console.log(this.selectedsubjectname)
    // });
    // if(baseSchoolNameId != null && courseNameId != null){
      
    //   this.ClassRoutineService.getClassRoutineByCourseNameBaseSchoolNameSpRequest(baseSchoolNameId,courseNameId).subscribe(res=>{
    //     this.selectedRoutineByParametersAndDate=res;
    //     console.log("Routine by Sp request")
    //     for(let i=0;i<=this.selectedRoutineByParametersAndDate.length;i++){

    //      console.log("Date"+this.selectedRoutineByParametersAndDate[i]);
    //     }
    //     console.log(this.selectedRoutineByParametersAndDate);

    //     this.displayedColumns =[...Object.keys(this.selectedRoutineByParametersAndDate[0])];
    //     console.log([...Object.keys(this.selectedRoutineByParametersAndDate[0])]);
        

    //     console.log(this.selectedRoutineByParametersAndDate);

    //     console.log(baseSchoolNameId+"-"+courseNameId)
    //     this.ClassRoutineService.getCourseInstructorByBaseSchoolNameAndCourseName(baseSchoolNameId,courseNameId).subscribe(res=>{
    //       this.traineeListByBaseSchoolAndCourse=res;
    //       console.log(res);
    //     })
    //   });

    //   this.ClassRoutineService.getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId).subscribe(res=>{
    //     this.selectedCourseModuleByBaseSchoolAndCourseNameId=res;     
    //     //console.log("after getting condition"+ this.selectedCourseModuleByBaseSchoolAndCourseNameId); 
    //   });
    //   this.ClassRoutineService.getselectedClassPeriodbyschoolandcourse(baseSchoolNameId,courseNameId).subscribe(res=>{
    //     this.selectedclassperiod=res;
    //   });
    //   this.ClassRoutineService.getSubjectlistBySchoolAndCourse(baseSchoolNameId,courseNameId).subscribe(res=>{
    //     this.subjectlistBySchoolAndCourse=res;
    //     console.log(res)
    //   });
    //   this.isShown=true;
    //} 
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
          this.loading=true;
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
      this.loading=true;
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
