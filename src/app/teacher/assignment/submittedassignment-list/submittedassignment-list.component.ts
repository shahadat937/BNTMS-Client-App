import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { InstructorDashboardService } from '../../services/InstructorDashboard.service';
import { environment } from 'src/environments/environment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-submittedassignment-list',
  templateUrl: './submittedassignment-list.component.html',
  styleUrls: ['./submittedassignment-list.component.sass']
})
export class SubmittedAssignmentComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  submittedStudents:any;
  getTraineeAssignmentSubmit:any;
  traineeId:any;
  instructorAssignmentId:any;
  baseSchoolNameId:any;
  courseNameId:any;
  courseDurationId:any;
  bnaSubjectNameId:any;
  fileUrl:any = environment.fileUrl;
  AssignmentListForm: FormGroup;
  assignmentMarkForm: FormGroup;
  validationErrors: string[] = [];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedSubmittedStudentsColumns: string[] = ['ser', 'trainee', 'status', 'file', 'remarks', 'marks'];

  constructor(private datepipe: DatePipe,private fb: FormBuilder,private instructorDashboardService: InstructorDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() { 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.instructorAssignmentId = this.route.snapshot.paramMap.get('instructorAssignmentId'); 
    this.baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.bnaSubjectNameId = this.route.snapshot.paramMap.get('bnaSubjectNameId');
    this.intitializeForm(); 
    this.intitializeMarkForm(); 
    console.log(this.traineeId,this.instructorAssignmentId,this.baseSchoolNameId,this.courseNameId,this.courseDurationId,this.bnaSubjectNameId)    
    this.getStudentSubmittedAssignmentLists();
  }
  getStudentSubmittedAssignmentLists(){
    this.instructorDashboardService.getStudentSubmittedAssignmentLists(this.instructorAssignmentId,this.baseSchoolNameId,this.courseNameId,this.courseDurationId,this.bnaSubjectNameId).subscribe(response => {         
      this.submittedStudents=response;
      this.clearList();
      this.getTraineeListonClick(); 
      console.log(response)
    })
  }


  intitializeForm() {
    this.AssignmentListForm = this.fb.group({
      
      SubmittedAssignmentListForm: this.fb.array([
        this.TraineeData()
      ]),  
      
    })
  }
  intitializeMarkForm() {
    this.assignmentMarkForm = this.fb.group({
      assignmentMarkEntryId:[0],
      traineeAssignmentSubmitId:[],
      instructorAssignmentId:[],
      courseInstructorId:[],
      courseDurationId:[],
      courseNameId:[],
      baseSchoolNameId:[],
      bnaSubjectNameId:[],
      traineeId:[],
      assignmentMark:[],
      menuPosition:[0],
      isActive:[true],              
    })
  }

  private TraineeData() {
 
    return this.fb.group({
      traineeAssignmentSubmitId:[],
      pno:[],
      traineeId: [],
      name:[],
      position:[],
      submittedTrainee: [],
      assignmentMark:[],
      imageUpload:[],
      remarks:[],
      assignmentMarkEntryId:[]
    });
  }
  submit(index: number){
    var formValues = (this.AssignmentListForm.get('SubmittedAssignmentListForm') as FormArray).at(index).value;
    console.log(formValues);
    const assignmentMarkEntryId = formValues.assignmentMarkEntryId;
    if(assignmentMarkEntryId){
      console.log("edited mood");
    }else{
      
      this.instructorDashboardService.find(formValues.traineeAssignmentSubmitId).subscribe(response => {         
        this.getTraineeAssignmentSubmit=response;
        this.assignmentMarkForm.get('traineeAssignmentSubmitId').setValue(this.getTraineeAssignmentSubmit.traineeAssignmentSubmitId);
        this.assignmentMarkForm.get('instructorAssignmentId').setValue(this.getTraineeAssignmentSubmit.instructorAssignmentId);
        this.assignmentMarkForm.get('courseInstructorId').setValue(this.getTraineeAssignmentSubmit.courseInstructorId);
        this.assignmentMarkForm.get('courseDurationId').setValue(this.getTraineeAssignmentSubmit.courseDurationId);
        this.assignmentMarkForm.get('courseNameId').setValue(this.getTraineeAssignmentSubmit.courseNameId);
        this.assignmentMarkForm.get('baseSchoolNameId').setValue(this.getTraineeAssignmentSubmit.baseSchoolNameId);
        this.assignmentMarkForm.get('bnaSubjectNameId').setValue(this.getTraineeAssignmentSubmit.bnaSubjectNameId);
        this.assignmentMarkForm.get('traineeId').setValue(this.getTraineeAssignmentSubmit.traineeId);
        console.log(this.getTraineeAssignmentSubmit)
      })
      
      this.assignmentMarkForm.get('assignmentMark').setValue(formValues.assignmentMark);
    }
    
    if(assignmentMarkEntryId){
      console.log("edited mood");
    }else{

      this.confirmService.confirm('Confirm Insertion message', 'Are You Sure Insertion This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          console.log(this.assignmentMarkForm.value);
          this.instructorDashboardService.submit(this.assignmentMarkForm.value).subscribe(response => {
            //this.router.navigateByUrl('/teachers-evaluation/tdecactionstatus-list');
            this.getStudentSubmittedAssignmentLists();
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
  getTraineeListonClick(){ 
    const control = <FormArray>this.AssignmentListForm.controls["SubmittedAssignmentListForm"];
    console.log(this.submittedStudents)   
    for (let i = 0; i < this.submittedStudents.length; i++) {
      control.push(this.TraineeData()); 
      console.log(this.submittedStudents[i])
    }
    this.AssignmentListForm.patchValue({ SubmittedAssignmentListForm: this.submittedStudents });
  }

  clearList() {
    const control = <FormArray>this.AssignmentListForm.controls["SubmittedAssignmentListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }

  getControlLabel(index: number,type: string){
    return  (this.AssignmentListForm.get('SubmittedAssignmentListForm') as FormArray).at(index).get(type).value;
  }
  
}
