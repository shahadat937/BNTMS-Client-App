import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/User.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { BaseSchoolNameService } from '../../service/BaseSchoolName.service';
import {RoleService} from '../../service/role.service'

@Component({
  selector: 'app-new-instructor',
  templateUrl: './new-instructor.component.html',
  styleUrls: ['./new-instructor.component.sass']
})
export class NewInstructorComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  InstructorForm: FormGroup;
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
      this.pageTitle = 'Edit Instructor';
      this.destination = "Edit";
      this.buttonText= "Update";
      this.isEdit=true;
      this.UserService.find(id).subscribe(
        res => {
          console.log(res);
          this.InstructorForm.patchValue({          

            id: res.id,
            userName: res.userName,
          //  menuPosition: res.menuPosition,
            roleName: res.roleName,
            password: res.password,
            confirmPassword: res.confirmPassword,          
            firstName : res.firstName,
            lastName : res.lastName,
            firstLevel : res.firstLevel,
            secondLevel : res.secondLevel,
            thirdLevel : res.thirdLevel,
            fourthLevel : res.fourthLevel,
            phoneNumber : res.phoneNumber,
            email : res.email,   
            traineeId:res.traineeId,
            trainee:res.traineeName,       
          
          });   
          console.log(this.InstructorForm.value); 
          this.getSelectedOrganization();  
          this.onOrganizationSelectionChangeGetCommendingArea();
      
          this.onCommendingAreaSelectionChangeGetBaseName();
          this.onBaseNameSelectionChangeGetBaseSchoolName();       
        }
      );
    } else {
      this.pageTitle = 'Create Instructor';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getSelectedOrganization();
    this.getRoleName();
  }

  intitializeForm() {
    this.InstructorForm = this.fb.group({
      id: [0],
      userName: ['', Validators.required],
      roleName: [''],
      // password:[],
      // confirmPassword:[],
      password: ['Admin@123'],
      confirmPassword: ['Admin@123'],
      firstName: ['na'],
      lastName:['na'],
      phoneNumber : ['', Validators.required],
      email : ['', Validators.required],
      traineeId:[],
      trainee:[''],
      firstLevel:['',Validators.nullValidator],
      secondLevel:['',Validators.nullValidator],
      thirdLevel:['',Validators.nullValidator],    
      fourthLevel:['',Validators.nullValidator]

    })
    this.InstructorForm.get('trainee').valueChanges
    .subscribe(value => {
     
        this.getSelectedTraineeAutocomplete(value);
       //console.log(this.courseDurationId+" "+this.courseNameId +" "+this.traineeId)
    })
  }

  //autocomplete
  onTraineeSelectionChanged(item) {
    // console.log(item);
    //this.courseNameId = item.value 
    this.InstructorForm.get('traineeId').setValue(item.value);
    this.InstructorForm.get('trainee').setValue(item.text);
  }
  getSelectedTraineeAutocomplete(pno){
    this.UserService.getSelectedTraineeByPno(pno).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }
  
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }

  getRoleName(){
    this.RoleService.getselectedrolesForTrainee().subscribe(res=>{
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
    this.organizationId=this.InstructorForm.value['firstLevel'];
    console.log(this.organizationId)    
    this.BaseSchoolNameService.getSelectedCommendingArea(this.organizationId).subscribe(res=>{
      this.selectedCommendingArea=res
      console.log(this.selectedCommendingArea);
    });        
  }
  
  onCommendingAreaSelectionChangeGetBaseName(){
    this.commendingAreaId=this.InstructorForm.value['secondLevel'];
    console.log(this.commendingAreaId);
    this.BaseSchoolNameService.getSelectedBaseName(this.commendingAreaId).subscribe(res=>{
      this.selectedBaseName=res
      console.log(this.selectedBaseName);
    });  
    //this.getBaseNameList(this.commendingAreaId);
            
  }
  onBaseNameSelectionChangeGetBaseSchoolName(){
    this.baseNameId=this.InstructorForm.value['thirdLevel'];
    console.log(this.baseNameId);
    this.BaseSchoolNameService.getSelectedSchoolName(this.baseNameId).subscribe(res=>{
      this.selectedSchoolName=res
      console.log(this.selectedBaseName);
    }); 
  }

  
  onSubmit() {
    const id = this.InstructorForm.get('id').value;  
    console.log(this.InstructorForm.value); 
    if (id) {
      this.InstructorForm.get('password').setValue('Admin@123');
      this.InstructorForm.get('confirmPassword').setValue('Admin@123');

      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        //console.log(result);
        if (result) {
          this.loading=true;
          this.UserService.update(id,this.InstructorForm.value).subscribe(response => {
            this.router.navigateByUrl('/security/instructor-list');
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
      this.UserService.submit(this.InstructorForm.value).subscribe(response => {
        this.router.navigateByUrl('/security/instructor-list');
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
