import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { FavoritesTypeService } from '../../service/favoritesType.service';

@Component({
  selector: 'app-new-favoritesType',
  templateUrl: './new-favoritesType.component.html',
  styleUrls: ['./new-favoritesType.component.sass']
})
export class NewFavoritesTypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  favoritesTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private favoritesTypeService: FavoritesTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('favoritesTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Favorites Type';
      this.destination='Edit';
      this.buttonText="Update";
      this.favoritesTypeService.find(+id).subscribe(
        res => {
          this.favoritesTypeForm.patchValue({          

            favoritesTypeId: res.favoritesTypeId,
            favoritesTypeName: res.favoritesTypeName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Favorites Type';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.favoritesTypeForm = this.fb.group({
      favoritesTypeId: [0],
      favoritesTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.favoritesTypeForm.get('favoritesTypeId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Favorites Type Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.favoritesTypeService.update(+id,this.favoritesTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/favoritesType-list');
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
      this.favoritesTypeService.submit(this.favoritesTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/favoritesType-list');
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
