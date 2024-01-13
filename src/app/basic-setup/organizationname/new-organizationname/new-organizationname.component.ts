import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { OrganizationNameService } from '../../service/organizationname.service';

@Component({
  selector: 'app-new-organizationname',
  templateUrl: './new-organizationname.component.html',
  styleUrls: ['./new-organizationname.component.sass']
})
export class NewOrganizationNameComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  OrganizationNameForm: FormGroup;
  validationErrors: string[] = [];
  selectedForceType:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private OrganizationNameService: OrganizationNameService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('organizationNameId'); 
    if (id) {
      this.pageTitle = 'Edit Organization Name';
      this.destination='Edit';
      this.buttonText="Update";
      this.OrganizationNameService.find(+id).subscribe(
        res => {
          this.OrganizationNameForm.patchValue({          

            organizationNameId: res.organizationNameId,
            forceTypeId:res.forceTypeId,
            name: res.name,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Organization Name';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
    this.getselectedForceType();
  }
  intitializeForm() {
    this.OrganizationNameForm = this.fb.group({
      organizationNameId: [0],
      forceTypeId:[],
      name: [''],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  getselectedForceType(){
    this.OrganizationNameService.getselectedForceType().subscribe(res=>{
      this.selectedForceType=res
    });
  }
  
  onSubmit() {
    const id = this.OrganizationNameForm.get('organizationNameId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.OrganizationNameService.update(+id,this.OrganizationNameForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/organizationname-list');
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
      this.OrganizationNameService.submit(this.OrganizationNameForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/organizationname-list');
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
