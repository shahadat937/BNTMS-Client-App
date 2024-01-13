import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { CourseModule } from '../../models/CourseModule';
import { CourseModuleService } from '../../service/CourseModule.service';
import { CourseNameService } from '../../service/CourseName.service';
import { MasterData } from 'src/assets/data/master-data';

@Component({
  selector: 'app-new-coursemodule',
  templateUrl: './new-coursemodule.component.html',
  styleUrls: ['./new-coursemodule.component.sass']
})
export class NewCourseModuleComponent implements OnInit {
  buttonText:string;
  pageTitle: string;
  destination:string;
  CourseModuleForm: FormGroup;
  validationErrors: string[] = [];
  selectedbaseschools:SelectedModel[];
  selectedcoursename:SelectedModel[];
  courseNameId:number;
  baseSchoolNameId:number;
  moduleList:CourseModule[];
   masterData = MasterData;
  loading = false;

  isShown: boolean = false ;
  options = [];

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  filteredOptions;


  displayedColumns: string[] = ['sl','moduleName', 'nameOfModule','menuPosition','actions'];

  constructor(private snackBar: MatSnackBar,private CourseNameService: CourseNameService,private CourseModuleService: CourseModuleService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseModuleId'); 
    if (id) {
      this.pageTitle = 'Edit Course Module';
      this.destination='Edit';
      this.buttonText="Update";
      this.CourseModuleService.find(+id).subscribe(
        res => {
          this.CourseModuleForm.patchValue({          

            courseModuleId: res.courseModuleId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId: res.courseNameId,
            moduleName: res.moduleName,
            nameOfModule:res.nameOfModule,
            course:res.courseName,
            menuPosition:res.menuPosition
          });  

       console.log(res.courseName)

          this.courseNameId = res.courseNameId;
          this.baseSchoolNameId = res.baseSchoolNameId;  
          this.isShown=true;
          this.CourseNameService.getCourseModuleListByBaseSchoolNameIdCourseNameId(this.baseSchoolNameId,this.courseNameId).subscribe(response => {
          this.moduleList = response;     
        }
      );
    })

    } 
    else {
      this.pageTitle = 'Create Course Module';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
    this.getselectedbaseschools();
    this.getselectedcoursename();
    //this.getCourseModuleListByBaseSchoolNameIdCourseNameId();
  }
  intitializeForm() {
    this.CourseModuleForm = this.fb.group({
      courseModuleId: [0],
      baseSchoolNameId: ['', Validators.required],
      courseNameId: ['', Validators.required],
      moduleName: ['', Validators.required],
      course:[''],
      nameOfModule:[''],
      menuPosition: [],
      // isActive: [true],
    })
    //autocomplete
    this.CourseModuleForm.get('course').valueChanges
    .subscribe(value => {
        this.getSelectedTraineeByPno(value);
    })
  }

  //autocomplete
  onTraineeSelectionChanged(item) {
   // console.log(item);
    this.courseNameId = item.value 
    this.CourseModuleForm.get('courseNameId').setValue(item.value);
    this.CourseModuleForm.get('course').setValue(item.text);
    this.baseSchoolNameId = this.CourseModuleForm.get('baseSchoolNameId').value;

      this.isShown=true;
    this.CourseNameService.getCourseModuleListByBaseSchoolNameIdCourseNameId(this.baseSchoolNameId,this.courseNameId).subscribe(response => {
      this.moduleList = response;
    })
}
//autocomplete
getSelectedTraineeByPno(pno){
  this.CourseNameService.getSelectedCourseByName(pno).subscribe(response => {
    this.options = response;
    this.filteredOptions = response;
  })
}

  getselectedbaseschools(){
    this.CourseModuleService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschools=res
    });
  }  
  getselectedcoursename(){
    this.CourseModuleService.getselectedcoursename().subscribe(res=>{
      this.selectedcoursename=res
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  deleteItem(row) {
    const id = row.courseModuleId; 
    console.log("khjkdfjksdjfkds");
    console.log(id)
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.CourseModuleService.delete(id).subscribe(() => {
       //   this.getBranchs();
       this.CourseNameService.getCourseModuleListByBaseSchoolNameIdCourseNameId(this.baseSchoolNameId,this.courseNameId).subscribe(response => {
        this.moduleList = response;
      })
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
  
  onSubmit() {
    const id = this.CourseModuleForm.get('courseModuleId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Course Module Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.CourseModuleService.update(+id,this.CourseModuleForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/add-coursemodule');
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
      this.CourseModuleService.submit(this.CourseModuleForm.value).subscribe(response => {
        //this.router.navigateByUrl('/basic-setup/add-coursemodule');
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
