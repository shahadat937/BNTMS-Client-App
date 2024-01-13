import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BnaCurriculumUpdateService } from '../../service/BnaCurriculumUpdate.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-BnaCurriculumUpdate',
  templateUrl: './new-BnaCurriculumUpdate.component.html',
  styleUrls: ['./new-BnaCurriculumUpdate.component.sass']
}) 
export class NewBnaCurriculumUpdateComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  BnaCurriculumUpdateForm: FormGroup;
  validationErrors: string[] = [];
  selectedcourse:SelectedModel[];
  selectedschool:SelectedModel[];
  selectedBnaBatch:SelectedModel[];
  selectedBnaSemester:SelectedModel[];
  selectedBnaSemesterDurations:SelectedModel[];
  selectedbnacurriculamtype:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private BnaCurriculumUpdateService: BnaCurriculumUpdateService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaCurriculumUpdateId'); 
    if (id) {
      this.pageTitle = 'Edit Reading Material'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.BnaCurriculumUpdateService.find(+id).subscribe(
        res => {
          this.BnaCurriculumUpdateForm.patchValue({          
            bnaCurriculumUpdateId:res.bnaCurriculumUpdateId, 
            bnaBatchId: res.bnaBatchId, 
            bnaSemesterId:res.bnaSemesterId, 
            bnaSemesterDurationId:res.bnaSemesterDurationId, 
            bnaCurriculumTypeId:res.bnaCurriculumTypeId, 
            traineeId:res.traineeId,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Reading Material';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getBnaBatch();
    this.getBnaSemester();
    this.getBnaSemesterDurations();
    this.getbnacurriculamtype();
  }
  intitializeForm() {
    this.BnaCurriculumUpdateForm = this.fb.group({
      bnaCurriculumUpdateId: [0],
      bnaBatchId:['',Validators.required],
      bnaSemesterId:['',Validators.required],
      bnaSemesterDurationId:['',Validators.required],
      bnaCurriculumTypeId:[''],
      traineeId:[],  
      isActive: [true],    
    })
  }
  
  

  getBnaBatch(){
    this.BnaCurriculumUpdateService.getselectedbnabatch().subscribe(res=>{
      this.selectedBnaBatch=res;
    });
  }

  getBnaSemester(){
    this.BnaCurriculumUpdateService.getselectedbnasemester().subscribe(res=>{
      this.selectedBnaSemester=res      
    });
  }

  getBnaSemesterDurations(){
    this.BnaCurriculumUpdateService.getselectedbnasemesterdurations().subscribe(res=>{
      this.selectedBnaSemesterDurations=res      
    });
  }

  getbnacurriculamtype(){
    this.BnaCurriculumUpdateService.getselectedbnacurriculamtype().subscribe(res=>{
      this.selectedbnacurriculamtype=res      
    });
  }

  onSubmit() {
    const id = this.BnaCurriculumUpdateForm.get('bnaCurriculumUpdateId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BnaCurriculumUpdateService.update(+id,this.BnaCurriculumUpdateForm.value).subscribe(response => {
            this.router.navigateByUrl('/trainee-management/bnacurriculumupdate-list');
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
      this.BnaCurriculumUpdateService.submit(this.BnaCurriculumUpdateForm.value).subscribe(response => {
        this.router.navigateByUrl('/trainee-management/bnacurriculumupdate-list');
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
