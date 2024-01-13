import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BNASubjectNameService } from '../../service/BNASubjectName.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { CourseNameService } from '../../../basic-setup/service/CourseName.service';
import { MasterData } from 'src/assets/data/master-data';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BNASubjectName } from '../../models/BNASubjectName';


@Component({
  selector: 'app-edit-bnasubjectname',
  templateUrl: './new-bnasubjectname.component.html',
  styleUrls: ['./new-bnasubjectname.component.sass']
})
export class NewBNASubjectNameComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  pageTitle: string;
  destination: string;
  btnText: string;
  courseNameId: number;
  //courseTypeId:number;
  course: string;
  branchId: number;
  BNASubjectNameForm: FormGroup;
  buttonText: string;
  validationErrors: string[] = [];
  selectedSemester: SelectedModel[];
  selectedBranch: SelectedModel[];
  selectedCourseName: SelectedModel[];
  selectedSubjectType: SelectedModel[];
  selectedKindOfSubject: SelectedModel[];
  selectedResultStatus: SelectedModel[];
  subjectNameList: BNASubjectName[];
  status = 1;
  isShown: boolean = false;
  courseTypeId: 1021;
  branchsId:any;

  options = [];
  filteredOptions;


  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['paperNo', 'subjectName', 'totalMark', 'passMarkBna','qExamTime', 'remarks','menuPosition', 'actions'];
  constructor(private snackBar: MatSnackBar, private CourseNameService: CourseNameService, private confirmService: ConfirmService, private CodeValueService: CodeValueService, private BNASubjectNameService: BNASubjectNameService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaSubjectNameId');
    if (id) {
      this.pageTitle = 'Edit Subject Name';
      this.destination = "Edit";
      this.buttonText = "Update"
      this.BNASubjectNameService.find(+id).subscribe(
        res => {
          this.BNASubjectNameForm.patchValue({

            bnaSubjectNameId: res.bnaSubjectNameId,
            //bnaSemesterId: res.bnaSemesterId,
            courseModuleId: res.courseModuleId,
            subjectCategoryId: res.subjectCategoryId,
            bnaSubjectCurriculumId: res.bnaSubjectCurriculumId,
            courseNameId: res.courseNameId,
            courseTypeId: res.courseTypeId,
            branchId: res.branchId,
            resultStatusId: res.resultStatusId,
            subjectTypeId: res.subjectTypeId,
            kindOfSubjectId: res.kindOfSubjectId,
            baseSchoolNameId: res.baseSchoolNameId,
            subjectClassificationId: res.subjectClassificationId,
            subjectName: res.subjectName,
            subjectNameBangla: res.subjectNameBangla,
            subjectShortName: res.subjectShortName,
            subjectCode: res.subjectCode,
            totalMark: res.totalMark,
            passMarkBna: res.passMarkBna,
            passMarkBup: res.passMarkBup,
            classTestMark: res.classTestMark,
            assignmentMark: res.assignmentMark,
            caseStudyMark: res.caseStudyMark,
            totalPeriod: res.totalPeriod,
            qExamTime: res.qExamTime,
            paperNo:res.paperNo,
            isActive: res.isActive,
            remarks: res.remarks,
            menuPosition:res.menuPosition,
            course: res.courseName,
          });
          //this.courseNameId = res.courseNameId;
        }
      );
    } else {
      this.pageTitle = 'Create Subject Name';
      this.destination = "Add";
      this.buttonText = "Save"
    }
    this.getSelectedBranch();
    this.getSelectedCourseName();
    this.getSelectedSubjectType();
    this.getSelectedResultStatus();
    //this.getSelectedRank();
    //this.getSelectedModule();

    this.intitializeForm();
  }
  intitializeForm() {
    this.BNASubjectNameForm = this.fb.group({
      bnaSubjectNameId: [0],
      //bnaSemesterId: [''],
      courseModuleId: [''],
      subjectCategoryId: [''],
      bnaSubjectCurriculumId: [''],
      courseNameId: [1252],
      course: [''],
      courseTypeId: [],
      branchId: [],
      resultStatusId: [''],
      subjectTypeId: [''],
      kindOfSubjectId: [''],
      baseSchoolNameId: [''],
      subjectClassificationId: [''],
      subjectName: [''],
      subjectNameBangla: [''],
      subjectShortName: [''],
      subjectCode: [''],
      totalMark: [''],
      passMarkBna: [''],
      passMarkBup: [''],
      classTestMark: [''],
      assignmentMark: [''],
      caseStudyMark: [''],
      totalPeriod: [''],
      qExamTime: [''],
      status: [this.status],
      remarks: [''],
      paperNo:[''],
      menuPosition:[],
      isActive: [true],

    })
    // //AutoComplete for courseName
    // this.BNASubjectNameForm.get('course').valueChanges
    //   .subscribe(value => {

    //     this.getSelectedCourseAutocomplete(value);
    //   })
  }

  // //AutoComplete for courseName
  // onCourseSelectionChanged(item) {
  //   this.courseNameId = item.value
  //   this.BNASubjectNameForm.get('courseNameId').setValue(item.value);
  //   this.BNASubjectNameForm.get('course').setValue(item.text);
  // }
  // //AutoComplete for courseName
  // getSelectedCourseAutocomplete(cName) {
  //   this.CourseNameService.getSelectedCourseByNameAndType(this.masterData.coursetype.CentralExam, cName).subscribe(response => {
  //     this.options = response;
  //     this.filteredOptions = response;
  //   })
  // }
  getSelectedBranch() {
    this.BNASubjectNameService.getSelectedBranch().subscribe(res => {
      this.selectedBranch = res
    });
  }
  getSelectedCourseName() {
    this.BNASubjectNameService.getSelectedCourseName().subscribe(res => {
      this.selectedCourseName = res
    });
  }
  onBranchSelectionChange(dropdown){
    this.isShown=true;
    if(dropdown.isUserInput) {
      this.branchsId=dropdown.source.value;
      this.BNASubjectNameService.getselectedSubjectNameByBranchId(dropdown.source.value,1252).subscribe(res=>{
        this.subjectNameList=res
        console.log(this.subjectNameList); 
      });
    }
  }
  getSelectedSubjectType() {
    this.BNASubjectNameService.getSelectedSubjectType().subscribe(res => {
      this.selectedSubjectType = res
    });
  }

  getSelectedResultStatus() {
    this.CodeValueService.getSelectedCodeValueByType(this.masterData.codevaluetype.ResultStatus).subscribe(res => {
      this.selectedResultStatus = res;
    })
  }
  // onBranchSelectionChanged(item) {
  //   // console.log(item);
  //   this.branchId = item.value
  //   this.courseNameId = this.BNASubjectNameForm.get('courseNameId').value;
  //   this.BNASubjectNameService.getSubjectNameByFromCourseNameIdAndBranchId(this.courseNameId, this.branchId).subscribe(response => {
  //     this.subjectNameList = response;
  //     console.log(this.subjectNameList);
  //   })
  // }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit() {
    const id = this.BNASubjectNameForm.get('bnaSubjectNameId').value;
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNASubjectNameService.update(+id, this.BNASubjectNameForm.value).subscribe(response => {
            this.router.navigateByUrl('/central-exam/add-bnasubjectname');
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
      this.loading=true;
      this.BNASubjectNameService.submit(this.BNASubjectNameForm.value).subscribe(response => {
        //this.router.navigateByUrl('/central-exam/add-bnasubjectname');
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

  reloadAfterDelete(){
    this.BNASubjectNameService.getselectedSubjectNameByBranchId(this.branchsId,1252).subscribe(res=>{
      this.subjectNameList=res
      console.log(this.subjectNameList); 
    });
  }
  deleteItem(row) {
    const id = row.bnaSubjectNameId;
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNASubjectNameService.delete(id).subscribe(() => {
          this.reloadAfterDelete();
          //this.onModuleSelectionChangeGetsubjectList();
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
