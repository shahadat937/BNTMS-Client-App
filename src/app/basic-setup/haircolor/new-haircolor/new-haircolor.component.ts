import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { HairColorService } from '../../service/haircolor.service';

@Component({
  selector: 'app-new-haircolor',
  templateUrl: './new-haircolor.component.html',
  styleUrls: ['./new-haircolor.component.sass']
})
export class NewHairColorComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  HairColorForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private HairColorService: HairColorService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('hairColorId'); 
    if (id) {
      this.pageTitle = 'Edit  Hair Color';
      this.destination='Edit';
      this.buttonText="Update";
      this.HairColorService.find(+id).subscribe(
        res => {
          this.HairColorForm.patchValue({          

            hairColorId: res.hairColorId,
            hairColorName: res.hairColorName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Hair Color';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.HairColorForm = this.fb.group({
      hairColorId: [0],
      hairColorName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.HairColorForm.get('hairColorId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
            this.HairColorService.update(+id,this.HairColorForm.value).subscribe(response => {
              this.router.navigateByUrl('/basic-setup/haircolor-list');
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
      this.loading=true;
        this.HairColorService.submit(this.HairColorForm.value).subscribe(response => {
          this.router.navigateByUrl('/basic-setup/haircolor-list');
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
