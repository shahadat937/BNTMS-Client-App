import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PresentBilletService } from '../../service/PresentBillet.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-presentbillet',
  templateUrl: './new-presentbillet.component.html',
  styleUrls: ['./new-presentbillet.component.sass']
})
export class NewPresentBilletComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  PresentBilletForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private PresentBilletService: PresentBilletService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('presentBilletId'); 
    if (id) {
      this.pageTitle = 'Edit Present Billet';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.PresentBilletService.find(+id).subscribe(
        res => {
          this.PresentBilletForm.patchValue({          

            presentBilletId: res.presentBilletId,
            presentBilletName: res.presentBilletName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Present Billet';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.PresentBilletForm = this.fb.group({
      presentBilletId: [0],
      presentBilletName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.PresentBilletForm.get('presentBilletId').value; 
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.PresentBilletService.update(+id,this.PresentBilletForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/presentbillet-list');
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
    }  else {
      this.loading=true;
      this.PresentBilletService.submit(this.PresentBilletForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/presentbillet-list');
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
