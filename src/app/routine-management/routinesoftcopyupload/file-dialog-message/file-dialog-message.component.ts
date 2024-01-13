import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Inject } from '@angular/core';

@Component({
  selector: 'app-file-dialog-message',
  templateUrl: './file-dialog-message.component.html',
  styleUrls: ['./file-dialog-message.component.sass']
})
export class FileDialogMessageComponent implements OnInit {
  isLoading = false;
  searchText="";

  displayedColumns: string[] = ['sl', 'nameOfItem','availableQty'];
  
  constructor(public dialogRef: MatDialogRef<FileDialogMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
    onNoClick(): void {
      this.dialogRef.close();
    }
  ngOnInit() {

  }
}
