import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleFeatureService } from '../../service/rolefeature.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-edit-rolefeature',
  templateUrl: './new-rolefeature.component.html',
  styleUrls: ['./new-rolefeature.component.sass'] 
})
export class NewRoleFeatureComponent implements OnInit {
  pageTitle: string; 
  loading = false;
  destination:string;
  btnText:string;
  Roleid:number;
  Featureid:number;
  RoleFeatureForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];
  selectedModel:SelectedModel[];
  selectedrole:SelectedModel[];
  selectedfeature:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private RoleFeatureService: RoleFeatureService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const rid = this.route.snapshot.paramMap.get('roleId'); 
    this.Roleid = Number(rid);
    const fid = this.route.snapshot.paramMap.get('featureId'); 
    this.Featureid = Number(fid)
    if (this.Roleid && this.Featureid) {
      this.pageTitle = 'Edit RoleFeature';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.RoleFeatureService.find(this.Roleid, this.Featureid).subscribe(
        res => {
          this.RoleFeatureForm.patchValue({          
            roleId: res.roleId,
            featureId: res.featureId,
            add: res.add,
            update:res.update,
            delete:res.delete,
            report:res.report,
            isActive:res.isActive
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create RoleFeature';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getselectedrole();
    this.getselectedfeature();
  }
  intitializeForm() {
    this.RoleFeatureForm = this.fb.group({
      roleId:['', Validators.required],
      featureId: ['', Validators.required],
      add: [true],
      update: [true],
      delete: [true],
      report: [true],
      isActive: [true],
    
    })
  }

  getselectedrole(){
    this.RoleFeatureService.getselectedrole().subscribe(res=>{
      this.selectedrole=res
      console.log(this.selectedrole);
    });
  }

  getselectedfeature(){
    this.RoleFeatureService.getselectedfeature().subscribe(res=>{
      this.selectedfeature=res
      console.log(this.selectedfeature);
    });
  }

  onSubmit() {
    const rid = this.route.snapshot.paramMap.get('roleId'); 
    this.Roleid = Number(rid);
    const fid = this.route.snapshot.paramMap.get('featureId'); 
    this.Featureid = Number(fid)
    if (this.Roleid && this.Featureid) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.RoleFeatureService.update(this.Roleid,this.Featureid,this.RoleFeatureForm.value).subscribe(response => {
            this.router.navigateByUrl('/security/rolefeature-list');
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
      this.RoleFeatureService.submit(this.RoleFeatureForm.value).subscribe(response => {
        this.router.navigateByUrl('/security/rolefeature-list');
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
