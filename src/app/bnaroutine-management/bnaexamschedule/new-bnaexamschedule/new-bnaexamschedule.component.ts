import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BNAExamScheduleService } from '../../service/bnaexamschedule.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-bnaexamschedule',
  templateUrl: './new-bnaexamschedule.component.html',
  styleUrls: ['./new-bnaexamschedule.component.sass']
}) 
export class NewBNAExamScheduleComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  BNAExamScheduleForm: FormGroup;
  validationErrors: string[] = [];
  selectedbatch:SelectedModel[];
  selectedsubjectname:SelectedModel[];
  selectedsemester:SelectedModel[];
  selectedexamtype:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private BNAExamScheduleService: BNAExamScheduleService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaExamScheduleId'); 
    if (id) {
      this.pageTitle = 'Edit BNA Exam Schedule'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.BNAExamScheduleService.find(+id).subscribe(
        res => {
          this.BNAExamScheduleForm.patchValue({          
            bnaExamScheduleId:res.bnaExamScheduleId, 
            examDate: res.examDate, 
            bnaSemesterDurationId:res.bnaSemesterDurationId, 
            bnaSubjectNameId:res.bnaSubjectNameId, 
            bnaSemesterId:res.bnaSemesterId, 
            bnaBatchId:res.bnaBatchId,
            examTypeId:res.examTypeId,
            durationFrom:res.durationFrom,
            durationTo:res.durationTo,
            examLocation:res.examLocation,
            examSheduleStatus:res.examSheduleStatus,
            isApproved:res.isApproved,
            isApprovedDate:res.isApprovedDate,
            approvedBy:res.approvedBy,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNA Exam Schedule';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedexamtype();
    this.getselectedbnabatch();
    this.getselectedbnasubjectname();
    this.getselectedbnasemester();
  }
  intitializeForm() {
    this.BNAExamScheduleForm = this.fb.group({
      bnaExamScheduleId: [0],
      examDate:['',Validators.required],
      bnaSemesterDurationId:['',Validators.required],
      bnaSubjectNameId:['',Validators.required],
      bnaSemesterId:[],
      bnaBatchId:[],    
      examTypeId:[],
      durationFrom:[], 
      durationTo:[], 
      examLocation:[''], 
      examSheduleStatus:[], 
      isApproved:[],
      isApprovedDate:[],
      approvedBy:[''],
      status:[1],
      isActive: [true],    
    })
  }
  

  getselectedexamtype(){
    this.BNAExamScheduleService.getselectedexamtype().subscribe(res=>{
      this.selectedexamtype=res;
    });
  } 

  getselectedbnabatch(){
    this.BNAExamScheduleService.getselectedbnabatch().subscribe(res=>{
      this.selectedbatch=res;
    });
  } 

  getselectedbnasubjectname(){
    this.BNAExamScheduleService.getselectedbnasubjectname().subscribe(res=>{
      this.selectedsubjectname=res;
    });
  } 

  getselectedbnasemester(){
    this.BNAExamScheduleService.getselectedbnasemester().subscribe(res=>{
      this.selectedsemester=res;
    });
  } 

  

  onSubmit() {
    const id = this.BNAExamScheduleForm.get('bnaExamScheduleId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNAExamScheduleService.update(+id,this.BNAExamScheduleForm.value).subscribe(response => {
            this.router.navigateByUrl('/routine-management/bnaexamschedule-list');
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
      this.BNAExamScheduleService.submit(this.BNAExamScheduleForm.value).subscribe(response => {
        this.router.navigateByUrl('/routine-management/bnaexamschedule-list');
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
