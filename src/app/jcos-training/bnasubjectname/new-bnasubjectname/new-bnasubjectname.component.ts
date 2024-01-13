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
  selectedSaylorBranch: SelectedModel[];
  selectedSaylorSubBranch: SelectedModel[];
  status = 1;
  isShown: boolean = false;
  courseTypeId: 1021;

  options = [];
  filteredOptions;


  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['paperNo', 'subjectName', 'totalMark', 'passMarkBna','qExamTime','menuPosition', 'actions'];
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
            saylorBranchId:res.saylorBranchId,
            saylorSubBranchId:res.saylorSubBranchId,
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
          this.onBranchSelectionChangegetSubBranch(res.saylorBranchId)  
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
    this.getselectedSaylorBranch();
    this.intitializeForm();
  }
  intitializeForm() {
    this.BNASubjectNameForm = this.fb.group({
      bnaSubjectNameId: [0],
      //bnaSemesterId: [''],
      courseModuleId: [''],
      subjectCategoryId: [''],
      bnaSubjectCurriculumId: [''],
      courseNameId: [1253],
      course: [''],
      courseTypeId: [],
      branchId: [17],
      saylorBranchId:[],
      saylorSubBranchId:[],
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
    
  }

  
  getselectedSaylorBranch(){
    this.BNASubjectNameService.getselectedSaylorBranch().subscribe(res=>{
      this.selectedSaylorBranch=res
      console.log(res);
     
    });
  }
  onBranchSelectionChangegetSubBranch(saylorBranchId){
    var saylorBranchId
    this.BNASubjectNameService.getselectedSaylorSubBranch(saylorBranchId).subscribe(res=>{
      this.selectedSaylorSubBranch=res
      console.log(res);
     
    });
  }
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
      this.BNASubjectNameService.getselectedSubjectNameByBranchId(dropdown.source.value,1253).subscribe(res=>{
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
            this.router.navigateByUrl('/jcos-training/add-bnasubjectname');
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
        //this.router.navigateByUrl('/jcos-training/add-bnasubjectname');
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
    const id = row.bnaSubjectNameId;
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNASubjectNameService.delete(id).subscribe(() => {
          //this.onModuleSelectionChangeGetsubjectList();
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
