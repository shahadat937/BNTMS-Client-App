import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DistrictService } from '../../service/District.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-district',
  templateUrl: './new-district.component.html',
  styleUrls: ['./new-district.component.sass']
})
export class NewDistrictComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  DistrictForm: FormGroup;
  validationErrors: string[] = [];
  selectedModel:SelectedModel[]; 
  districtByDivision:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private DistrictService: DistrictService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('districtId'); 
    if (id) {
      this.pageTitle = 'Edit District';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.DistrictService.find(+id).subscribe(
        res => {
          this.DistrictForm.patchValue({          

            districtId: res.districtId,
            divisionId: res.divisionId,
            districtName: res.districtName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create District';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
    this.getDivisionName();
  }
  intitializeForm() {
    this.DistrictForm = this.fb.group({
      districtId: [0],
      divisionId: ['', Validators.required],
      districtName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  // onSelectionChangeGetCourse(divisionId){
  //   this.DistrictService.getSelectedDistrictByDivision(divisionId).subscribe(res=>{
  //     this.districtByDivision=res;
  //     console.log(this.districtByDivision); 
  //  })
  // } 
  

  getDivisionName(){
    this.DistrictService.getselecteddivision().subscribe(res=>{
      this.selectedModel=res
      console.log(this.selectedModel);
    });
  }
  
  onSubmit() {
    const id = this.DistrictForm.get('districtId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.DistrictService.update(+id,this.DistrictForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/district-list');
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
      this.DistrictService.submit(this.DistrictForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/district-list');
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
