import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseSchoolNameService } from '../../service/BaseSchoolName.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { BaseSchoolName } from '../../models/BaseSchoolName';
import { MasterData } from 'src/assets/data/master-data';

@Component({
  selector: 'app-new-schoolname',
  templateUrl: './new-schoolname.component.html',
  styleUrls: ['./new-schoolname.component.sass']
})
export class NewSchoolNameComponent implements OnInit {
  pageTitle: string;
  destination:string;
  btnText:string;
   masterData = MasterData;
  loading = false;
  BaseSchoolForm: FormGroup;
  baseSchoolList: BaseSchoolName[];
  validationErrors: string[] = [];
  selectedOrganization:SelectedModel[];
  selectedCommendingArea:SelectedModel[];
  selectedBaseName:SelectedModel[];
  organizationId:any;
  commendingAreaId:any;
  baseNameId:any;
  isShown:boolean=false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = [ 'ser','schoolLogo', 'schoolName', 'shortName',  'actions'];

  constructor(private snackBar: MatSnackBar,private BaseSchoolNameService: BaseSchoolNameService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService:ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    if (id) {
      this.pageTitle = 'Edit Base School';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.BaseSchoolNameService.find(+id).subscribe(
        res => {
          this.BaseSchoolForm.patchValue({          
            
            baseSchoolNameId: res.baseSchoolNameId,
            schoolName: res.schoolName,
            shortName: res.shortName,
            schoolLogo: res.schoolLogo,
            //status: res.status,
            //menuPosition:res.menuPosition,
            isActive: res.isActive,
            contactPerson: res.contactPerson,
            address: res.address,
            telephone: res.telephone,
            cellphone: res.cellphone,
            email: res.email,
            fax: res.fax,
            branchLevel: res.branchLevel,
            firstLevel: res.firstLevel,
            secondLevel: res.secondLevel,
            thirdLevel: res.thirdLevel,
            fourthLevel: res.fourthLevel,
            //fifthLevel: res.fifthLevel,
            serverName: res.serverName,
            schoolHistory: res.schoolHistory,
          
          });
          this.onOrganizationSelectionChangeGetCommendingArea();   
          this.onCommendingAreaSelectionChangeGetBaseName();       
        }
      );
    } else {
      this.pageTitle = 'Create Base School';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
    //this.getOrganizationList();
    this.onOrganizationSelectionChangeGetCommendingArea(); 
  }

  

  // getSelectedOrganization(){
  //   this.BaseSchoolNameService.getSelectedOrganization().subscribe(res=>{
  //     this.selectedOrganization=res
  //     console.log(this.selectedOrganization);
  //   });
  // }

  onOrganizationSelectionChangeGetCommendingArea(){
    this.organizationId=this.BaseSchoolForm.value['firstLevel'];
    console.log(this.organizationId)    
    this.BaseSchoolNameService.getSelectedCommendingArea(this.organizationId).subscribe(res=>{
      this.selectedCommendingArea=res
      console.log(this.selectedCommendingArea);
    });        
  }
  
  onCommendingAreaSelectionChangeGetBaseName(){
    this.baseNameId=this.BaseSchoolForm.value['secondLevel'];
    console.log(this.baseNameId);
    this.BaseSchoolNameService.getSelectedBaseName(this.baseNameId).subscribe(res=>{
      this.selectedBaseName=res
      console.log(this.selectedBaseName);
    });  
    //this.getBaseNameList(this.commendingAreaId);
            
  }
  
  onBaseNameSelectionChangeGetBaseSchoolList(){
    this.baseNameId=this.BaseSchoolForm.value['thirdLevel'];
    console.log(this.baseNameId);
    this.getBaseSchoolList(this.baseNameId);
            
  }

  getBaseSchoolList(baseNameId){
    this.isShown=true;
    this.BaseSchoolNameService.getBaseSchoolList(baseNameId).subscribe(res=>{
      this.baseSchoolList=res
      console.log(this.baseSchoolList);
    });
  }
  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('ImagE')
     console.log(file);
      this.BaseSchoolForm.patchValue({
        image: file,
      });
    }
  }
  intitializeForm() {
    this.BaseSchoolForm = this.fb.group({
      
      baseSchoolNameId: [0],
      schoolName: [''],
      shortName: [''],
      schoolLogo: [''],
      image:[''],
      status: [''],
      menuPosition: [''],
      isActive: [true],
      contactPerson: [],
      address: [],
      telephone: [],
      cellphone: [],
      email: [],
      fax: [],
      branchLevel: [4],
      firstLevel: [this.masterData.UserLevel.navy],
      secondLevel: [""],
      thirdLevel: [""],
      fourthLevel: [""],
      fifthLevel: [""],
      serverName: [],
      schoolHistory: [''],
    
    })
  }
  
  onSubmit() {
    const id = this.BaseSchoolForm.get('baseSchoolNameId').value;
    //console.log(id);
    const formData = new FormData();
    for (const key of Object.keys(this.BaseSchoolForm.value)) {
      const value = this.BaseSchoolForm.value[key];
      formData.append(key, value);
    }
    console.log(formData)
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BaseSchoolNameService.update(+id,formData).subscribe(response => {
            this.router.navigateByUrl('/security/new-baseschool');
            this.getBaseSchoolList(this.baseNameId);
            this.BaseSchoolForm.reset();
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
      this.BaseSchoolNameService.submit(formData).subscribe(response => {
        //this.router.navigateByUrl('/basic-setup/baseschoolname-list');
        this.getBaseSchoolList(this.baseNameId);
        this.BaseSchoolForm.reset();
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

  deleteItem(row) {
    const id = row.baseSchoolNameId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.BaseSchoolNameService.delete(id).subscribe(() => {
          this.getBaseSchoolList(this.baseNameId);
          this.snackBar.open('Information Deleted Successfully ', '', {
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
