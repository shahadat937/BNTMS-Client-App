import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../../service/Board.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.sass']
})
export class NewBoardComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  BoardForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private BoardService: BoardService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('boardId'); 
    if (id) {
      this.pageTitle = 'Edit Board';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.BoardService.find(+id).subscribe(
        res => {
          this.BoardForm.patchValue({          

            boardId: res.boardId,
            boardName: res.boardName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Board';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BoardForm = this.fb.group({
      boardId: [0],
      boardName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BoardForm.get('boardId').value;  
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.BoardService.update(+id,this.BoardForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/board-list');
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
    }  else {
      this.loading=true;
      this.BoardService.submit(this.BoardForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/board-list');
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
