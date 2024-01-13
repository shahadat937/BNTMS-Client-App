import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { RankService } from '../../service/Rank.service';

@Component({
  selector: 'app-new-Rank',
  templateUrl: './new-Rank.component.html',
  styleUrls: ['./new-Rank.component.sass']
})
export class NewRankComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  RankForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private RankService: RankService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('rankId'); 
    if (id) {
      this.pageTitle = 'New Rank';
      this.destination = "New";
      this.btnText='Update';
      this.RankService.find(+id).subscribe(
        res => {
          this.RankForm.patchValue({          

            rankId: res.rankId,
            rankName: res.rankName,
            position: res.position,
            completeStatus: res.completeStatus,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Rank';
      this.destination = "Add";
      this.btnText='Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.RankForm = this.fb.group({
      rankId: [0],
      rankName: ['', Validators.required],
      position: ['', Validators.required],
      completeStatus: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.RankForm.get('rankId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Rank Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.RankService.update(+id,this.RankForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/Rank-list');
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
      this.RankService.submit(this.RankForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/Rank-list');
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
