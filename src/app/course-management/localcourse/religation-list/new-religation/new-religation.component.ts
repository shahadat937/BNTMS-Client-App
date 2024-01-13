import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { TraineeNominationService } from 'src/app/course-management/service/traineenomination.service';

@Component({
  selector: 'app-new-religation',
  templateUrl: './new-religation.component.html',
  styleUrls: ['./new-religation.component.sass']
})
export class NewReligationComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  TraineeNominationForm: FormGroup;
  validationErrors: string[] = [];
  selectedWithdrawnType:SelectedModel[];
  traineeNominationId:any;
  traineeNomination:any;
  courseName:any;
  courseDuaration:any;
  traineeName:any;
  traineePno:any;
  courseDurationId:any;

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private TraineeNominationService: TraineeNominationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('traineeNominationId'); 
    this.traineeNominationId =id;
    this.intitializeForm();
    this.getSelectedWithdrawnType();
    this.getReligationInfoByTraineeId();
  }
  intitializeForm() {
    this.TraineeNominationForm = this.fb.group({
      traineeNominationId: [this.traineeNominationId],
      withdrawnRemarks: [''],
      withdrawnDate: [''],
      withdrawnTypeId: [''],
      doc: [''],
      withdrawnDocs:['']
    })
  }

  getReligationInfoByTraineeId(){
    this.TraineeNominationService.find(this.traineeNominationId).subscribe(res=>{
      this.traineeNomination=res;
      this.courseDuaration =res.courseDuration;
      this.courseName =res.courseName;
      this.courseDurationId =res.courseDurationId;
      this.traineeName =res.traineeName;
      this.traineePno =res.traineePNo
      console.log("trainee nomination");
      console.log(this.traineeNomination);
    });
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.TraineeNominationForm.patchValue({
        doc: file,
      });
    }
  }
  getSelectedWithdrawnType(){
    this.TraineeNominationService.getSelectedWithdrawnType().subscribe(res=>{
      this.selectedWithdrawnType=res.filter(x=>x.value != 5);
    });
  }
  onSubmit() {
    this.TraineeNominationForm.get('withdrawnDate').setValue((new Date(this.TraineeNominationForm.get('withdrawnDate').value)).toUTCString());
    const formData = new FormData();
    for (const key of Object.keys(this.TraineeNominationForm.value)) {
      const value = this.TraineeNominationForm.value[key];
      formData.append(key, value);
    }

      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.TraineeNominationService.updateTraineeNomination(+this.traineeNominationId,formData).subscribe(response => {
            this.router.navigateByUrl('/course-management/religation-list');
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
  }

}
