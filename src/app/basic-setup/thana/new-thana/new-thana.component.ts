import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ThanaService } from '../../service/Thana.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-thana',
  templateUrl: './new-thana.component.html',
  styleUrls: ['./new-thana.component.sass']
})
export class NewThanaComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  ThanaForm: FormGroup;
  validationErrors: string[] = [];
  selectedModel:SelectedModel[]; 

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private ThanaService: ThanaService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('thanaId'); 
    if (id) {
      this.pageTitle = 'Edit Thana';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.ThanaService.find(+id).subscribe(
        res => {
          this.ThanaForm.patchValue({          

            thanaId: res.thanaId,
            districtId: res.districtId,
            thanaName: res.thanaName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Thana';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
    this.getDistrictName();
  }
  intitializeForm() {
    this.ThanaForm = this.fb.group({
      thanaId: [0],
      districtId: ['', Validators.required],
      thanaName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }

  getDistrictName(){
    this.ThanaService.getselecteddistrict().subscribe(res=>{
      this.selectedModel=res
      console.log(this.selectedModel);      
    });
  }
  
  onSubmit() {
    const id = this.ThanaForm.get('thanaId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.ThanaService.update(+id,this.ThanaForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/thana-list');
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
      this.ThanaService.submit(this.ThanaForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/thana-list');
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
