import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BNASemesterDurationService } from '../../service/BNASemesterDuration.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-bnasemesterduration',
  templateUrl: './new-bnasemesterduration.component.html',
  styleUrls: ['./new-bnasemesterduration.component.sass']
}) 
export class NewBnasemesterdurationComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  BNASemesterDurationForm: FormGroup;
  validationErrors: string[] = [];
  selectedSemester:SelectedModel[];
  selectedCourseDuration:SelectedModel[];
  selectedBatch:SelectedModel[];
  selectedRank:SelectedModel[];
  selectedLocationType:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private BNASemesterDurationService: BNASemesterDurationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaSemesterDurationId'); 
    if (id) {
      this.pageTitle = 'Edit BNASemesterDuration'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.BNASemesterDurationService.find(+id).subscribe(
        res => {
          this.BNASemesterDurationForm.patchValue({          
            bnaSemesterDurationId:res.bnaSemesterDurationId, 
            courseDurationId:res.courseDurationId,
            bnaSemesterId: res.bnaSemesterId, 
            bnaBatchId:res.bnaBatchId, 
            startDate:res.startDate, 
            endDate:res.endDate, 
            semesterLocationType:res.semesterLocationType,
          // codeValueId:res.codeValueId, 
            rankId:res.rankId, 
            location:res.location, 
           // isSemesterComplete:res.isSemesterComplete,
            //nextSemesterId:res.nextSemesterId,
           // isApproved:res.isApproved,
            approvedBy:res.approvedBy, 
            approvedDate:res.approvedDate,
            status:res.status,
           // menuPosition:res.menuPosition,
           // isActive: res.isActive
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNASemesterDuration';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getSelectedBnaSemester();
    this.getSelectedBnaBatch();
    this.getSelectedRank();
    this.getSelectedLocationType();
    this.getSelectedCourseDuration();
  }
  intitializeForm() {
    this.BNASemesterDurationForm = this.fb.group({
      bnaSemesterDurationId: [0],
      courseDurationId:[],
      bnaSemesterId:[''],
      bnaBatchId:[''],
      //codeValueId:[''],
     // nextSemesterId:[''],
      semesterLocationType:[''],
    //  isSemesterComplete:[true],
      rankId:[''],
      startDate:[],
      endDate:[],
      location:[''],
      //isApproved:[true],
      approvedBy:[''],
      approvedDate:[],
      status:[0],
      isActive: [true],    
    })
  }
  
  getSelectedLocationType(){
    this.CodeValueService.getSelectedCodeValueByType(this.masterData.codevaluetype.LocationType).subscribe(res=>{
      this.selectedLocationType=res;      
    })
  }

  getSelectedBnaSemester(){
    this.BNASemesterDurationService.getSelectedBnaSemester().subscribe(res=>{
      this.selectedSemester=res
      console.log(this.selectedSemester);
    });
  } 

  getSelectedCourseDuration(){
    this.BNASemesterDurationService.getSelectedCourseDuration().subscribe(res=>{
      this.selectedCourseDuration=res
      console.log(this.selectedCourseDuration);
    });
  } 

  getSelectedBnaBatch(){
    this.BNASemesterDurationService.getSelectedBnaBatch().subscribe(res=>{
      this.selectedBatch=res
      console.log(this.selectedBatch);
    });
  }

  getSelectedRank(){
    this.BNASemesterDurationService.getSelectedRank().subscribe(res=>{
      this.selectedRank=res
      console.log(this.selectedRank);
    });
  }

  onSubmit() {
    const id = this.BNASemesterDurationForm.get('bnaSemesterDurationId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNASemesterDurationService.update(+id,this.BNASemesterDurationForm.value).subscribe(response => {
            this.router.navigateByUrl('/semester-management/bnasemesterduration-list');
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
      this.BNASemesterDurationService.submit(this.BNASemesterDurationForm.value).subscribe(response => {
        this.router.navigateByUrl('/semester-management/bnasemesterduration-list');
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
