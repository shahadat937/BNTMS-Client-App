import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SaylorRankService } from '../../service/SaylorRank.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({ 
  selector: 'app-new-saylorrank',
  templateUrl: './new-saylorrank.component.html',
  styleUrls: ['./new-saylorrank.component.sass']
})
export class NewSaylorRankComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  SaylorRankForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private SaylorRankService: SaylorRankService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('saylorRankId'); 
    if (id) {
      this.pageTitle = 'Edit Sailor Rank';
      this.destination='Edit';
      this.buttonText="Update";
      this.SaylorRankService.find(+id).subscribe(
        res => {
          this.SaylorRankForm.patchValue({          

            saylorRankId: res.saylorRankId,
            name: res.name,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Sailor Rank';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.SaylorRankForm = this.fb.group({
      saylorRankId: [0],
      name: [''],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.SaylorRankForm.get('saylorRankId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.SaylorRankService.update(+id,this.SaylorRankForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/saylorrank-list');
            this.snackBar.open(' Information Updated Successfully ', '', {
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
    }
   else {
    this.loading=true;
      this.SaylorRankService.submit(this.SaylorRankForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/saylorrank-list');
        this.snackBar.open('Information Save Successfully ', '', {
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
