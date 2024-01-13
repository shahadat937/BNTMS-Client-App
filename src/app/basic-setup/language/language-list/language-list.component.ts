import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Language } from '../../models/Language';
import { LanguageService } from '../../service/language.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.sass']
})
export class LanguageListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Language[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText=""; 

  displayedColumns: string[] = ['ser', 'languageName','isActive', 'actions'];
  dataSource: MatTableDataSource<Language> = new MatTableDataSource();

  selection = new SelectionModel<Language>(true, []);

  constructor(private snackBar: MatSnackBar,private LanguageService: LanguageService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getLanguages();
  }
 
  getLanguages() {
    this.isLoading = true;
    this.LanguageService.getLanguages(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getLanguages();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getLanguages();
  } 

  deleteItem(row) {
    const id = row.languageId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Language Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.LanguageService.delete(id).subscribe(() => {
          this.getLanguages();
          this.snackBar.open('Language Information Deleted Successfully ', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    }) 
  }
}
