import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/User.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { BaseSchoolNameService } from '../../service/BaseSchoolName.service';
import {RoleService} from '../../service/role.service'
import { MasterData } from 'src/assets/data/master-data';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.sass']
})
export class NewUserComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  pageTitle: string;
  destination:string;
  UserForm: FormGroup;
  buttonText:string;
  hide1 = true;
  hide2 = true;
  validationErrors: string[] = [];
  roleValues:SelectedModel[]; 
  branchValues:SelectedModel[]; 
  selectedOrganization:SelectedModel[];
  selectedCommendingArea:SelectedModel[];
  selectedBaseName:SelectedModel[];
  selectedSchoolName:SelectedModel[];
  organizationId:any;
  commendingAreaId:any;
  baseNameId:any;
  schoolNameId:any;
  isEdit:boolean=false;

  options = [];
  filteredOptions;

  constructor(private snackBar: MatSnackBar,private RoleService: RoleService,private BaseSchoolNameService: BaseSchoolNameService,private confirmService: ConfirmService,private UserService: UserService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('userId'); 
   console.log("id");
   console.log(id);
    if (id) {
      this.pageTitle = 'Edit User';
      this.destination = "Edit";
      this.buttonText= "Update";
      this.isEdit=true;
      this.UserService.find(id).subscribe(
     
        res => {
          console.log(res);
          this.UserForm.patchValue({          

            id: res.id,
            userName: res.userName,
          //  menuPosition: res.menuPosition,
            roleName: res.roleName,
            password: 'Admin@123',
            confirmPassword: 'Admin@123',          
            firstName : res.firstName,
            lastName : res.lastName,
            firstLevel : res.firstLevel,
            secondLevel : res.secondLevel,
            thirdLevel : res.thirdLevel,
            fourthLevel : res.fourthLevel,
            phoneNumber : res.phoneNumber,
            email : res.email,          
          
          });   
          console.log(this.UserForm.value); 
          // this.getSelectedOrganization();  
          this.onOrganizationSelectionChangeGetCommendingArea();
      
          this.onCommendingAreaSelectionChangeGetBaseName();
          this.onBaseNameSelectionChangeGetBaseSchoolName();       
        }
      );

      
     
    // console.log(this.UserForm.value);  
     

    } else {
      this.pageTitle = 'Create User';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.onOrganizationSelectionChangeGetCommendingArea();
    this.getRoleName();
  }

  intitializeForm() {
    this.UserForm = this.fb.group({
      id: [0],
      userName: ['', Validators.required],
      roleName: ['', Validators.required],
      // password:[],
      // confirmPassword:[],
      // password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), Validators.maxLength(20)]],
      // confirmPassword: ['', [Validators.required,this.matchValues('password')]],
      // firstName: ['', Validators.required],
      // lastName:['', Validators.required],
      password: ['Admin@123'],
      confirmPassword: ['Admin@123'],
      firstName: ['na'],
      lastName:['na'],
      firstLevel:[this.masterData.UserLevel.navy],
      secondLevel:['',Validators.nullValidator],
      thirdLevel:['',Validators.nullValidator],    
      fourthLevel:['',Validators.nullValidator],    
      phoneNumber : ['', Validators.required],
      email : ['', Validators.required],


       traineeId:[''],
       //trainee:[''],
  
     
    })
    // this.UserForm.get('trainee').valueChanges
    // .subscribe(value => {
     
    //     this.getSelectedTraineeAutocomplete(value);
    //    //console.log(this.courseDurationId+" "+this.courseNameId +" "+this.traineeId)
    // })
  }

  //autocomplete
  // onTraineeSelectionChanged(item) {
   
  //   this.UserForm.get('traineeId').setValue(item.value);
  //   this.UserForm.get('trainee').setValue(item.text);
  // }
  // getSelectedTraineeAutocomplete(pno){
  //   this.UserService.getSelectedTraineeByPno(pno).subscribe(response => {
  //     this.options = response;
  //     this.filteredOptions = response;
  //   })
  // }
  
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }

  getRoleName(){
    this.RoleService.getselectedrole().subscribe(res=>{
      this.roleValues=res
      console.log(this.roleValues);
    });
  }

  getSelectedOrganization(){
    this.BaseSchoolNameService.getSelectedOrganization().subscribe(res=>{
      this.selectedOrganization=res
      console.log(this.selectedOrganization);
    });
  }

  onOrganizationSelectionChangeGetCommendingArea(){
    this.organizationId=this.UserForm.value['firstLevel'];
    console.log(this.organizationId)    
    this.BaseSchoolNameService.getSelectedCommendingArea(this.organizationId).subscribe(res=>{
      this.selectedCommendingArea=res
      console.log(this.selectedCommendingArea);
    });        
  }
  
  onCommendingAreaSelectionChangeGetBaseName(){
    this.commendingAreaId=this.UserForm.value['secondLevel'];
    console.log(this.commendingAreaId);
    this.BaseSchoolNameService.getSelectedBaseName(this.commendingAreaId).subscribe(res=>{
      this.selectedBaseName=res
      console.log(this.selectedBaseName);
    });  
    //this.getBaseNameList(this.commendingAreaId);
            
  }
  onBaseNameSelectionChangeGetBaseSchoolName(){
    this.baseNameId=this.UserForm.value['thirdLevel'];
    console.log(this.baseNameId);
    this.BaseSchoolNameService.getSelectedSchoolName(this.baseNameId).subscribe(res=>{
      this.selectedSchoolName=res
      console.log(this.selectedBaseName);
    }); 
  }

  
  onSubmit() {
    const id = this.UserForm.get('id').value;  
    //const id = this.route.snapshot.paramMap.get('userId');   
    console.log(id); 
     
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        //console.log(result);
        if (result) {
          this.loading=true;
          console.log(id);
          this.UserService.update(id,this.UserForm.value).subscribe(response => {
            this.router.navigateByUrl('/security/user-list');
            this.snackBar.open('User Updated Successfully ', '', {
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
      this.UserService.submit(this.UserForm.value).subscribe(response => {
        this.router.navigateByUrl('/security/user-list');
        this.snackBar.open('User Created Successfully ', '', {
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
