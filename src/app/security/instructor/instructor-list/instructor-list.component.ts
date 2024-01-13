import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/User';
import { UserService } from '../../service/User.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Role } from '../../../core/models/role';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.sass']
})
export class InstructorListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  allRole : Role;
  ELEMENT_DATA: User[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: 100,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'userName','email','phoneNumber','roleName', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  InstructorForm: FormGroup;


  selection = new SelectionModel<User>(true, []);
  
  constructor(private snackBar: MatSnackBar,private UserService: UserService,private fb: FormBuilder,private router: Router,private confirmService: ConfirmService) { }
  // ngOnInit() {
  //   this.dataSource2.paginator = this.paginator;
  // }
  ngOnInit() {
    this.getInstructors();
    this.intitializeForm();
   // this.refresh();
  }
 
  getInstructors() {
    this.isLoading = true;
    this.UserService.getInstructors(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
    this.dataSource.data = response.items; 
    this.paging.length = response.totalItemsCount    
    this.isLoading = false;
    console.log(response.items)

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
  addNew(){
    
  }
  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getInstructors();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getInstructors();
  } 


  deleteItem(row) {
    const id = row.id; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.UserService.delete(id).subscribe(() => {
          this.getInstructors();
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

  intitializeForm() {
    this.InstructorForm = this.fb.group({
      id: [0],
      userName: ['', Validators.required],
      roleName: [''],
      // password:[],
      // confirmPassword:[],
      password: ['Admin@123'],
      confirmPassword: ['Admin@123'],
      firstName: [''],
      lastName:[''],
      phoneNumber : ['', Validators.required],
      email : ['', Validators.required],
      traineeId:[]

    })
  }

  PasswordUpdate(row) {
    const id = row.id; 
    this.confirmService.confirm('Confirm Update message', 'Are You Sure Resetting This  User Password?').subscribe(result => {
      //console.log(result);
      if (id) {
        this.UserService.find(id).subscribe(
          res => {
            console.log(res);
            this.InstructorForm.patchValue({          
  
              id: res.id,
              userName: res.userName,            
              roleName: res.roleName,         
              firstName : res.firstName,
              lastName : res.lastName,
              phoneNumber : res.phoneNumber,
              email : res.email,   
              traineeId:res.traineeId     
            
            });   
            console.log("form value of ",id); 
            console.log(this.InstructorForm.value);
            this.UserService.resetPassword(id,this.InstructorForm.value).subscribe(response => {
              // this.router.navigateByUrl('/security/instructor-list');
              //vaiya eta theke ami password nicchi
              this.getInstructors();
              this.snackBar.open('Password Reseted Successfully ', '', {
                duration: 2000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                panelClass: 'snackbar-success'
              });
            })
            
          }
        );        
      }
    })
    
  }

  ShiftRoleOfItem(row) {
    const id = row.id; 
    this.confirmService.confirm('Confirm Update message', 'Are You Sure Switch This  User?').subscribe(result => {
      //console.log(result);
      if (id) {
        this.UserService.find(id).subscribe(
          res => {
            console.log(res);
            this.InstructorForm.patchValue({          
  
              id: res.id,
              userName: res.userName,            
              roleName: res.roleName,         
              firstName : res.firstName,
              lastName : res.lastName,
              phoneNumber : res.phoneNumber,
              email : res.email,   
              traineeId:res.traineeId     
            
            });   
            console.log("form value of ",id); 
            this.changeRole();
          }
        );
        
      }
    })
    
  }

  changeRole(){
    var userId = this.InstructorForm.get('id').value; 
    var currentRole = this.InstructorForm.get('roleName').value; 
    console.log("Role name ",currentRole); 
    //console.log(this.InstructorForm.value); 
    if( currentRole == 'Instructor'){
      this.InstructorForm.get('roleName').setValue('Student');
    }else if( currentRole == 'Student'){
      this.InstructorForm.get('roleName').setValue('Instructor');
    }
    console.log(this.InstructorForm.value);
    
    this.UserService.update(userId,this.InstructorForm.value).subscribe(response => {
      // this.router.navigateByUrl('/security/instructor-list');
      this.getInstructors();
      this.snackBar.open('Information Updated Successfully ', '', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: 'snackbar-success'
      });
    })
  }
}
