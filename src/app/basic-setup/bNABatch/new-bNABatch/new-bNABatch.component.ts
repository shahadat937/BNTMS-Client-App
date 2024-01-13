import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { BNABatchService } from '../../service/bNABatch.service';
//import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-new-bnabatch',
  templateUrl: './new-bnabatch.component.html',
  styleUrls: ['./new-bnabatch.component.sass']
})
export class NewBNABatchComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  bNABatchForm: FormGroup;
  validationErrors: string[] = [];
  //date = new FormControl(new Date());
  //serializedDate = new FormControl(new Date().toISOString());


  constructor(private snackBar: MatSnackBar,private bNABatchService: BNABatchService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaBatchId'); 
    if (id) {
      this.pageTitle = 'Edit BNA Batch';
      this.destination='Edit';
      this.buttonText="Update";
      this.bNABatchService.find(+id).subscribe(
        res => {
          this.bNABatchForm.patchValue({          

            bnaBatchId: res.bnaBatchId,
            batchName: res.batchName,
            startDate: res.startDate,
            completeStatus: res.completeStatus,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNA Batch';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.bNABatchForm = this.fb.group({
      bnaBatchId: [0],
      batchName: ['', Validators.required],
      startDate: ['', Validators.required],
      completeStatus:['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.bNABatchForm.get('bnaBatchId').value;  
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.bNABatchService.update(+id,this.bNABatchForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bnabatch-list');
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
      this.loading = true;
      this.bNABatchService.submit(this.bNABatchForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bnabatch-list');
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
