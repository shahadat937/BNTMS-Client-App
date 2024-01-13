import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MigrationDocumentService } from '../../service/migrationdocument.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-migrationdocument',
  templateUrl: './new-migrationdocument.component.html',
  styleUrls: ['./new-migrationdocument.component.sass']
}) 
export class NewMigrationDocumentComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  MigrationDocumentForm: FormGroup;
  validationErrors: string[] = [];
  relationTypeValues:SelectedModel[]; 
  

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private MigrationDocumentService: MigrationDocumentService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('migrationDocumentId'); 
    if (id) {
      this.pageTitle = 'Edit Migration Document'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.MigrationDocumentService.find(+id).subscribe(
        res => {
          this.MigrationDocumentForm.patchValue({          
            migrationDocumentId:res.migrationDocumentId, 
            traineeId: res.traineeId, 
            courseDurationId:res.courseDurationId, 
            traineeNominationId:res.traineeNominationId, 
            relationTypeId:res.relationTypeId, 
            remarks:res.remarks,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Migration Document';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getRelationType();
  }
  intitializeForm() {
    this.MigrationDocumentForm = this.fb.group({
      migrationDocumentId: [0],
      traineeId:[],
      courseDurationId:[],
      traineeNominationId:[],
      relationTypeId:[],
      remarks:[''],
      status:[],
      isActive: [true],    
    })
  }
  
  getRelationType(){
    this.MigrationDocumentService.getselectedrelationtype().subscribe(res=>{
      this.relationTypeValues=res
    });
  }

 

  onSubmit() {
    const id = this.MigrationDocumentForm.get('migrationDocumentId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.MigrationDocumentService.update(+id,this.MigrationDocumentForm.value).subscribe(response => {
            this.router.navigateByUrl('/foreign-training/migrationdocument-list');
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
    }else {
      this.loading=true;
      this.MigrationDocumentService.submit(this.MigrationDocumentForm.value).subscribe(response => {
        this.router.navigateByUrl('/foreign-training/migrationdocument-list');
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
