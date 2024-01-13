import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ModuleService } from '../../service/module.service';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { SelectedModel } from '../../../core/models/selectedModel';

@Component({ 
  selector: 'app-edit-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.sass'] 
})
export class NewModuleComponent implements OnInit {
  pageTitle: string; 
  destination:string;
  btnText:string;
   masterData = MasterData;
  loading = false;
  ModuleForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];
  selectedIcons:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private CodeValueService: CodeValueService,private confirmService: ConfirmService,private ModuleService: ModuleService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('moduleId'); 
    if (id) {
      this.pageTitle = 'Edit Module';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.ModuleService.find(+id).subscribe(
        res => {
          this.ModuleForm.patchValue({          

            moduleId: res.moduleId,
            title:res.title,
            moduleName: res.moduleName,
            iconName: res.iconName,
            icon: res.icon,
            //class: res.class,
            groupTitle: res.groupTitle,

            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Module';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getSelectedIcons();
    console.log(this.masterData.codevaluetype.ModuleIcon);
  }
  getSelectedIcons(){
    this.CodeValueService.getSelectedCodeValueByType(this.masterData.codevaluetype.ModuleIcon).subscribe(res=>{
      this.selectedIcons=res;   
      console.log(this.selectedIcons);
    })
  }
  intitializeForm() {
    this.ModuleForm = this.fb.group({
      moduleId: [0],
      title:[''],
      moduleName: [''],
      iconName: [''],
      icon: [''],
      //class: [''],
      groupTitle: [''],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.ModuleForm.get('moduleId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.ModuleService.update(+id,this.ModuleForm.value).subscribe(response => {
            this.router.navigateByUrl('/security/module-list');
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
      this.ModuleService.submit(this.ModuleForm.value).subscribe(response => {
        this.router.navigateByUrl('/security/module-list');
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
