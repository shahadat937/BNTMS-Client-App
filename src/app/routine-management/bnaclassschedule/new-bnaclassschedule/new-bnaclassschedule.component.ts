import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BnaClassScheduleService } from '../../service/bnaclassschedule.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-bnaclassschedule',
  templateUrl: './new-bnaclassschedule.component.html',
  styleUrls: ['./new-bnaclassschedule.component.sass']
}) 
export class NewBnaClassScheduleComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  BnaClassScheduleForm: FormGroup;
  validationErrors: string[] = [];
  selectedSemester:SelectedModel[];
  //selectedclasstype:SelectedModel[];
  //selectedLocationType:SelectedModel[];
  //selectedclassperiod:SelectedModel[];
  //selectedcoursedurationbyschoolname:SelectedModel[];
  //selectedsubjectname:SelectedModel[];
  //selectedSchool:SelectedModel[];
  selectedClassPeriod:SelectedModel[];
  selectedSection:SelectedModel[];
  selectedSubject:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private BnaClassScheduleService: BnaClassScheduleService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaClassScheduleId'); 
    if (id) {
      this.pageTitle = 'Edit Class Schedule'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.BnaClassScheduleService.find(+id).subscribe(
        res => {
          this.BnaClassScheduleForm.patchValue({          
            bnaClassScheduleId:res.bnaClassScheduleId, 
            bnaSemesterDurationId:res.bnaSemesterDurationId,
            bnaSemesterId:res.bnaSemesterId,
            classPeriodId: res.classPeriodId, 
            bnaBatchId:res.bnaBatchId, 
            bnaSubjectNameId:res.bnaSubjectNameId, 
            bnaClassSectionSelectionId:res.bnaClassSectionSelectionId,
            bnaClassScheduleStatusId:res.bnaClassScheduleStatusId,
            traineeId:res.traineeId,
            date:res.date,
            classLocation:res.classLocation,
            classCompletedStatus:res.classCompletedStatus,
            durationForm:res.durationForm,
            durationTo:res.durationTo,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });       
          //this.onBaseNameSelectionChangeGetModule("")
          //this.getselectedcoursedurationbyschoolname()
          //this.getselectedbnasubjectname()

        }
      );
    } else {
      this.pageTitle = 'Create Class Schedule';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedBnaSemesters();
    this.getselectedBnaClassSectionSelections();
   // this.getselectedClassPeriod();
    //this.getselectedcoursedurationbyschoolname();
    //this.getselectedbnasubjectname();
    this.getselectedClassPeriod();
    this.getselectedBnaSubjectNames();
    
  }
  intitializeForm() {
    this.BnaClassScheduleForm = this.fb.group({
      bnaClassScheduleId: [0],
      bnaSemesterDurationId:[],
      bnaSemesterId:[''],
      bnaBatchId:[],
      bnaSubjectNameId:['',Validators.required],
      bnaClassSectionSelectionId:['',Validators.required],
      classPeriodId:[],
      bnaClassScheduleStatusId:[],
      traineeId:[],
      date:[], 
      classLocation:[],
      classCompletedStatus:[true],
      durationForm:[],
      durationTo:[],
      status:[1],
      isActive: [true],    
    })
  }

  getselectedBnaSemesters(){
    this.BnaClassScheduleService.getselectedBnaSemesters().subscribe(res=>{
      this.selectedSemester=res;
    });
  } 
  getselectedClassPeriod(){
    this.BnaClassScheduleService.getselectedClassPeriod().subscribe(res=>{
      this.selectedClassPeriod=res;
    });
  } 
  getselectedBnaSubjectNames(){
    this.BnaClassScheduleService.getselectedBnaSubjectNames().subscribe(res=>{
      this.selectedSubject=res;
    });
  } 
  getselectedBnaClassSectionSelections(){
    this.BnaClassScheduleService.getselectedBnaClassSectionSelections().subscribe(res=>{
      this.selectedSection=res;
    });
  }

  

  onSubmit() {
    const id = this.BnaClassScheduleForm.get('bnaClassScheduleId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.BnaClassScheduleService.update(+id,this.BnaClassScheduleForm.value).subscribe(response => {
            this.router.navigateByUrl('/routine-management/bnaclassschedule-list');
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
      this.loading = true;
      this.BnaClassScheduleService.submit(this.BnaClassScheduleForm.value).subscribe(response => {
        this.router.navigateByUrl('/routine-management/bnaclassschedule-list');
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
