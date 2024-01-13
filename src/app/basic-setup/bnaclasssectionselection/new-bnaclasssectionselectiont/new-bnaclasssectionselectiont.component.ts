import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BNAClassSectionSelectionService } from '../../service/BNAClassSectionSelection.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-bnaclasssectionselectiont',
  templateUrl: './new-bnaclasssectionselectiont.component.html',
  styleUrls: ['./new-bnaclasssectionselectiont.component.sass']
})
export class NewBnaclasssectionselectiontComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  BNAClassSectionSelectionForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private BNAClassSectionSelectionService: BNAClassSectionSelectionService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaClassSectionSelectionId'); 
    if (id) {
      this.pageTitle = 'Edit BNA Class Section Selection';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.BNAClassSectionSelectionService.find(+id).subscribe(
        res => {
          this.BNAClassSectionSelectionForm.patchValue({          

            bnaClassSectionSelectionId: res.bnaClassSectionSelectionId,
            sectionName: res.sectionName, 
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNA Class Section Selection';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BNAClassSectionSelectionForm = this.fb.group({
      bnaClassSectionSelectionId: [0],
      sectionName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BNAClassSectionSelectionForm.get('bnaClassSectionSelectionId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNAClassSectionSelectionService.update(+id,this.BNAClassSectionSelectionForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bnaclasssectionselection-list');
            this.snackBar.open('BNAClassSectionSelection Information Updated Successfully ', '', {
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
      this.BNAClassSectionSelectionService.submit(this.BNAClassSectionSelectionForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bnaclasssectionselection-list');
        this.snackBar.open('BNAClassSectionSelection Information Saved Successfully ', '', {
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
