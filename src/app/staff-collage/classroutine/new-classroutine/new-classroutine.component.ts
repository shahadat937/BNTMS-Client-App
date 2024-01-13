import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ClassRoutineService} from '../../../routine-management/service/classroutine.service'
import { SelectedModel } from '../../../core/models/selectedModel';
import {CodeValueService} from '../../../basic-setup/service/codevalue.service';
import {MasterData} from '../../../../../src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import{ConfirmService} from '../../../../../src/app/core/service/confirm.service';
import { ClassRoutine } from '../../../routine-management/models/classroutine';
import {ClassPeriodService} from '../../../routine-management/service/classperiod.service'
import {BNAExamMarkService} from '../../../central-exam/service/bnaexammark.service'
import {BNASubjectNameService} from '../../../central-exam/service/BNASubjectName.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  selectedSubjectNameByCourseNameId:SelectedModel[];
  selectedCourseModuleByBaseSchoolAndCourseNameId:SelectedModel[];
  routineCount:number;
  courseName:any;
  weekName:any;
  courseDurationId:any;
  selectedCourseDurationByCourseTypeAndCourseName:SelectedModel[];
  isLoading = false;
  
    
  displayedColumnsList: string[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  searchText="";

  displayedColumns: string[] = ['ser','bnaSubjectName','date','timeDuration', 'actions'];
  dataSource: MatTableDataSource<ClassRoutine> = new MatTableDataSource();
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

  constructor(private snackBar: MatSnackBar,private subjectNameService: BNASubjectNameService, private BNAExamMarkService: BNAExamMarkService, private ClassPeriodService: ClassPeriodService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private ClassRoutineService: ClassRoutineService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('classRoutineId'); 
    if (id) {
      this.pageTitle = 'Edit Class Routine'; 
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
            timeDuration:res.timeDuration,
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
        }
      );
    } else {
      this.pageTitle = 'Create Class Routine';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedclasstype();
    this.getselectedcoursename();


    this.getSelectedCourseDurationByCourseTypeIdAndCourseNameId();
  }
  intitializeForm() {
    this.ClassRoutineForm = this.fb.group({
      classRoutineId: [0],
      courseModuleId:[],
      courseName:[''],
      courseNameId:[this.masterData.courseName.StaffCollage],
      classPeriodId:[''],
      baseSchoolNameId:[''],
      courseDurationId:[],
      subjectName:[''],
      timeDuration:[''],
      bnaSubjectNameId:[],
      courseWeekId:[],
      examMarkComplete:[0],
      classTypeId:[this.masterData.classType.Exam],
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

  onCourseNameSelectionChangeGetSubjectList(dropdown){
    if (dropdown.isUserInput) {
      var courseNameArr = dropdown.source.value.split('_');
      this.courseDurationId = courseNameArr[0];
      var courseNameId = courseNameArr[1];

      this.ClassRoutineForm.get('courseNameId').setValue(courseNameId);
      this.ClassRoutineForm.get('courseDurationId').setValue(this.courseDurationId);

      this.subjectNameService.getSelectedSubjectNameByCourseNameId(courseNameId).subscribe(res => {
        this.selectedSubjectNameByCourseNameId = res;
       
      });
      this.getClassRoutineList();
    }
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
  } 

 onSubjectNameSelectionChangeGet(dropdown){
    var bnaSubjectNameId = dropdown.source.value.value;
    this.ClassRoutineForm.get('subjectName').setValue(bnaSubjectNameId);
    this.ClassRoutineForm.get('bnaSubjectNameId').setValue(bnaSubjectNameId);
}

getSelectedCourseDurationByCourseTypeIdAndCourseNameId(){
  this.BNAExamMarkService.getSelectedCourseDurationByCourseTypeIdAndCourseNameId(MasterData.coursetype.CentralExam,MasterData.courseName.StaffCollage).subscribe(res => {
    this.selectedCourseDurationByCourseTypeAndCourseName = res;
  });
}


getClassRoutineList(){
  this.isLoading = true;
  this.ClassRoutineService.getClassRoutinesByCourseDurationId(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.courseDurationId).subscribe(response => {             
    this.dataSource.data = response.items; 
    this.paging.length = response.totalItemsCount    
    this.isLoading = false;
    console.log("Subject name");
    console.log(this.dataSource.data);
  })
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
          this.getClassRoutineList();
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
