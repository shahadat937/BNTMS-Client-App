import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureService } from '../../service/feature.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-edit-Feature',
  templateUrl: './new-feature.component.html',
  styleUrls: ['./new-feature.component.sass'] 
})
export class NewFeatureComponent implements OnInit {
  pageTitle: string; 
  loading = false;
  destination:string;
  btnText:string;
  FeatureForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];
  selectedModel:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private FeatureService: FeatureService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('featureId'); 
    if (id) {
      this.pageTitle = 'Edit Feature';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.FeatureService.find(+id).subscribe(
        res => {
          this.FeatureForm.patchValue({          

            featureId: res.featureId,
            featureName: res.featureName,
            path:res.path,
            iconName:res.iconName,
            icon:res.icon,
            //class:res.class,
            groupTitle:res.groupTitle,
            moduleId:res.moduleId,
            featureCode:res.featureCode,
            orderNo:res.orderNo,
        //    isReport:res.isReport,
            featureTypeId:res.featureTypeId,
            isActive:res.isActive
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Feature';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getModule();
  }
  intitializeForm() {
    this.FeatureForm = this.fb.group({
      featureId: [0],
      featureName: ['', Validators.required],
      path:['', Validators.required],
      iconName:[''],
      icon:[''],
      //class:[''],
      groupTitle:[''],
      moduleId:['', Validators.required],
      featureCode:['', Validators.required],
      orderNo:['', Validators.required],
     // isReport:[''],
      featureTypeId:['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }

  getModule(){
    this.FeatureService.getselectedmodule().subscribe(res=>{
      this.selectedModel=res
    });
  }

  onSubmit() {
    const id = this.FeatureForm.get('featureId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.FeatureService.update(+id,this.FeatureForm.value).subscribe(response => {
            this.router.navigateByUrl('/security/feature-list');
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
      this.FeatureService.submit(this.FeatureForm.value).subscribe(response => {
        this.router.navigateByUrl('/security/feature-list');
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
