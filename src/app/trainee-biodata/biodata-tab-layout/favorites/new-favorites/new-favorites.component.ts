import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '../../service/Favorites.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';

@Component({
  selector: 'app-new-favorites',
  templateUrl: './new-favorites.component.html',
  styleUrls: ['./new-favorites.component.sass']
})
export class NewFavoritesComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  FavoritesForm: FormGroup; 
  validationErrors: string[] = [];
  districtValues:SelectedModel[]; 
  selectedFavorites:SelectedModel[]; 
  traineeId: string;

  constructor(private snackBar: MatSnackBar,private FavoritesService: FavoritesService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('favoritesId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Favorites';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.FavoritesService.find(+id).subscribe(
        res => {
          this.FavoritesForm.patchValue({          
            favoritesId: res.favoritesId,
            traineeId: res.traineeId,
            favoritesTypeId: res.favoritesTypeId,
            favoritesName:res.favoritesName,
            additionalInformation:res.additionalInformation,
            isActive: true
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Favorites';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getSelectedFavoritesType();
  }
  intitializeForm() {
    this.FavoritesForm = this.fb.group({
      favoritesId: [0],
      traineeId: [this.traineeId, Validators.required],
      favoritesTypeId: ['', Validators.required],
      favoritesName: ['', Validators.required], 
      additionalInformation: [''],
      isActive: [true],
    })
  }

  getSelectedFavoritesType(){
    this.FavoritesService.getSelectedFavoritesType().subscribe(res=>{
      this.selectedFavorites=res
    });
  }
  
  onSubmit() {
    const id = this.FavoritesForm.get('favoritesId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.loading = true;
          this.FavoritesService.update(+id,this.FavoritesForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/favorites-details/'+this.traineeId);
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
      this.FavoritesService.submit(this.FavoritesForm.value).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/favorites-details/'+this.traineeId);
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
