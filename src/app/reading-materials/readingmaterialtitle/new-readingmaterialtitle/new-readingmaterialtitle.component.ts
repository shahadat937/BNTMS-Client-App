import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReadingMaterialTitleService } from '../../service/ReadingMaterialTitle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-readingmaterialtitle',
  templateUrl: './new-readingmaterialtitle.component.html',
  styleUrls: ['./new-readingmaterialtitle.component.sass']
})
export class NewReadingmaterialtitleComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  ReadingMaterialTitleForm: FormGroup;
  validationErrors: string[] = [];
  showSpinner=false;
  // success:boolean;

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private ReadingMaterialTitleService: ReadingMaterialTitleService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('readingMaterialTitleId'); 
    if (id) {
      this.pageTitle = 'Edit ReadingMaterial Title';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.ReadingMaterialTitleService.find(+id).subscribe(
        res => {
          this.ReadingMaterialTitleForm.patchValue({          

            readingMaterialTitleId: res.readingMaterialTitleId,
            title: res.title
          });          
        }
      );
    } else {
      this.pageTitle = 'Create ReadingMaterialTitle';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.ReadingMaterialTitleForm = this.fb.group({
      readingMaterialTitleId: [0],
      title: [''],
      isActive: [true],
    })
  }
  
  onSubmit() {
    const id = this.ReadingMaterialTitleForm.get('readingMaterialTitleId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.ReadingMaterialTitleService.update(+id,this.ReadingMaterialTitleForm.value).subscribe(response => {
            this.router.navigateByUrl('/reading-materials/readingmaterialtitle-list');
            this.snackBar.open('ReadingMaterialTitle Information Updated Successfully ', '', {
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
      this.loading = true;
      console.log("previous save")
      this.showSpinner=true;
      this.ReadingMaterialTitleService.submit(this.ReadingMaterialTitleForm.value).subscribe(response => {
    
        if(response.message){
          console.log("set successfully");
          this.showSpinner=false;
         }

        this.router.navigateByUrl('/reading-materials/readingmaterialtitle-list');
        this.snackBar.open('ReadingMaterialTitle Information Saved Successfully ', '', {
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
