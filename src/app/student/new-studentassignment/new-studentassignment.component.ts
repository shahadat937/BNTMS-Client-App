import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorAssignmentService } from 'src/app/teacher/services/InstructorAssignment.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MasterData } from 'src/assets/data/master-data';
import {TraineeAssignmentSubmitService} from '../services/TraineeAssignmentSubmit.service';

@Component({
  selector: 'app-new-studentassignment',
  templateUrl: './new-studentassignment.component.html',
  styleUrls: ['./new-studentassignment.component.sass']
})
export class NewStudentAssignmentComponent implements OnInit {
  pageTitle: string;
  destination:string;
  btnText:string;
  instructorId:any;
  traineeId:any;
  baseSchoolNameId:any;
  courseNameId:any;
  courseDurationId:any;
  bnaSubjectNameId:any;
  cousreInstructorId:any;
  instructorAssignmentsList:any[];
   masterData = MasterData;
  loading = false;
  instructorAssignmentId:any;
  courseInstructorId:any;
  traineeAssignmentList:any[];
  // isShown: boolean = false ;

  InstructorAssignmentForm: FormGroup;
  validationErrors: string[] = [];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['ser', 'assignmentTopic','remarks','imageUpload','actions'];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private fb: FormBuilder,private AssignmentService:TraineeAssignmentSubmitService, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('instructorAssignmentId'); 
    this.instructorAssignmentId = this.route.snapshot.paramMap.get('instructorAssignmentId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    this.baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.courseInstructorId = this.route.snapshot.paramMap.get('courseInstructorId'); 
    this.instructorId = this.route.snapshot.paramMap.get('instructorId');
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.bnaSubjectNameId = this.route.snapshot.paramMap.get('bnaSubjectNameId'); 
    this.getTraineeAssignmentSubmitListByParameter();
    // this.getInstructorAssignmentListByInstructorId();
    // this.getCourseInstructorIdForInstructorAssignmentSave();courseInstructorId instructorId
console.log("traineeId");
console.log(this.traineeId);
    if (id) {
      this.pageTitle = 'Add Assignment';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.AssignmentService.find(+id).subscribe(
        res => {
          this.InstructorAssignmentForm.patchValue({          

            // boardId: res.boardId,
            // boardName: res.boardName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Submit Assignment';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.InstructorAssignmentForm = this.fb.group({
      traineeAssignmentSubmitId:[0],
      assignmentTopic: [''],
      remarks: [''],
      instructorId:[''],
      instructorAssignmentId:[''],
      traineeId:[''],
      ImageUpload: [''],
      doc: [''],
      courseInstructorId:[''],
      baseSchoolNameId:[''],
      courseNameId:[''],
      courseDurationId:[''],
      status:[0],
      bnaSubjectNameId:[''],
      isActive: [true],    
      // startDate: [],
      // endDate: [],
    })
  }

  deleteItem(row) {
    const id = row.traineeAssignmentSubmitId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.AssignmentService.delete(id).subscribe(() => {
          this.getTraineeAssignmentSubmitListByParameter();
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
 
  getTraineeAssignmentSubmitListByParameter(){
    this.AssignmentService.getTraineeAssignmentSubmitListByParameter(this.traineeId,this.instructorId,this.bnaSubjectNameId,this.baseSchoolNameId,this.courseNameId,this.courseDurationId,this.courseInstructorId,this.instructorAssignmentId).subscribe(res=>{
      this.traineeAssignmentList=res;
      console.log("Instructor Id");
      console.log(this.traineeAssignmentList);
    });
  }
  // getInstructorAssignmentListByInstructorId(){
  //   this.AssignmentService.getInstructorAssignmentListByInstructorId(this.baseSchoolNameId,this.courseDurationId,this.bnaSubjectNameId,this.instructorId).subscribe(res=>{
  //     this.instructorAssignmentsList=res;
  //     console.log("Course Instructor Id");
  //     console.log(this.instructorAssignmentsList);
  //   });
  // }

  // stopInstructorAssignments(instructorAssignmentId){
  //   this.confirmService.confirm('Confirm Stop message', 'Are You Sure Stop This Item').subscribe(result => {
  //     if (result) {
  //       this.AssignmentService.stopInstructorAssignments(instructorAssignmentId).subscribe(res => {
  //         this.getInstructorAssignmentListByInstructorId();
  //         console.log("Dropdown value");

  //         this.snackBar.open('Information Stop Successfully ', '', {
  //           duration: 3000,
  //           verticalPosition: 'bottom',
  //           horizontalPosition: 'right',
  //           panelClass: 'snackbar-warning'
  //         });
  //       })
  //     }
  //   })
  // }
  // getCourseInstructorIdForInstructorAssignmentSave(){
  //   this.AssignmentService.getCourseInstructorIdForInstructorAssignmentSave(this.instructorId,this.bnaSubjectNameId,this.baseSchoolNameId,this.courseDurationId).subscribe(res=>{
  //     this.cousreInstructorId=res;
  //   });
  // }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.labelImport.nativeElement.value = file.name;
      console.log(file);
      // this.BIODataGeneralInfoForm.controls["picture"].setValue(event.target.files[0]);
      this.InstructorAssignmentForm.patchValue({
        doc: file,
      });
    }
  }

  onSubmit() {

    const id = this.InstructorAssignmentForm.get('traineeAssignmentSubmitId').value;  
    this.InstructorAssignmentForm.get('traineeId').setValue(this.traineeId);
    this.InstructorAssignmentForm.get('instructorId').setValue(this.instructorId);
    this.InstructorAssignmentForm.get('instructorAssignmentId').setValue(this.instructorAssignmentId);
    this.InstructorAssignmentForm.get('courseInstructorId').setValue(this.courseInstructorId);
    this.InstructorAssignmentForm.get('baseSchoolNameId').setValue(this.baseSchoolNameId);
    this.InstructorAssignmentForm.get('courseNameId').setValue(this.courseNameId);
    this.InstructorAssignmentForm.get('courseDurationId').setValue(this.courseDurationId);
    this.InstructorAssignmentForm.get('bnaSubjectNameId').setValue(this.bnaSubjectNameId); 


    const formData = new FormData();
    for (const key of Object.keys(this.InstructorAssignmentForm.value)) {
      const value = this.InstructorAssignmentForm.value[key];
      formData.append(key, value);
    }
    console.log(this.InstructorAssignmentForm.value)
    console.log(formData);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading = true;
          // this.AssignmentService.update(+id,this.InstructorAssignmentForm.value).subscribe(response => {
          //   this.router.navigateByUrl('/basic-setup/board-list');
          //   this.snackBar.open('Information Updated Successfully ', '', {
          //     duration: 2000,
          //     verticalPosition: 'bottom',
          //     horizontalPosition: 'right', 
          //     panelClass: 'snackbar-success'
          //   });
          // }, error => {
          //   this.validationErrors = error;
          // })
        }
      })
    }  else {
      this.loading = true;
      this.AssignmentService.submit(formData).subscribe(response => {
     //   studentassignment-list/45120/20/1065/3089
        this.router.navigateByUrl('/admin/dashboard/studentassignment-list/'+this.traineeId+'/'+this.baseSchoolNameId+'/'+this.courseNameId+'/'+this.courseDurationId);
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
