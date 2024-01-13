import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamCenterSelectionService } from '../../service/examcenterselection.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-examcenterselection',
  templateUrl: './new-examcenterselection.component.html',
  styleUrls: ['./new-examcenterselection.component.sass']
}) 
export class NewExamCenterSelectionComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  ExamCenterSelectionForm: FormGroup;
  validationErrors: string[] = [];
  // selectedbnacurriculumtype:SelectedModel[];
  //  selectedbnasemester:SelectedModel[];
  //  selectedbnabatch:SelectedModel[];
   selectedbaseschools:SelectedModel[];
  //  selectedbnasubjectname:SelectedModel[];
  //  selectedexamtype:SelectedModel[];
   selectedcoursename:SelectedModel[];
  //  selectedExamCenterSelectionremarks:SelectedModel[];
    selectedcoursedurationbyschoolname:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private ExamCenterSelectionService: ExamCenterSelectionService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('examCenterSelectionId'); 
    if (id) {
      this.pageTitle = 'Edit Exam Center Selection'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.ExamCenterSelectionService.find(+id).subscribe(
        res => {
          this.ExamCenterSelectionForm.patchValue({          
            examCenterSelectionId:res.examCenterSelectionId, 
            traineeNominationId:res.traineeNominationId, 
            bnaExamScheduleId:res.bnaExamScheduleId, 
            examCenterId: res.examCenterId, 
            traineeId:res.traineeId, 
            
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Exam Center Selection';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    
  }
  intitializeForm() {
    this.ExamCenterSelectionForm = this.fb.group({
      examCenterSelectionId: [0],
      traineeNominationId: [],
      bnaExamScheduleId: [], 
      examCenterId: [],
      traineeId: [],
      menuPosition:[],
      isActive: [true],    
    })
  }
  
  

  onSubmit() {
    const id = this.ExamCenterSelectionForm.get('examCenterSelectionId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.ExamCenterSelectionService.update(+id,this.ExamCenterSelectionForm.value).subscribe(response => {
            this.router.navigateByUrl('/central-exam/examcenterselection-list');
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
      this.ExamCenterSelectionService.submit(this.ExamCenterSelectionForm.value).subscribe(response => {
        this.router.navigateByUrl('/central-exam/examcenterselection-list');
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
