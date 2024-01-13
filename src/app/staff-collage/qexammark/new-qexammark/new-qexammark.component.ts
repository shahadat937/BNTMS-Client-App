import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { BNAExamMarkService } from '../../service/bnaexammark.service';
import {BNAExamMarkService} from '../../../central-exam/service/bnaexammark.service'
import { SelectedModel } from '../../../core/models/selectedModel';
import {CodeValueService} from '../../../basic-setup/service/codevalue.service'
import {MasterData} from '../../../../assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import {ConfirmService} from '../../../../app/core/service/confirm.service';
import {BNASubjectName} from '../../../subject-management/models/BNASubjectName'
import { SubjectMark } from '../../../subject-management/models/SubjectMark';
import { TraineeNominationService } from '../../../course-management/service/traineenomination.service'
import { TraineeList } from '../../../attendance-management/models/traineeList';
import {TraineeListForExamMark} from '../../../exam-management/models/traineeListforexammark';
import {BNASubjectNameService} from '../../service/BNASubjectName.service'
@Component({
  selector: 'app-new-qexammark',
  templateUrl: './new-qexammark.component.html',
  styleUrls: ['./new-qexammark.component.sass']
})
export class NewQExamMarkComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText: string;
  pageTitle: string;
  destination: string;
  BNAExamMarkForm: FormGroup;
  validationErrors: string[] = [];
  selectedbaseschools: SelectedModel[];

  selectedcoursename: SelectedModel[];
  selectedcoursedurationbyschoolname: SelectedModel[];
  selectedClassTypeByBaseSchoolNameIdAndCourseNameId: SelectedModel[];
  selectedSubjectNameByBaseSchoolNameIdAndCourseNameId: SelectedModel[];
  selectedmarktype: SelectedModel[];
  selectedcoursModulebySchoolAndCourse: SelectedModel[];
  selectedmarkremarks: SelectedModel[];
  getTotalMarkAndPassMark: BNASubjectName;
  totalMark: string;
  baseSchoolNameId: number;
  classRoutineId: number;
  bnaSubjectNameId: number;
  passMarkBna: string;
  subjectMarkList: SubjectMark[]
  isShown: boolean = false;
  selectedCourseDuration: number;
  traineeList: TraineeListForExamMark[]
  examTypeCount: number;
  selectedCourseDurationByCourseTypeAndCourseName:SelectedModel[];
  selectedSubjectNameByCourseNameId:SelectedModel[];
  courseDurationId:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['sl', 'markType', 'passMark', 'mark'];
  displayedColumnsForTraineeList: string[] = ['sl', 'traineePNo', 'traineeName', 'obtaintMark', 'examMarkRemarksId'];

  constructor(private snackBar: MatSnackBar, private traineeNominationService: TraineeNominationService, private confirmService: ConfirmService, private CodeValueService: CodeValueService, private BNAExamMarkService: BNAExamMarkService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaExamMarkId');
    if (id) {
      this.pageTitle = 'Edit Staff College Mark';
      this.destination = "Edit";
      this.buttonText = "Update"
      this.BNAExamMarkService.find(+id).subscribe(
        res => {
          this.BNAExamMarkForm.patchValue({
            bnaExamMarkId: res.bnaExamMarkId,
            bnaExamScheduleId: res.bnaExamScheduleId,
            bnaSemesterId: res.bnaSemesterId,
            bnaBatchId: res.bnaBatchId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId: res.courseNameId,
            examTypeId: res.examTypeId,
            bnaCurriculamTypeId: res.bnaCurriculamTypeId,
            bnaSubjectNameId: res.bnaSubjectNameId,
            totalMark: res.totalMark,
            passMark: res.passMark,
            isApproved: res.isApproved,
            isApprovedBy: res.isApprovedBy,
            isApprovedDate: res.isApprovedDate,
            remarks: res.remarks,
            status: res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });
        }
      );
    } else {
      this.pageTitle = 'Create Staff College Mark';
      this.destination = "Add";
      this.buttonText = "Save"
    }
    this.intitializeForm();
    this.getselectedbaseschools();
    this.getselectedcoursename();
    //this.getSelectedMarkType();
    this.getselectedexammarkremark();
    //..................................
    this.getSelectedCourseDurationByCourseTypeIdAndCourseNameId();
  }
  intitializeForm() {
    this.BNAExamMarkForm = this.fb.group({
      bnaExamMarkId: [0],
      traineeId: [],
      bnaExamScheduleId: [],
      bnaSemesterId: [],
      courseName: [''],
      bnaBatchId: [],
      baseSchoolNameId: [],
      courseNameId: [],
      courseTypeId: [],
      SubjectMarkId: [],
      bnaCurriculamTypeId: [],
      bnaSubjectNameId: [],
      bnaSubjectName: [''],
      courseDurationId: [],
      classRoutineId: [],
      totalMark: [''],
      passMark: [''],
      obtaintMark: [],
      examTypeCount: [],
      isApproved: [false],
      isApprovedBy: [],
      isApprovedDate: [],
      remarks: [],
      traineeListForm: this.fb.array([
        this.createTraineeData()
      ]),
      status: [],
      isActive: [true],
    })
  }
  getControlLabel(index: number, type: string) {
    return (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get(type).value;
  }
  private createTraineeData() {

    return this.fb.group({
      courseNameId: [],
      status: [],
      traineePNo: [],
      traineeId: [],
      traineeName: [],
      rankPosition: [],
      indexNo:[],
      obtaintMark: [],
      examMarkRemarksId: []
    });
  }

  getTraineeListonClick() {
    const control = <FormArray>this.BNAExamMarkForm.controls["traineeListForm"];
    console.log(this.traineeList)
    for (let i = 0; i < this.traineeList.length; i++) {
      control.push(this.createTraineeData());
      console.log("value...");
      console.log(this.traineeList)
    }
    this.BNAExamMarkForm.patchValue({ traineeListForm: this.traineeList });
    console.log("value...");
    console.log(this.traineeList)
  }

  clearList() {
    const control = <FormArray>this.BNAExamMarkForm.controls["traineeListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }

  getSelectedCourseDurationByCourseTypeIdAndCourseNameId(){
    this.BNAExamMarkService.getSelectedCourseDurationByCourseTypeIdAndCourseNameId(MasterData.coursetype.CentralExam,MasterData.courseName.StaffCollage).subscribe(res => {
      console.log("courseName");
      this.selectedCourseDurationByCourseTypeAndCourseName = res;
    });
  }

  onCourseNameSelectionChangeGetSubjectAndTraineeList(dropdown) {

    if (dropdown.isUserInput) {
      // console.log(dropdown);
      var courseNameArr = dropdown.source.value.value.split('_');
      var courseNameTextArr = dropdown.source.value.text.split('_');
      var courseName = courseNameTextArr[0];
      var coursetitle = courseNameTextArr[1];
      this.courseDurationId = courseNameArr[0];
      var courseNameId = courseNameArr[1];

   //  console.log(this.courseDurationId+ ' - '+courseNameId);
      //console.log("coursename"+courseNameId);
      this.BNAExamMarkForm.get('courseName').setValue(courseName);
      this.BNAExamMarkForm.get('courseNameId').setValue(courseNameId);
      this.BNAExamMarkForm.get('courseDurationId').setValue(this.courseDurationId);
      this.isShown = false;

      var baseSchoolNameId = this.BNAExamMarkForm.value['baseSchoolNameId'];
      this.baseSchoolNameId = baseSchoolNameId;
      var courseNameId = this.BNAExamMarkForm.value['courseNameId'];

      // console.log(baseSchoolNameId +" -"+courseNameId);
      // if (baseSchoolNameId != null && courseNameId != null) {
      //   this.BNAExamMarkService.getSelectedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId, courseNameId, courseDurationId).subscribe(res => {
      //     this.selectedSubjectNameByBaseSchoolNameIdAndCourseNameId = res;
      //   });
      // }
      this.BNAExamMarkService.getSelectedSubjectNameByCourseNameId(courseNameId).subscribe(res => {
             this.selectedSubjectNameByCourseNameId = res;
        });


       // console.log("staff college courseduration id");
      //  console.log(courseDurationId);

      // this.BNAExamMarkService.getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId, courseNameId).subscribe(res => {

      //   this.selectedCourseDuration = res;
        //  console.log("course duration "+this.selectedCourseDuration);
        // this.BNAExamMarkForm.get('courseDurationId').setValue(this.selectedCourseDuration);
        this.traineeNominationService.getTestTraineeNominationByCourseDurationId(this.courseDurationId,0).subscribe(res => {
          this.traineeList = res;
         console.log("Trainee List");
          console.log(this.traineeList);
        });
      // });

    }
  }


  getselectedbaseschools() {
    this.BNAExamMarkService.getselectedbaseschools().subscribe(res => {
      this.selectedbaseschools = res
      // console.log(this.selectedbaseschools);
    });
  }

  getselectedexammarkremark() {
    this.BNAExamMarkService.getselectedexammarkremark().subscribe(res => {
      this.selectedmarkremarks = res
      // console.log(this.selectedbaseschools);
    });
  }

  onSubjectNameSelectionChangeGetTotalMarkAndPassMark(dropdown) {

    if (dropdown.isUserInput) {
      //console.log(dropdown);

      this.isShown = true;
      var subjectNameId = dropdown.source.value.value;
      var subjectName = dropdown.source.value.text;
   

      var baseSchoolNameId = this.BNAExamMarkForm.value['baseSchoolNameId'];
      var courseNameId = this.BNAExamMarkForm.value['courseNameId'];
      var courseDurationId = this.BNAExamMarkForm.value['courseDurationId'];
      //this.bnaSubjectNameId = dropdown.source.value.value;

      console.log(courseNameId+"-"+subjectNameId);
      this.bnaSubjectNameId = subjectNameId;
      //var courseModuleId = subjectArr[1]; GetSubjectMarkByCourseNameIdSubjectNameId
      this.BNAExamMarkForm.get('bnaSubjectName').setValue(subjectName);
      this.BNAExamMarkForm.get('bnaSubjectNameId').setValue(this.bnaSubjectNameId);
      this.clearList()
      this.getTraineeListonClick();
      // this.BNAExamMarkService.GetSubjectMarkByBaseSchoolNameIdCourseNameAndSubjectNameId(baseSchoolNameId, courseNameId, this.bnaSubjectNameId).subscribe(res => {
      //   console.log("ddddddddddddd");
      //   this.subjectMarkList = res;
      //   console.log(this.subjectMarkList);
      // });

      this.BNAExamMarkService.GetSubjectMarkByCourseNameIdSubjectNameId(courseNameId, this.bnaSubjectNameId).subscribe(res => {
       
       this.subjectMarkList = res;
        console.log(this.subjectMarkList);
        this.BNAExamMarkForm.get('classRoutineId').setValue(3447);
      });


      this.BNAExamMarkService.getClassRoutineIdForStaffCollege(this.courseDurationId, courseNameId, this.bnaSubjectNameId).subscribe(res => {
        this.classRoutineId = res;
      
        this.BNAExamMarkForm.get('classRoutineId').setValue(this.classRoutineId);
      });
      // getClassRoutineIdForStaffCollege
      // this.BNAExamMarkService.getselectedmarktypes(baseSchoolNameId, courseNameId, this.bnaSubjectNameId, 5).subscribe(res => {
      //   this.selectedmarktype = res
      //   this.examTypeCount = res.length;
      //   this.BNAExamMarkForm.get('examTypeCount').setValue(this.examTypeCount);
      //   console.log("selectedmarktype count" + this.examTypeCount)
      // });

      this.BNAExamMarkService.getselectedmarktypesByCourseNameIdAndSubjectNameId(courseNameId, courseDurationId, this.bnaSubjectNameId).subscribe(res => {
        this.selectedmarktype = res
        this.examTypeCount = res.length;
        this.BNAExamMarkForm.get('examTypeCount').setValue(this.examTypeCount);
        console.log("ci....");
        console.log(this.selectedmarktype);
        // console.log("selectedmarktype count" + this.examTypeCount)
      });
  
      // GetTotalMarkAndPassMarkByCourseNameIdAndSubjectId

      this.BNAExamMarkService.GetTotalMarkAndPassMarkByCourseNameIdAndSubjectId(courseNameId, this.bnaSubjectNameId).subscribe(res => {

        this.getTotalMarkAndPassMark = res;
        this.totalMark = res[0].totalMark;
        this.passMarkBna = res[0].passMarkBNA
        this.BNAExamMarkForm.get('totalMark').setValue(this.totalMark);
        this.BNAExamMarkForm.get('passMark').setValue(this.passMarkBna);
      });
    }
    //   this.BNAExamMarkService.GetTotalMarkAndPassMarkByBaseSchoolIdCourseIdAndSubjectId(baseSchoolNameId, courseNameId, this.bnaSubjectNameId).subscribe(res => {

    //     this.getTotalMarkAndPassMark = res;
    //     this.totalMark = res[0].totalMark;
    //     this.passMarkBna = res[0].passMarkBNA
    //     this.BNAExamMarkForm.get('totalMark').setValue(this.totalMark);
    //     this.BNAExamMarkForm.get('passMark').setValue(this.passMarkBna);
    //   });
    // }
  }


  getselectedcoursedurationbyschoolname() {
    var baseSchoolNameId = this.BNAExamMarkForm.value['baseSchoolNameId'];
    this.isShown = false;

    //console.log(baseSchoolNameId);
    this.BNAExamMarkService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res => {
      console.log("check name");
      this.selectedcoursedurationbyschoolname = res;
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  getselectedcoursename() {
    this.BNAExamMarkService.getselectedcoursename().subscribe(res => {
      this.selectedcoursename = res
    });
  }

  onSubmit() {
    const id = this.BNAExamMarkForm.get('bnaExamMarkId').value;

    console.log(this.BNAExamMarkForm.value);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNAExamMarkService.update(+id, JSON.stringify(this.BNAExamMarkForm.value)).subscribe(response => {
            this.router.navigateByUrl('/exam-management/bnaexammark-list');
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
    } else {
      this.confirmService.confirm('Confirm Save message', 'Are You Sure Save This Records?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNAExamMarkService.submit(JSON.stringify(this.BNAExamMarkForm.value)).subscribe(response => {
           this.BNAExamMarkForm.reset();
            this.isShown = false;
            this.BNAExamMarkForm.get('bnaExamMarkId').setValue(0);
            this.BNAExamMarkForm.get('isActive').setValue(true);
            this.BNAExamMarkForm.get('isApproved').setValue(true);
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
}
