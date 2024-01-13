import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CasteService } from '../../service/Caste.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-caste',
  templateUrl: './new-caste.component.html',
  styleUrls: ['./new-caste.component.sass']
})
export class NewCasteComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  CasteForm: FormGroup;
  validationErrors: string[] = [];
  selectedModel:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CasteService: CasteService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('casteId'); 
    if (id) {
      this.pageTitle = 'Edit Caste';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.CasteService.find(+id).subscribe(
        res => {
          this.CasteForm.patchValue({          

            casteId: res.casteId,
            religionId: res.religionId,
            castName: res.castName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Caste';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
    this.getReligionName();
  }
  intitializeForm() {
    this.CasteForm = this.fb.group({
      casteId: [0],
      religionId: ['', Validators.required],
      castName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }

  getReligionName(){
    this.CasteService.getselectedreligion().subscribe(res=>{
      this.selectedModel=res
      console.log(this.selectedModel);
    });
  }
  
  onSubmit() {
    const id = this.CasteForm.get('casteId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.CasteService.update(+id,this.CasteForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/caste-list');
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
      this.CasteService.submit(this.CasteForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/caste-list');
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
