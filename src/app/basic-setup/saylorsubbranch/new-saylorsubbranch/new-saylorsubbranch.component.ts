import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SaylorSubBranchService } from '../../service/SaylorSubBranch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({ 
  selector: 'app-new-saylorsubbranch',
  templateUrl: './new-saylorsubbranch.component.html',
  styleUrls: ['./new-saylorsubbranch.component.sass']
})
export class NewSaylorSubBranchComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  SaylorSubBranchForm: FormGroup;
  validationErrors: string[] = [];
  selectedSaylorBranch:SelectedModel[]; 

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private SaylorSubBranchService: SaylorSubBranchService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('saylorSubBranchId'); 
    if (id) {
      this.pageTitle = 'Edit Sailor Sub Branch';
      this.destination='Edit';
      this.buttonText="Update";
      this.SaylorSubBranchService.find(+id).subscribe(
        res => {
          this.SaylorSubBranchForm.patchValue({          

            saylorSubBranchId: res.saylorSubBranchId,
            saylorBranchId:res.saylorBranchId,
            name: res.name,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Sailor Sub Branch';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
    this.getselectedSaylorBranch();
  }
  intitializeForm() {
    this.SaylorSubBranchForm = this.fb.group({
      saylorSubBranchId: [0],
      saylorBranchId:[],
      name: [''],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  getselectedSaylorBranch(){
    this.SaylorSubBranchService.getselectedSaylorBranch().subscribe(res=>{
      this.selectedSaylorBranch=res
      console.log(this.selectedSaylorBranch);      
    });
  }
  onSubmit() {
    const id = this.SaylorSubBranchForm.get('saylorSubBranchId').value;   
    if (id) {
      this.loading=true;
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.SaylorSubBranchService.update(+id,this.SaylorSubBranchForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/saylorsubbranch-list');
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
      this.SaylorSubBranchService.submit(this.SaylorSubBranchForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/saylorsubbranch-list');
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
