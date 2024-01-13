import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadRightService } from '../../service/downloadright.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-downloadright',
  templateUrl: './new-downloadright.component.html',
  styleUrls: ['./new-downloadright.component.sass']
})
export class NewDownloadRightComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  DownloadRightForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private DownloadRightService: DownloadRightService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('downloadRightId'); 
    if (id) {
      this.pageTitle = 'Edit Download Right';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.DownloadRightService.find(+id).subscribe(
        res => {
          this.DownloadRightForm.patchValue({          

            downloadRightId: res.downloadRightId,
            downloadRightName: res.downloadRightName,
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Download Right';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.DownloadRightForm = this.fb.group({
      downloadRightId: [0],
      downloadRightName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.DownloadRightForm.get('downloadRightId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.DownloadRightService.update(+id,this.DownloadRightForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/downloadright-list');
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
      this.DownloadRightService.submit(this.DownloadRightForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/downloadright-list');
        this.snackBar.open(' Information Save Successfully ', '', {
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
