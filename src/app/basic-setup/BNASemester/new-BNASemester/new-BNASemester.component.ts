import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { BNASemesterService } from '../../service/BNASemester.service';

@Component({
  selector: 'app-new-bnasemester',
  templateUrl: './new-bnasemester.component.html',
  styleUrls: ['./new-bnasemester.component.sass']
})
export class NewBNASemesterComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  BNASemesterForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private BNASemesterService: BNASemesterService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaSemesterId'); 
    if (id) {
      this.pageTitle = 'New BNA Semester';
      this.destination = "New";
      this.btnText='Update';
      this.BNASemesterService.find(+id).subscribe(
        res => {
          this.BNASemesterForm.patchValue({          

            bnaSemesterId: res.bnaSemesterId,
            semesterName: res.semesterName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNA Semester';
      this.destination = "Add";
      this.btnText='Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BNASemesterForm = this.fb.group({
      bnaSemesterId: [0],
      semesterName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BNASemesterForm.get('bnaSemesterId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.BNASemesterService.update(+id,this.BNASemesterForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bnasemester-list');
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
      this.BNASemesterService.submit(this.BNASemesterForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bnasemester-list');
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
