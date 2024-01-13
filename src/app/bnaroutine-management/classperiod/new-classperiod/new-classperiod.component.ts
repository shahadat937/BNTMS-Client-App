import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassPeriodService } from '../../service/classperiod.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { CourseNameService } from '../../../basic-setup/service/CourseName.service';
import { ClassPeriod } from '../../models/classperiod';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-new-classperiod',
  templateUrl: './new-classperiod.component.html',
  styleUrls: ['./new-classperiod.component.sass']
}) 
export class NewClassPeriodComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  courseNameId:number;
  ClassPeriodForm: FormGroup;
  validationErrors: string[] = [];
  selectedbaseschool:SelectedModel[];
  selectedcoursestatus:SelectedModel[];
  selectedcoursename:SelectedModel[];
  isShown: boolean = false ;
  GetPeriodListByParameter:ClassPeriod[];
  
  role:any;
  traineeId:any;
  branchId:any;
  baseSchoolId:any;

  options = [];
  filteredOptions;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['ser', 'periodName','bnaClassScheduleStatus','durationForm','durationTo', 'actions'];

  constructor(private snackBar: MatSnackBar,private authService: AuthService, private CourseNameService: CourseNameService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private ClassPeriodService: ClassPeriodService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('classPeriodId'); 

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)


    if (id) {
      this.pageTitle = 'Edit Class Period'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.ClassPeriodService.find(+id).subscribe(
        res => {
          this.ClassPeriodForm.patchValue({          
            classPeriodId:res.classPeriodId, 
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId:res.courseNameId, 
            periodName:res.periodName, 
            bnaClassScheduleStatusId:res.bnaClassScheduleStatusId, 
            durationForm:res.durationForm, 
            durationTo:res.durationTo,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
            course:res.courseName,
          }); 
          this.courseNameId = res.courseNameId;         
        }
      );
    } else {
      this.pageTitle = 'Create Class Period';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    if(this.role === 'Super Admin'){
      this.ClassPeriodForm.get('baseSchoolNameId').setValue(this.branchId);
     }
    this.getselectedbaseschools();
    this.getselectedbnaclassschedulestatus();
    this.getselectedcoursename();
  }
  intitializeForm() {
    this.ClassPeriodForm = this.fb.group({
      classPeriodId: [0],
      baseSchoolNameId:['',Validators.required],
      courseNameId:['',Validators.required],
      course:[''],
      periodName:['',Validators.required],
      bnaClassScheduleStatusId:['',Validators.required],
      durationForm:[],
      durationTo:[],
      menuPosition:[],
      status:[1],
      isActive: [true],    
    })
    this.ClassPeriodForm.get('course').valueChanges
    .subscribe(value => {
        this.getSelectedCourseAutocomplete(value);
       //console.log(this.courseDurationId+" "+this.courseNameId +" "+this.traineeId)
    })
  }
  
//autocomplete
onCourseSelectionChanged(item) {
  // console.log(item);
  this.courseNameId = item.value 
  this.ClassPeriodForm.get('courseNameId').setValue(item.value);
  this.ClassPeriodForm.get('course').setValue(item.text);
  this.onCourseSelectionChangeGetPeriodList()
}
getSelectedCourseAutocomplete(cName){
  this.CourseNameService.getSelectedCourseByName(cName).subscribe(response => {
    this.options = response;
    this.filteredOptions = response;
  })
}


  getselectedbaseschools(){
    this.ClassPeriodService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschool=res;
    });
  }

  onCourseSelectionChangeGetPeriodList(){
    var baseSchoolNameId=this.ClassPeriodForm.value['baseSchoolNameId'];
    var courseNameId=this.ClassPeriodForm.value['courseNameId'];
    console.log("after selecting course "+baseSchoolNameId +" -"+courseNameId);
    this.isShown=true;
    if(baseSchoolNameId != null && courseNameId != null){
      this.ClassPeriodService.getSelectedPeriodBySchoolAndCourse(baseSchoolNameId,courseNameId).subscribe(res=>{
        this.GetPeriodListByParameter=res;  
        console.log(this.GetPeriodListByParameter); 
      }); 
    }
  }
  
  getselectedbnaclassschedulestatus(){
    this.ClassPeriodService.getselectedbnaclassschedulestatus().subscribe(res=>{
      this.selectedcoursestatus=res;
    });
  }

  getselectedcoursename(){
    this.ClassPeriodService.getselectedcoursename().subscribe(res=>{
      this.selectedcoursename=res;
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }


  onSubmit() {
    const id = this.ClassPeriodForm.get('classPeriodId').value; 
    console.log(this.ClassPeriodForm.value);  
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.ClassPeriodService.update(+id,this.ClassPeriodForm.value).subscribe(response => {
            //this.router.navigateByUrl('/routine-management/add-classperiod');
            this.reloadCurrentRoute();
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
      this.ClassPeriodService.submit(this.ClassPeriodForm.value).subscribe(response => {
        //this.router.navigateByUrl('/routine-management/add-classperiod');
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

  deleteItem(row) {
    const id = row.classPeriodId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.ClassPeriodService.delete(id).subscribe(() => {
          this.onCourseSelectionChangeGetPeriodList();
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
}
