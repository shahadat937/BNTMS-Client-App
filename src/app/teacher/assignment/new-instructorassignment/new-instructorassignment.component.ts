import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorAssignmentService } from '../../services/InstructorAssignment.service';
import { ConfirmService } from '../../../core/service/confirm.service';
import { MasterData } from 'src/assets/data/master-data';

@Component({
  selector: 'app-new-instructorassignment',
  templateUrl: './new-instructorassignment.component.html',
  styleUrls: ['./new-instructorassignment.component.sass']
})
export class NewInstructorAssignmentComponent implements OnInit {
  pageTitle: string;
  destination:string;
  btnText:string;
  instructorId:any;
  baseSchoolNameId:any;
  courseNameId:any;
  courseDurationId:any;
  bnaSubjectNameId:any;
  cousreInstructorId:any;
  instructorAssignmentsList:any[];
   masterData = MasterData;
  loading = false;
  instructorAssignmentId:any;
  // isShown: boolean = false ;

  InstructorAssignmentForm: FormGroup;
  validationErrors: string[] = [];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['ser', 'assignmentTopic','assignmentMark','remarks','duration', 'status', 'subList'];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private AssignmentService: InstructorAssignmentService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('instructorAssignmentId'); 
    this.instructorAssignmentId = this.route.snapshot.paramMap.get('instructorAssignmentId'); 
    this.instructorId = this.route.snapshot.paramMap.get('traineeId'); 
    this.baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.bnaSubjectNameId = this.route.snapshot.paramMap.get('bnaSubjectNameId'); 
    this.getInstructorAssignmentListByInstructorId();
    this.getCourseInstructorIdForInstructorAssignmentSave();

    if (id) {
      this.pageTitle = 'Edit/List of Assignment';
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
      this.pageTitle = 'Create/List of Assignment';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.InstructorAssignmentForm = this.fb.group({
      instructorAssignmentId:[0],
      assignmentTopic: [''],
      remarks: [''],
      instructorId:[''],
      courseInstructorId:[''],
      baseSchoolNameId:[''],
      courseNameId:[''],
      courseDurationId:[''],
      status:[0],
      bnaSubjectNameId:[''],
      isActive: [true],    
      startDate: [],
      endDate: [],
      assignmentMark:[],
    })
  }

  getInstructorAssignmentListByInstructorId(){
    this.AssignmentService.getInstructorAssignmentListByInstructorId(this.baseSchoolNameId,this.courseDurationId,this.bnaSubjectNameId,this.instructorId).subscribe(res=>{
      this.instructorAssignmentsList=res;
      console.log("Course Instructor Id");
      console.log(this.instructorAssignmentsList);
    });
  }

  stopInstructorAssignments(instructorAssignmentId){
    this.confirmService.confirm('Confirm Stop message', 'Are You Sure Stop This Item').subscribe(result => {
      if (result) {
        this.AssignmentService.stopInstructorAssignments(instructorAssignmentId).subscribe(res => {
          this.getInstructorAssignmentListByInstructorId();
          console.log("Dropdown value");

          this.snackBar.open('Information Stop Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-warning'
          });
        })
      }
    })
  }
  getCourseInstructorIdForInstructorAssignmentSave(){
    this.AssignmentService.getCourseInstructorIdForInstructorAssignmentSave(this.instructorId,this.bnaSubjectNameId,this.baseSchoolNameId,this.courseDurationId).subscribe(res=>{
      this.cousreInstructorId=res;
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  onSubmit() {
    const id = this.InstructorAssignmentForm.get('instructorAssignmentId').value;  
    this.InstructorAssignmentForm.get('instructorId').setValue(this.instructorId);
    this.InstructorAssignmentForm.get('courseInstructorId').setValue(this.cousreInstructorId);
    this.InstructorAssignmentForm.get('baseSchoolNameId').setValue(this.baseSchoolNameId);
    this.InstructorAssignmentForm.get('courseNameId').setValue(this.courseNameId);
    this.InstructorAssignmentForm.get('courseDurationId').setValue(this.courseDurationId);
    this.InstructorAssignmentForm.get('bnaSubjectNameId').setValue(this.bnaSubjectNameId); 

    console.log(this.InstructorAssignmentForm.value);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading = true;
          this.AssignmentService.update(+id,this.InstructorAssignmentForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/board-list');
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
    }  else {
      this.loading = true;
      this.AssignmentService.submit(this.InstructorAssignmentForm.value).subscribe(response => {
        // admin/dashboard/assignment-list/44787
        //this.router.navigateByUrl('/admin/dashboard/assignment-list/'+this.instructorId);
        this.getInstructorAssignmentListByInstructorId();
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
 
  }

  deleteItem(row) {
    const id = row.instructorAssignmentId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.AssignmentService.delete(id).subscribe(() => {
          this.getInstructorAssignmentListByInstructorId();
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
