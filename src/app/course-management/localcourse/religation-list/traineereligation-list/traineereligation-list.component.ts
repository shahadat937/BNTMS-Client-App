import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedModel } from '../../../../core/models/selectedModel';
import {MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ConfirmService} from '../../../../core/service/confirm.service';
import {TraineeNominationService} from '../../../../course-management/service/traineenomination.service';
import {CheckboxSelectedModel} from '../../../../core/models/checkboxSelectedModel';
import { TraineeList } from '../../../../attendance-management/models/traineeList';
import { MatTableDataSource } from '@angular/material/table';
import { ClassRoutine } from '../../../../routine-management/models/classroutine';
import { TraineeListForExamMark } from 'src/app/exam-management/models/traineeListforexammark';
import { CourseDurationService } from 'src/app/course-management/service/courseduration.service';

@Component({
  selector: 'app-traineereligation-list',
  templateUrl: './traineereligation-list.component.html',
  styleUrls: ['./traineereligation-list.component.sass']
}) 
export class TraineeReligationListComponent implements OnInit {
  masterData = MasterData;
  loading = false;
  myModel = true;
  buttonText:string;
  pageTitle: string;
  destination:string;
  AttendanceForm: FormGroup;
  validationErrors: string[] = [];
  selectedclassroutine:SelectedModel[];
  selectedbaseschools:SelectedModel[];
  selectedcoursename:SelectedModel[];
  selectedbnasubjectname:SelectedModel[];
  selectedclassperiod:SelectedModel[];
  selectedbnaattendanceremark:SelectedModel[];
  selectedCourse:SelectedModel[];
  selectedClassPeriodByBaseSchoolNameIdAndCourseNameId:SelectedModel[];
  selectedCourseDurationByParameterRequest:number;
  traineeNominationListForAttendance: TraineeList[];
  selectedvalues:CheckboxSelectedModel[];
  traineeForm: FormGroup;
  courseSectionList:SelectedModel[];
  selectedCourseDurationByCourseTypeAndCourseName:SelectedModel[];
  subjectName:string;
  bnaSubjectNameId:number;
  classRoutineId:number;
  courseDurationId:any;
  courseNameId:any;
  isLoading = false;
  displayedColumnsList: string[];
  traineeList:TraineeListForExamMark[];
  selectedWithdrawnType:SelectedModel[];
  showHideDiv = false;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  searchText="";

  displayedColumnsRoutine: string[] = ['ser','bnaSubjectName','date','timeDuration', 'actions'];
   dataSource: MatTableDataSource<ClassRoutine> = new MatTableDataSource();

  checked = false;
  isShown: boolean = false ;
  isShownForTraineeList:boolean=false;
  // displayedColumns: string[] = ['ser','traineePNo','attendanceStatus','bnaAttendanceRemarksId'];
  // dataSource ;
  constructor(private snackBar: MatSnackBar,private courseDutartionService: CourseDurationService, private confirmService: ConfirmService,private traineeNominationService:TraineeNominationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    // 3136
    const id = this.route.snapshot.paramMap.get('attendanceId'); 
    console.log(id);
    this.courseDurationId=this.route.snapshot.paramMap.get('courseDurationId'); 
    
    this.pageTitle = 'Trainee Religation';
    this.destination = "Assign"; 
    this.buttonText= "Update";

    this.intitializeForm();
    this.onCourseSectionForTraineeList(this.courseDurationId);
    this.getCourseSectionByDurationId(this.courseDurationId);
    this.getSelectedWithdrawnType();
  }
  intitializeForm() {
    this.AttendanceForm = this.fb.group({
      attendanceId: [0],
      baseSchoolNameId:[''],
      courseNameId:[''],
      courseNameIds:[''],
      courseDurationId:[''],
      classPeriodId:[''], 
      attendanceDate:[], 
      classLeaderName:[''],
      indexNo:[''],
      attendanceStatus:[true],
      traineeListForms: this.fb.array([this.createTraineeData()]),
    })
  }

