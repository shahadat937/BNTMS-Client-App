import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectedService } from '../../service/elected.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-elected',
  templateUrl: './new-elected.component.html',
  styleUrls: ['./new-elected.component.sass']
})
export class NewElectedComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  electedForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private electedService: ElectedService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('electedId'); 
    if (id) {
      this.pageTitle = 'Edit Elected';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.electedService.find(+id).subscribe(
        res => {
          this.electedForm.patchValue({          

            electedId: res.electedId,
            electedType: res.electedType,
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Elected';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.electedForm = this.fb.group({
      electedId: [0],
      electedType: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.electedForm.get('electedId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
      this.electedService.update(+id,this.electedForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/elected-list');
        this.snackBar.open('Elected Information Updated Successfully ', '', {
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
else {
  this.loading=true;
      this.electedService.submit(this.electedForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/elected-list');
        this.snackBar.open('Elected Information Saved Successfully ', '', {
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
