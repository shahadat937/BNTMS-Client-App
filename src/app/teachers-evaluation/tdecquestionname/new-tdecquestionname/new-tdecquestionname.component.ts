import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { TdecQuestionNameService } from '../../service/TdecQuestionName.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-new-tdecquestionname',
  templateUrl: './new-tdecquestionname.component.html',
  styleUrls: ['./new-tdecquestionname.component.sass']
})
export class NewTdecQuestionNameComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  TdecQuestionNameForm: FormGroup;
  validationErrors: string[] = [];
  role:any;
  traineeId:any;
  branchId:any;
  userRole = Role;

  constructor(private snackBar: MatSnackBar,private authService: AuthService,private TdecQuestionNameService: TdecQuestionNameService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('tdecQuestionNameId'); 

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    if (id) {
      this.pageTitle = 'Edit Tdec Question Name';
      this.destination='Edit';
      this.buttonText="Update";
      this.TdecQuestionNameService.find(+id).subscribe(
        res => {
          this.TdecQuestionNameForm.patchValue({          

            tdecQuestionNameId: res.tdecQuestionNameId,
            name: res.name,
            baseSchoolNameId :res.baseSchoolNameId
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Tdec Question Name';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
    if(this.role == this.userRole.SuperAdmin || this.role === this.userRole.BNASchool || this.role === this.userRole.JSTISchool || this.userRole.SchoolOIC){
      this.TdecQuestionNameForm.get('baseSchoolNameId').setValue(this.branchId);
     }
  }
  intitializeForm() {
    this.TdecQuestionNameForm = this.fb.group({
      tdecQuestionNameId: [0],
      name: [''],
      baseSchoolNameId:[''],
      isActive: [true]
    
    })
  }
  
  onSubmit() {
    const id = this.TdecQuestionNameForm.get('tdecQuestionNameId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.TdecQuestionNameService.update(+id,this.TdecQuestionNameForm.value).subscribe(response => {
            this.router.navigateByUrl('/teachers-evaluation/tdecquestionname-list');
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
      this.TdecQuestionNameService.submit(this.TdecQuestionNameForm.value).subscribe(response => {
        this.router.navigateByUrl('/teachers-evaluation/tdecquestionname-list');
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
