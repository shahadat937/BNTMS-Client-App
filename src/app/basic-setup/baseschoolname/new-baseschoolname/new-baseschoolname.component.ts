import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseSchoolNameService } from '../../service/BaseSchoolName.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-baseschoolname',
  templateUrl: './new-baseschoolname.component.html',
  styleUrls: ['./new-baseschoolname.component.sass']
})
export class NewBaseSchoolNameComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  BaseSchoolNameForm: FormGroup;
  validationErrors: string[] = [];
  selectedBaseName:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private BaseSchoolNameService: BaseSchoolNameService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService:ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    if (id) {
      this.pageTitle = 'Edit Base School Name';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.BaseSchoolNameService.find(+id).subscribe(
        res => {
          this.BaseSchoolNameForm.patchValue({          

            baseSchoolNameId: res.baseSchoolNameId,
            baseNameId: res.baseNameId,
            schoolName: res.schoolName,
            shortName:res.shortName,
            schoolLogo: res.schoolLogo,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Base School Name';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
    this.getselectedbasename();
  }
  intitializeForm() {
    this.BaseSchoolNameForm = this.fb.group({
      baseSchoolNameId: [0],
      baseNameId: ['', Validators.required], 
      schoolName: ['', Validators.required],
      shortName: ['', Validators.required],
      schoolLogo: [''],
      isActive: [true],
    
    })
  }


  getselectedbasename(){
    this.BaseSchoolNameService.getselectedbasename().subscribe(res=>{
      this.selectedBaseName=res
      console.log(this.selectedBaseName);
    });
  }


  
  onSubmit() {
    const id = this.BaseSchoolNameForm.get('baseSchoolNameId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BaseSchoolNameService.update(+id,this.BaseSchoolNameForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/baseschoolname-list');
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
      this.BaseSchoolNameService.submit(this.BaseSchoolNameForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/baseschoolname-list');
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
