import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../service/game.service';
import { ConfirmService } from '../../../core/service/confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.sass'] 
})
export class NewGameComponent implements OnInit {
  pageTitle: string; 
  loading = false;
  destination:string;
  btnText:string;
  gameForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private gameService: GameService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('gameId'); 
    if (id) {
      this.pageTitle = 'Edit Game';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.gameService.find(+id).subscribe(
        res => {
          this.gameForm.patchValue({          

            gameId: res.gameId,
            gameName: res.gameName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Game';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.gameForm = this.fb.group({
      gameId: [0],
      gameName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.gameForm.get('gameId').value; 
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        //console.log(result);
        if (result) {
          this.loading=true;
          this.gameService.update(+id,this.gameForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/game-list');
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
    }
  else {
    this.loading=true;
      this.gameService.submit(this.gameForm.value).subscribe(response => {
        this.snackBar.open('Information Saved Successfully ', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-success'
        });
        this.router.navigateByUrl('/basic-setup/game-list');
      }, error => {
        this.validationErrors = error;
      })
    }
 
  }

}
