import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { GuestSpeakerQuestionNameService } from '../../service/GuestSpeakerQuestionName.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { GuestSpeakerQuestionName } from '../../models/GuestSpeakerQuestionName';
import { Role } from 'src/app/core/models/role';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MasterData } from 'src/assets/data/master-data';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-new-guestspeakerquestionname',
  templateUrl: './new-guestspeakerquestionname.component.html',
  styleUrls: ['./new-guestspeakerquestionname.component.sass']
})
export class NewGuestSpeakerQuestionNameComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  GuestSpeakerQuestionNameForm: FormGroup;
  validationErrors: string[] = [];
  role:any;
  traineeId:any;
  branchId:any;
  userRole = Role;
  masterData = MasterData;
  isLoading = false;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl','name',  'actions'];
  dataSource: MatTableDataSource<GuestSpeakerQuestionName> = new MatTableDataSource();
  selection = new SelectionModel<GuestSpeakerQuestionName>(true, []);

  constructor(private snackBar: MatSnackBar,private authService: AuthService,private GuestSpeakerQuestionNameService: GuestSpeakerQuestionNameService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('guestSpeakerQuestionNameId'); 

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    if (id) {
      this.pageTitle = 'Edit Guest Speaker Question Name';
      this.destination='Edit';
      this.buttonText="Update";
      this.GuestSpeakerQuestionNameService.find(+id).subscribe(
        res => {
          this.GuestSpeakerQuestionNameForm.patchValue({          

            guestSpeakerQuestionNameId: res.guestSpeakerQuestionNameId,
            baseSchoolNameId :res.baseSchoolNameId,
            name: res.name,
            
          });          
        }
      );
    } else {
      this.pageTitle = 'Create uest Speaker Question Name';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
    if(this.role == this.userRole.SuperAdmin || this.userRole.SchoolOIC){
      this.GuestSpeakerQuestionNameForm.get('baseSchoolNameId').setValue(this.branchId);
     }
     this.getGuestSpeakerQuestionNames();
  }
  intitializeForm() {
    this.GuestSpeakerQuestionNameForm = this.fb.group({
      guestSpeakerQuestionNameId: [0],
      baseSchoolNameId:[''],
      name: [''],
      isActive: [true]
    
    })
  }
  getGuestSpeakerQuestionNames() {
    this.isLoading = true;
    this.GuestSpeakerQuestionNameService.getGuestSpeakerQuestionNameFiltered(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.branchId == '' ? 0 :this.branchId).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.filteredData.forEach((row) =>
          this.selection.select(row)
        );
  }
  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getGuestSpeakerQuestionNames();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getGuestSpeakerQuestionNames();
  } 
  deleteItem(row) {
    const id = row.guestSpeakerQuestionNameId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.GuestSpeakerQuestionNameService.delete(id).subscribe(() => {
          //this.getTdecActionStatuses();
          this.reloadCurrentRoute();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })
    
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  onSubmit() {
    const id = this.GuestSpeakerQuestionNameForm.get('guestSpeakerQuestionNameId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.GuestSpeakerQuestionNameService.update(+id,this.GuestSpeakerQuestionNameForm.value).subscribe(response => {
            this.router.navigateByUrl('/guest-speaker/add-guestspeakerquestionname');
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
      this.GuestSpeakerQuestionNameService.submit(this.GuestSpeakerQuestionNameForm.value).subscribe(response => {
        // this.router.navigateByUrl('/tguest-speaker/guestspeakerquestionname-list');
        this.reloadCurrentRoute();
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
