import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {SubjectMarkService} from '../../../central-exam/service/SubjectMark.service'
import { ConfirmService } from '../../../core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import {SubjectMark} from '../../../central-exam/models/SubjectMark'
import {MasterData} from '../../../../../src/assets/data/master-data';
import {BNAExamMarkService} from '../../../central-exam/service/bnaexammark.service'

@Component({
  selector: 'app-new-subjectmark',
  templateUrl: './new-subjectmark.component.html',
  styleUrls: ['./new-subjectmark.component.sass']
})
export class NewSubjectMarkComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  pageTitle: string;
  destination:string;
  btnText:string;
  SubjectMarkForm: FormGroup;
  validationErrors: string[] = [];
  selectedmarktype:SelectedModel[];
  selectedSchoolName:SelectedModel[];
  selectedCourseModuleByBaseSchoolAndCourseNameId:SelectedModel[];
  selectedsubjectname:SelectedModel[];
  courseNameId:number;
  isShown: boolean = false ;
  isIdPresent:boolean=false;
  selectedSubjectMark:SubjectMark[];
  selectedCourseDurationByCourseTypeAndCourseName:SelectedModel[];
  courseTypeId:any;
  bnaSubjectNameId:any;
  options = [];
  filteredOptions;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = [ 'ser', 'markType', 'mark', 'passMark', 'actions'];

  constructor(private snackBar: MatSnackBar,private BNAExamMarkService: BNAExamMarkService,private confirmService: ConfirmService,private SubjectMarkService: SubjectMarkService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('subjectMarkId'); 
    if (id) {
      this.isIdPresent=true;
      this.pageTitle = 'Edit Staff College Subject Mark';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.SubjectMarkService.find(+id).subscribe(
        res => {
          this.SubjectMarkForm.patchValue({          

            subjectMarkId: res.subjectMarkId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId:  res.courseNameId,
            bnaSubjectNameId: res.bnaSubjectNameId,
            courseModuleId: res.courseModuleId,
            markTypeId: res.markTypeId,
            passMark: res.passMark,
            mark: res.mark,
            remarks:res.remarks,    
            status:res.status,
            menuPosition:res.menuPosition,
            course:res.courseName,
            isActive: res.isActive         
          }); 
          this.courseNameId = res.courseNameId;          
        }
      );
    } else {
      this.pageTitle = 'Staff College Subject Mark';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
    this.getSelectedMarkType();
    this.getSelectedCourseDurationByCourseTypeIdAndCourseNameId();
    this.getSelectedSubjectNameByCourseNameId();
  }
  intitializeForm() {
    this.SubjectMarkForm = this.fb.group({
      subjectMarkId: [0],
      baseSchoolNameId: [''],
      courseNameId:  [this.masterData.courseName.StaffCollage],
      course:[''],
      courseNames:[''],
      bnaSubjectNameId:[],
      courseModuleId: [],
      markTypeId: [],
      passMark: [],
      mark: [],
      remarks:[''],    
      status:[],
      menuPosition:[],
      isActive: [true],
    })
  }

  getSelectedCourseDurationByCourseTypeIdAndCourseNameId(){
    this.BNAExamMarkService.getSelectedCourseDurationByCourseTypeIdAndCourseNameId(MasterData.coursetype.CentralExam,MasterData.courseName.StaffCollage).subscribe(res => {
      console.log("courseName");
      this.selectedCourseDurationByCourseTypeAndCourseName = res;
    });
  }
  getSelectedSubjectNameByCourseNameId(){
    this.SubjectMarkService.getSelectedSubjectNameByCourseNameId(MasterData.courseName.StaffCollage).subscribe(res=>{
      this.selectedsubjectname=res;
    });
  }

  getAllSubjectList(){
    this.SubjectMarkService.getSelectedSubjectMarkByCourseNameIdAndBnaSubjectNameId(this.masterData.courseName.StaffCollage,this.bnaSubjectNameId).subscribe(res=>{
      this.selectedSubjectMark=res;  
      console.log(this.selectedSubjectMark); 
    }); 
   }
  
    getSelectedMarkType(){
      this.SubjectMarkService.getselectedmarktypes().subscribe(res=>{
        this.selectedmarktype=res
      });
    }


  onsubjectSelectionChangeGetsubjectMarkList(){
   var courseNameId=MasterData.courseName.StaffCollage;

    this.SubjectMarkForm.get('courseNameId').setValue(courseNameId);
    this.bnaSubjectNameId=this.SubjectMarkForm.value['bnaSubjectNameId'];
    this.isShown=true;
    if(courseNameId != null  && this.bnaSubjectNameId !=null){
     this.getAllSubjectList();
    }
  }

  onSubmit() {
    const id = this.SubjectMarkForm.get('subjectMarkId').value;  
    console.log(this.SubjectMarkForm.value);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.SubjectMarkService.update(+id,this.SubjectMarkForm.value).subscribe(response => {
            this.router.navigateByUrl('/staff-collage/add-staffcollagesubjectmark');
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
      this.loading=true;
      this.SubjectMarkService.submit(this.SubjectMarkForm.value).subscribe(response => {
        this.router.navigateByUrl('/staff-collage/add-staffcollagesubjectmark');
        this.onsubjectSelectionChangeGetsubjectMarkList();
        this.SubjectMarkForm.reset();
        this.SubjectMarkForm.get('subjectMarkId').setValue(0);
        this.SubjectMarkForm.get('isActive').setValue(true);
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
    const id = row.subjectMarkId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      if (result) {
        this.SubjectMarkService.delete(id).subscribe(() => {
          this.getAllSubjectList();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })    
  }
}
