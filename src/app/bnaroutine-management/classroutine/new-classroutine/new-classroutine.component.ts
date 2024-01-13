import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoutineService } from '../../service/classroutine.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ClassRoutine } from '../../models/classroutine';
import { ClassPeriodService } from '../../service/classperiod.service'
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-new-classroutine',
  templateUrl: './new-classroutine.component.html',
  styleUrls: ['./new-classroutine.component.sass']
}) 
export class NewClassRoutineComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  ClassRoutineForm: FormGroup;
  validationErrors: string[] = [];
  selectedbaseschool:SelectedModel[];
  selectedclasstype:SelectedModel[];
  selectedLocationType:SelectedModel[];
  selectedclassperiod:SelectedModel[];
  selectedcoursedurationbyschoolname:SelectedModel[];
  selectedsubjectname:SelectedModel[];
  selectedWeek:SelectedModel[];
  selectedSchool:SelectedModel[];
  selectedCourseModule:SelectedModel[];
  selectedModule:SelectedModel[];
  selectedcoursename:SelectedModel[];
  selectedCourseModuleByBaseSchoolAndCourseNameId:SelectedModel[];
  routineCount:number;
  courseName:any;
  weekName:any;
  courseDurationId:any;
  
  role:any;
  traineeId:any;
  branchId:any;
  baseSchoolId:any;

  schoolId:any;
  durationId:any;
  courseId:any;
  weekId:any;

  totalPeriod:string;
  selectedRoutineByParameters:ClassRoutine[];
  selectedRoutineByParametersAndDate:ClassRoutine[];
  traineeListByBaseSchoolAndCourse:any[];
  periodListByBaseSchoolAndCourse:any[];
  selectedRoutineByParameter:any;
  subjectlistBySchoolAndCourse:any;
  isShown: boolean = false ;
  groupArrays:{ date: string; games: any; }[];
  displayedRoutineCountColumns: string[] = ['ser','name','shortCode'];
  displayedSubjectListColumns: string[] = ['ser','subjectName','subjectShortName'];
  displayedPeriodListColumns: string[] = ['ser','periodName','duration'];
  displayedColumns: string[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  constructor(private snackBar: MatSnackBar,private authService: AuthService, private ClassPeriodService: ClassPeriodService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private ClassRoutineService: ClassRoutineService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('classRoutineId'); 

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)


    if (id) {
      this.pageTitle = 'Edit Weekly Program'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.ClassRoutineService.find(+id).subscribe(
        res => {
          this.ClassRoutineForm.patchValue({          
            classRoutineId:res.classRoutineId, 
            courseModuleId:res.courseModuleId,
            courseNameId:res.courseNameId,
            classPeriodId: res.classPeriodId, 
            baseSchoolNameId:res.baseSchoolNameId, 
            courseDurationId:res.courseDurationId, 
            bnaSubjectNameId:res.bnaSubjectNameId,
            courseWeekId:res.courseWeekId,
            classTypeId:res.classTypeId,
            date:res.date,
            classLocation:res.classLocation,
            isApproved:res.isApproved,
            approvedDate:res.approvedDate,
            approvedBy:res.approvedBy,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
            
          });  
          
          var editArr = [res.courseDurationId, res.courseNameId, res.baseSchoolNameId];
          this.getselectedcoursedurationbyschoolname()
          this.getselectedbnasubjectname(editArr)
        }
      );
    } else {
      this.pageTitle = 'Create Weekly Program';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    if(this.role === 'Super Admin'){
      this.ClassRoutineForm.get('baseSchoolNameId').setValue(this.branchId);
      this.getselectedcoursedurationbyschoolname();
     }
    this.getselectedbaseschools();
    this.getselectedclasstype();
    this.getselectedCourseModules();
    this.getselectedcoursename();
    
  }
  intitializeForm() {
    this.ClassRoutineForm = this.fb.group({
      classRoutineId: [0],
      courseModuleId:[],
      courseName:[''],
      courseNameId:[],
      classPeriodId:['',Validators.required],
      baseSchoolNameId:['',Validators.required],
      courseDurationId:[],
      subjectName:[''],
      bnaSubjectNameId:[],
      courseWeekId:[],
      examMarkComplete:[0],
      classTypeId:[],
      classCountPeriod:[],
      subjectCountPeriod:[],
      date:[], 
      classLocation:[''],
      isApproved:[true],
      approvedDate:[],
      approvedBy:[],
      status:[1],
      isActive: [true],    
    })
  }
  onWeekSelectionChangeGet(dropdown){
    this.schoolId=this.ClassRoutineForm.value['baseSchoolNameId'];
    this.durationId=this.ClassRoutineForm.value['courseDurationId'];
    this.courseId=this.ClassRoutineForm.value['courseNameId'];
    this.weekName=dropdown.text;
    this.weekId=dropdown.value;
    console.log("hwllo week");
    console.log(this.schoolId,this.durationId,this.courseId,this.weekId);
    this.ClassRoutineService.getselectedSubjectNamesBySchoolAndCourse(this.schoolId,this.courseId).subscribe(res=>{
      this.selectedsubjectname=res;
      console.log(this.selectedsubjectname)
    });
    if(this.schoolId != null && this.courseId != null){
      
      this.ClassRoutineService.getClassRoutineByCourseNameBaseSchoolNameSpRequest(this.schoolId,this.courseId,this.weekId).subscribe(res=>{
        this.selectedRoutineByParametersAndDate=res;
        console.log("Routine by Sp request")
        for(let i=0;i<=this.selectedRoutineByParametersAndDate.length;i++){

         console.log("Date"+this.selectedRoutineByParametersAndDate[i]);
        }
        console.log(this.selectedRoutineByParametersAndDate);

        this.displayedColumns =[...Object.keys(this.selectedRoutineByParametersAndDate[0])];
        console.log([...Object.keys(this.selectedRoutineByParametersAndDate[0])]);
        

        console.log(this.selectedRoutineByParametersAndDate);

        console.log(this.schoolId+"-"+this.courseId)
        this.ClassRoutineService.getCourseInstructorByBaseSchoolNameAndCourseName(this.schoolId,this.courseId,this.durationId).subscribe(res=>{
          this.traineeListByBaseSchoolAndCourse=res;
          console.log(res);
        })

        this.ClassPeriodService.getSelectedPeriodBySchoolAndCourse(this.schoolId,this.courseId).subscribe(res=>{
          this.periodListByBaseSchoolAndCourse=res;
          console.log(res);
        })
      });

      this.ClassRoutineService.getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(this.schoolId,this.courseId).subscribe(res=>{
        this.selectedCourseModuleByBaseSchoolAndCourseNameId=res;     
      });
      this.ClassRoutineService.getselectedClassPeriodbyschoolandcourse(this.schoolId,this.courseId).subscribe(res=>{
        this.selectedclassperiod=res;
      });
      this.ClassRoutineService.getSubjectlistBySchoolAndCourse(this.schoolId,this.courseId).subscribe(res=>{
        this.subjectlistBySchoolAndCourse=res;
        console.log(res)
      });
      this.isShown=true;
    } 
  }
  onSubjectNameSelectionChangeGet(dropdown){
    console.log("after subject select")
    var baseSchoolNameId=this.ClassRoutineForm.value['baseSchoolNameId'];
    var courseName=this.ClassRoutineForm.value['courseName'];

         var courseNameArr = courseName.split('_');
         this.courseDurationId = courseNameArr[0];
         var courseNameId =courseNameArr[1];

         console.log("Course Duration Id");
         console.log(this.courseDurationId);
    var bnaSubjectNameId = dropdown.value;
    console.log(bnaSubjectNameId)
    this.ClassRoutineForm.get('subjectName').setValue(dropdown.text);
    this.ClassRoutineForm.get('bnaSubjectNameId').setValue(bnaSubjectNameId);
    this.onSubjectNameSelectionChange(baseSchoolNameId,courseNameId,bnaSubjectNameId,this.courseDurationId);  
}


onSubjectNameSelectionChange(baseSchoolNameId,courseNameId,bnaSubjectNameId,courseDurationId){
  var baseSchoolNameId=this.ClassRoutineForm.value['baseSchoolNameId'];
  var courseNameId=this.ClassRoutineForm.value['courseNameId'];
  var bnaSubjectNameId=this.ClassRoutineForm.value['bnaSubjectNameId'];

  var courseDurationId=this.ClassRoutineForm.value['courseDurationId'];
  console.log(baseSchoolNameId,courseNameId,bnaSubjectNameId, courseDurationId)

  if(baseSchoolNameId !=null && courseNameId !=null  && bnaSubjectNameId !=null){

    this.ClassRoutineService.getCourseModuleIdForRoutine(baseSchoolNameId,courseNameId,bnaSubjectNameId).subscribe(res=>{
      var courseModuleId=res;
      console.log("courseModuleId"+courseModuleId);
      this.ClassRoutineForm.get('courseModuleId').setValue(courseModuleId);
    });

    this.ClassRoutineService.getselectedClassPeriodbyschoolandcourse(baseSchoolNameId,courseNameId).subscribe(res=>{
      this.selectedclassperiod=res;
      console.log("selected class period");
      console.log(this.selectedclassperiod);
    });
  
    this.ClassRoutineService.getTotalPeriodByParameterRequest(baseSchoolNameId,courseNameId,bnaSubjectNameId).subscribe(res=>{
      this.totalPeriod=res;
      console.log("total period");
      console.log(this.totalPeriod);
    });
  }

  this.ClassRoutineService.getClassRoutineCountByParameterRequest(baseSchoolNameId,courseNameId,bnaSubjectNameId,courseDurationId).subscribe(res=>{
    this.routineCount=res;
    this.ClassRoutineForm.get('classCountPeriod').setValue(this.routineCount);
    console.log("routine count");
    console.log(this.routineCount);
  });

  this.ClassRoutineService.getTotalPeriodByParameterRequest(baseSchoolNameId,courseNameId,bnaSubjectNameId).subscribe(res=>{
    this.totalPeriod=res;
    this.ClassRoutineForm.get('subjectCountPeriod').setValue(this.totalPeriod);

    console.log("subjectcount");
    console.log(this.totalPeriod);
  });

  
  this.ClassRoutineService.getSelectedRoutineByParameters(baseSchoolNameId,courseNameId,bnaSubjectNameId).subscribe(res=>{
    this.selectedRoutineByParameter=res;  

            // this gives an object with dates as keys
            const groups = this.selectedRoutineByParameter.reduce((groups, game) => {
              const date = game.date.split('T')[0];
              if (!groups[date]) {
                groups[date] = [];
              }
              groups[date].push(game);
              return groups;
            }, {});

          // Edit: to add it in the array format instead
            this.groupArrays = Object.keys(groups).map((date) => {
            return {
              date,
              games: groups[date]
            };
          });
  });

  
}

  getselectedbaseschools(){
    this.ClassRoutineService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschool=res;
    });
  }  

  getselectedcoursedurationbyschoolname(){
      var baseSchoolNameId=this.ClassRoutineForm.value['baseSchoolNameId'];
      this.ClassRoutineService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res=>{
        console.log(res);
        this.selectedcoursedurationbyschoolname=res;
      });
  } 

  getselectedbnasubjectname(dropdown){
    const id = this.route.snapshot.paramMap.get('classRoutineId'); 
    if(id){
      var courseDurationId = dropdown[0];
      var courseNameId=dropdown[1];
      var baseSchoolNameId=dropdown[2];
    }else{
      var baseSchoolNameId=this.ClassRoutineForm.value['baseSchoolNameId'];
      var courseNameArr = dropdown.value.split('_');
      var courseDurationId = courseNameArr[0];
      var courseNameId=courseNameArr[1];
      this.courseName=dropdown.text;
      this.ClassRoutineForm.get('courseName').setValue(dropdown.text);
      this.ClassRoutineForm.get('courseNameId').setValue(courseNameId);
      this.ClassRoutineForm.get('courseDurationId').setValue(courseDurationId);
    } 
    
    this.ClassRoutineService.getSelectedCourseWeeks(baseSchoolNameId,courseDurationId,courseNameId).subscribe(res=>{
      this.selectedWeek=res;
      console.log(this.selectedWeek)
    });    
  } 

  getselectedCourseModules(){
    this.ClassRoutineService.getselectedCourseModules().subscribe(res=>{
      this.selectedCourseModule=res;
    });
  } 

  

  getselectedcoursename(){
    this.ClassRoutineService.getselectedcoursename().subscribe(res=>{
      this.selectedcoursename=res;
    });
  } 

  getselectedclasstype(){
    this.ClassRoutineService.getselectedclasstype().subscribe(res=>{
      this.selectedclasstype=res;
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  

  onSubmit() {
    const id = this.ClassRoutineForm.get('classRoutineId').value;   
    console.log(this.ClassRoutineForm.value);
    if (id) {

      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.ClassRoutineService.update(+id,this.ClassRoutineForm.value).subscribe(response => {
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
      this.ClassRoutineService.submit(this.ClassRoutineForm.value).subscribe(response => {
        
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
 console.log("after save");
 console.log(this.ClassRoutineForm.value);
  }

  deleteItem(row) {
    const id = row.classRoutineId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.ClassRoutineService.delete(id).subscribe(() => {
          this.reloadCurrentRoute();
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
}
