import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BnaClassTestService } from '../../service/BnaClassTest.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { BNAExamMarkService } from '../../service/bnaexammark.service';
import { TraineeList } from 'src/app/attendance-management/models/traineeList';
import { TraineeNominationService } from 'src/app/course-management/service/traineenomination.service';

@Component({
  selector: 'app-new-BnaClassTest',
  templateUrl: './new-BnaClassTest.component.html',
  styleUrls: ['./new-BnaClassTest.component.sass']
})
export class NewBnaClassTestComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText: string;
  pageTitle: string;
  destination: string;
  BnaClassTestForm: FormGroup;
  validationErrors: string[] = [];
  selectedSemesterDuration: SelectedModel[];
  selectedbnasemester: SelectedModel[];
  selectedsubjectCategory: SelectedModel[];
  selectedbnaSubjectCurriculum: SelectedModel[];
  selectedbnaSubjectName: SelectedModel[];
  selectedbnaClassTestType: SelectedModel[];
  selectedbaseschools: SelectedModel[];
  selectedcoursedurationbyschoolname: SelectedModel[];
  selectedSubjectNameByBaseSchoolNameIdAndCourseNameId: SelectedModel[];
  selectedCourseDuration: number;
  traineeList: TraineeList[];
  isShown: boolean = false;
  traineeNominationListForAttendance: TraineeList[];

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  displayedColumnsForTraineeList: string[] = ['sl', 'trainee', 'obtainedMark1', 'obtainedMark2', 'obtainedMark3', 'obtainedMark4', 'obtainedMark5'];


  constructor(private snackBar: MatSnackBar, private confirmService: ConfirmService, private CodeValueService: CodeValueService, private BnaClassTestService: BnaClassTestService, private bnaexammarkService: BNAExamMarkService, private traineeNominationService: TraineeNominationService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaClassTestId');
    if (id) {
      this.pageTitle = 'Edit BNA Class Test';
      this.destination = "Edit";
      this.buttonText = "Update"
      this.BnaClassTestService.find(+id).subscribe(
        res => {
          this.BnaClassTestForm.patchValue({
            bnaClassTestId: res.bnaClassTestId,
            bnaSemesterDurationId: res.bnaSemesterDurationId,
            bnaSemesterId: res.bnaSemesterId,
            subjectCategoryId: res.subjectCategoryId,
            bnaSubjectCurriculumId: res.bnaSubjectCurriculumId,
            traineeId: res.traineeId,
            bnaSubjectNameId: res.bnaSubjectNameId,
            bnaClassTestTypeId: res.bnaClassTestTypeId,
            totalMark: res.totalMark,
            percentage: res.percentage,
            obtainedMark1: res.obtainedMark1,
            obtainedMark2: res.obtainedMark2,
            obtainedMark3: res.obtainedMark3,
            obtainedMark4: res.obtainedMark4,
            obtainedMark5: res.obtainedMark5,
            isApproved: res.isApproved,
            approvedBy: res.approvedBy,
            approvedDate: res.approvedDate,
            status: res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });
        }
      );
    } else {
      this.pageTitle = 'Create BNA Class Test';
      this.destination = "Add";
      this.buttonText = "Save"
    }
    this.intitializeForm();
    this.getBnaSemesterDurations();
    this.getselectedbnasemester();
    this.getsubjectCategory();
    this.getbnaSubjectCurriculum();
    this.getselectedbnasubjectname();
    this.getbnaClassTestType();
    this.getselectedbaseschools();
    this.getselectedcoursedurationbyschoolname();
    this.onCourseNameSelectionChangeGetSubjectAndTraineeList("");
  }
  intitializeForm() {
    this.BnaClassTestForm = this.fb.group({
      bnaClassTestId: [0],
      baseSchoolNameId: [],
      courseName: [''],
      courseNameId: [],
      bnaSemesterDurationId: [''],
      bnaSemesterId: [''],
      subjectCategoryId: [''],
      bnaSubjectCurriculumId: [''],
      traineeId: [''],
      bnaSubjectNameId: [''],
      bnaClassTestTypeId: [''],
      totalMark: [],
      percentage: [''],
      obtainedMark1: [''],
      obtainedMark2: [''],
      obtainedMark3: [''],
      obtainedMark4: [''],
      obtainedMark5: [''],
      isApproved: [],
      approvedBy: [''],
      approvedDate: [],
      status: [],
      isActive: [true],
      traineeList: this.fb.array([this.createTraineeData()]),
    })
  }
  private createTraineeData() {

    return this.fb.group({

      obtainedMark1: [''],
      obtainedMark2: [''],
      obtainedMark3: [''],
      obtainedMark4: [''],
      obtainedMark5: [''],
      traineeId: [''],

    });
  }


  onCourseNameSelectionChangeGetSubjectAndTraineeList(dropdown){
    if(dropdown.isUserInput) {
    this.isShown=true;
    var courseNameArr = dropdown.source.value.value.split('_');
    var courseNameTextArr = dropdown.source.value.text.split('_');
    var courseName = courseNameTextArr[0];
    var coursetitle = courseNameTextArr[1];
    var courseDurationId = courseNameArr[0];
    var courseNameId = courseNameArr[1];

    console.log("Course Duration");
    console.log(courseDurationId);
    
    this.BnaClassTestForm.get('courseName').setValue(courseName);
    this.BnaClassTestForm.get('courseNameId').setValue(courseNameId);

    var baseSchoolNameId = this.BnaClassTestForm.value['baseSchoolNameId'];
    var courseNameId = this.BnaClassTestForm.value['courseNameId'];



    if(baseSchoolNameId != null && courseNameId != null){
       this.bnaexammarkService.getSelectedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId,courseDurationId).subscribe(res=>{
         
        this.selectedSubjectNameByBaseSchoolNameIdAndCourseNameId=res;     
       });
     }
     this.bnaexammarkService.getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId).subscribe(res=>{
      this.selectedCourseDuration=res;   
      this.traineeNominationService.getTraineeNominationByCourseDurationId(this.selectedCourseDuration,0).subscribe(res=>{
        this.traineeList=res; 
        //console.log(this.traineeList);
       });
     });
  }
}
  getselectedbaseschools() {
    this.bnaexammarkService.getselectedbaseschools().subscribe(res => {
      this.selectedbaseschools = res
    });
  }
  getselectedcoursedurationbyschoolname() {
    var baseSchoolNameId = this.BnaClassTestForm.value['baseSchoolNameId'];
    this.bnaexammarkService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res => {
      this.selectedcoursedurationbyschoolname = res;
    });
  }
  getBnaSemesterDurations() {
    this.BnaClassTestService.getselectedBnaSemesterDurations().subscribe(res => {
      this.selectedSemesterDuration = res
    });
  }
  getselectedbnasemester() {
    this.BnaClassTestService.getselectedbnasemester().subscribe(res => {
      this.selectedbnasemester = res
    });
  }
  getsubjectCategory() {
    this.BnaClassTestService.getselectedsubjectCategory().subscribe(res => {
      this.selectedsubjectCategory = res
    });
  }
  getbnaSubjectCurriculum() {
    this.BnaClassTestService.getselectedbnaSubjectCurriculum().subscribe(res => {
      this.selectedbnaSubjectCurriculum = res
    });
  }
  getselectedbnasubjectname() {
    this.BnaClassTestService.getselectedbnasubjectname().subscribe(res => {
      this.selectedbnaSubjectName = res
    });
  }
  getbnaClassTestType() {
    this.BnaClassTestService.getselectedbnaClassTestType().subscribe(res => {
      this.selectedbnaClassTestType = res
    });
  }


  onSubmit() {
    const id = this.BnaClassTestForm.get('bnaClassTestId').value;
    var bnaSubjectNameId = this.BnaClassTestForm.value['bnaSubjectNameId'];
    var bnaClassTestTypeId = this.BnaClassTestForm.value['bnaClassTestTypeId'];
    console.log(this.BnaClassTestForm);

    for (let i = 0; i < this.traineeList.length; i++) {
      this.traineeList[i]["bnaSubjectNameId"] = bnaSubjectNameId;
      this.traineeList[i]["bnaClassTestTypeId"] = bnaClassTestTypeId;

      //this.traineeNominationListForAttendance[i]["attendanceDate"] = this.datepipe.transform((new Date), 'MM/dd/yyyy');
    }
    //   if (id) {
    //     this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
    //       console.log(result);
    //       if (result) {
    //         this.BnaClassTestService.update(+id,this.BnaClassTestForm.value).subscribe(response => {
    //           this.router.navigateByUrl('/bna-exam-management/bnaclasstest-list');
    //           this.snackBar.open('Information Updated Successfully ', '', {
    //             duration: 2000,
    //             verticalPosition: 'bottom',
    //             horizontalPosition: 'right',
    //             panelClass: 'snackbar-success'
    //           });
    //         }, error => {
    //           this.validationErrors = error;
    //         })
    //       }
    //     })
    //   }else {
    //     this.BnaClassTestService.submit(this.BnaClassTestForm.value).subscribe(response => {
    //       this.router.navigateByUrl('/bna-exam-management/bnaclasstest-list');
    //       this.snackBar.open('Information Inserted Successfully ', '', {
    //         duration: 2000,
    //         verticalPosition: 'bottom',
    //         horizontalPosition: 'right',
    //         panelClass: 'snackbar-success'
    //       });
    //     }, error => {
    //       this.validationErrors = error;
    //     })
    //   }

  }
}