  getCourseSectionByDurationId(courseDurationId){
    this.courseDutartionService.find(courseDurationId).subscribe(res=>{
      console.log(res);
      this.courseDutartionService.getSelectedCourseSectionsBySchoolIdAndCourseId(res.baseSchoolNameId,res.courseNameId).subscribe(res=>{
        this.courseSectionList=res;
        console.log(this.courseSectionList);
      });
    });
  }

  
  private createTraineeData() {

    return this.fb.group({

      courseNameId: [],
      status: [],
      traineePNo: [],
      courseDurationId:[],
      presentBillet:[],
      examCenterId:[],
      dateCreated:[],
      createdBy:[],
      traineeId: [],
      traineeName: [],
      rankPosition: [],
      saylorRank: [],
      indexNo: [],
      traineeNominationId:[],
      courseSectionId:[],
      examAttemptTypeId:[],
      examTypeId:[],
      familyAllowId:[],
      traineeCourseStatusId:[],
      withdrawnDocId:[],
      withdrawnRemarks:[],
      withdrawnDate:[],
      newAtemptId:[],
      menuPosition:[],
      withdrawnType:[],
      withdrawnTypeId:[]
     // withdrawnDate:[]
    });
  }

  getControlLabel(index: number, type: string) {
    return (this.AttendanceForm.get('traineeListForms') as FormArray).at(index).get(type).value;
  }

  getSelectedWithdrawnType(){
    this.traineeNominationService.getSelectedWithdrawnType().subscribe(res=>{
      this.selectedWithdrawnType=res;
      console.log(this.courseSectionList);
    });
  }
  getTraineeListonClick() {
    const control = <FormArray>this.AttendanceForm.controls["traineeListForms"];
    console.log(this.traineeList)
    for (let i = 0; i < this.traineeList.length; i++) {
      control.push(this.createTraineeData());
    }
    this.AttendanceForm.patchValue({ traineeListForms: this.traineeList });
    console.log("value...");
    console.log(this.traineeList)
  }

  clearList() {
    const control = <FormArray>this.AttendanceForm.controls["traineeListForms"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }

  toggle(){
    this.showHideDiv = !this.showHideDiv;
  }
  printSingle(){
    this.showHideDiv= false;
    this.print();
  }
  print(){ 
     
    let printContents, popupWin;
    printContents = document.getElementById('print-routine').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
          body{  width: 99%;}
            label { 
              font-weight: 400;
              font-size: 13px;
              padding: 2px;
              margin-bottom: 5px;
            }
            table, td, th {
              border: 1px solid silver;
            }
            table td {
              font-size: 13px;
              text-align:center;
            }
            .nomination-custom-design.staff-collage tr td.cl-name {
              text-align: left;
            }
            .nomination-custom-design.staff-collage tr .cl-action {
              display:none;
            }
           td.cl-nm-rnk-btn {
              display:none;
            } 
            th.cl-nm-rnk-btn {
              display:none;
            } 
            
            table th {
              font-size: 13px;
              text-align:center;
            }
            table {
              border-collapse: collapse;
              width: 98%;
            }
            th {
              height: 26px;
            }
            .header-text{
              text-align:center;
            }
            .header-text h3{
              margin:0;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          </div>
          <br>
          ${printContents}
          
        </body>
      </html>`
    );
    popupWin.document.close();

  }

  onCourseSectionForTraineeList(courseDurationId){
    console.log(courseDurationId);
    this.traineeNominationService.getTestTraineeNominationByCourseDurationId(courseDurationId,0).subscribe(res => {
      this.traineeList = res;
      console.log("trainee List");
      console.log(this.traineeList);
      this.clearList();
      this.getTraineeListonClick();
    });
  }


  onSubmit() {

    //  const id = this.AttendanceForm.get('traineeNominationId').value;

    console.log(this.AttendanceForm.value);
    
    this.confirmService.confirm('Confirm Save message', 'Are You Sure Update This Records?').subscribe(result => {
      console.log(result);
      if (result) {
        this.loading = true;
        this.traineeNominationService.updateTraineeNominationListForReligation(this.AttendanceForm.value).subscribe(response => {
          this.router.navigateByUrl('/course-management/schoolcourse-list');
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

