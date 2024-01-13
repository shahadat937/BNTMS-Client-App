import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WithdrawnTypeService } from '../../service/WithdrawnType.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';
import { WithdrawnType } from '../../models/WithdrawnType';
import { PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-new-withdrawntype',
  templateUrl: './new-withdrawntype.component.html',
  styleUrls: ['./new-withdrawntype.component.sass']
})
export class NewWithdrawnTypeComponent implements OnInit {
  masterData = MasterData;
  loading = false;
  pageTitle: string;
  destination:string;
  WithdrawnTypeForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'name','shortName', 'menuPosition','actions']
  dataSource: MatTableDataSource<WithdrawnType> = new MatTableDataSource();
  selection = new SelectionModel<WithdrawnType>(true, []);
  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private WithdrawnTypeService: WithdrawnTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('withdrawnTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Withdrawn Type';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.WithdrawnTypeService.find(+id).subscribe(
        res => {
          this.WithdrawnTypeForm.patchValue({          

            withdrawnTypeId: res.withdrawnTypeId,
            name: res.name,
            shortName: res.shortName,
            menuPosition:res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Withdrawn Type';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getWithdrawnTypes();
  }
  intitializeForm() {
    this.WithdrawnTypeForm = this.fb.group({
      withdrawnTypeId: [0],
      name: [''],
      shortName: [''],
      menuPosition:[''],
      isActive: [true],
    
    })
  }
  getWithdrawnTypes() {
    this.isLoading = true;
    this.WithdrawnTypeService.getWithdrawnTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
    this.dataSource.data = response.items; 
    this.paging.length = response.totalItemsCount    
    this.isLoading = false;
    })
  }
  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getWithdrawnTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getWithdrawnTypes();
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
  deleteItem(row) {
    const id = row.withdrawnTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.WithdrawnTypeService.delete(id).subscribe(() => {
          this.getWithdrawnTypes();
          this.snackBar.open('Information Delete Successfully ', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })     
  }

  onSubmit() {
    const id = this.WithdrawnTypeForm.get('withdrawnTypeId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.WithdrawnTypeService.update(+id,this.WithdrawnTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/add-withdrawntype');
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
      this.WithdrawnTypeService.submit(this.WithdrawnTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/add-withdrawntype');
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
