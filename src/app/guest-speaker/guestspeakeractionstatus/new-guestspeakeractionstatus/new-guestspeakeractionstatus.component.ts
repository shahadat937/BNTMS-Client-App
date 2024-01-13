import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { GuestSpeakerActionStatusService } from '../../service/GuestSpeakerActionStatus.service';
import { MasterData } from 'src/assets/data/master-data';
import { GuestSpeakerActionStatus } from '../../models/GuestSpeakerActionStatus';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-new-guestspeakeractionstatus',
  templateUrl: './new-guestspeakeractionstatus.component.html',
  styleUrls: ['./new-guestspeakeractionstatus.component.sass']
})
export class NewGuestSpeakerActionStatusComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  GuestSpeakerActionStatusForm: FormGroup;
  validationErrors: string[] = [];
  masterData = MasterData;
  isLoading = false;
  isShown: boolean = false ;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl','name', 'mark', 'actions'];
  dataSource: MatTableDataSource<GuestSpeakerActionStatus> = new MatTableDataSource();

  selection = new SelectionModel<GuestSpeakerActionStatus>(true, []);

  constructor(private snackBar: MatSnackBar,private GuestSpeakerActionStatusService: GuestSpeakerActionStatusService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('guestSpeakerActionStatusId'); 
    if (id) {
      this.pageTitle = 'Edit Guest Speaker Action Status';
      this.destination='Edit';
      this.buttonText="Update";
      this.GuestSpeakerActionStatusService.find(+id).subscribe(
        res => {
          this.GuestSpeakerActionStatusForm.patchValue({          

            guestSpeakerActionStatusId: res.guestSpeakerActionStatusId,
            name: res.name,
            mark: res.mark
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Guest Speaker Action Status';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
    this.getGuestSpeakerActionStatuses();
  }
  intitializeForm() {
    this.GuestSpeakerActionStatusForm = this.fb.group({
      guestSpeakerActionStatusId: [0],
      name: [''],
      mark: [''],
      isActive: [true]
    
    })
  }
  getGuestSpeakerActionStatuses() {
    this.isLoading = true;
    this.GuestSpeakerActionStatusService.getGuestSpeakerActionStatuses(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      console.log(this.dataSource.data)
      console.log("dataSource.data")
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
    this.getGuestSpeakerActionStatuses();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getGuestSpeakerActionStatuses();
  } 


  deleteItem(row) {
    const id = row.guestSpeakerActionStatusId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.GuestSpeakerActionStatusService.delete(id).subscribe(() => {
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
    const id = this.GuestSpeakerActionStatusForm.get('guestSpeakerActionStatusId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.GuestSpeakerActionStatusService.update(+id,this.GuestSpeakerActionStatusForm.value).subscribe(response => {
            this.router.navigateByUrl('/guest-speaker/add-guestspeakeractionstatus');
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
      this.GuestSpeakerActionStatusService.submit(this.GuestSpeakerActionStatusForm.value).subscribe(response => {
        // this.router.navigateByUrl('/guest-speaker/guestspeakeractionstatus-list');
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
