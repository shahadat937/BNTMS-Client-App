import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { CourseSection } from '../../models/CourseSection';
import { CourseSectionService } from '../../service/CourseSection.service';
import { CourseNameService } from '../../service/CourseName.service';
import { MasterData } from 'src/assets/data/master-data'; 

@Component({
  selector: 'app-new-coursesection',
  templateUrl: './new-coursesection.component.html',
  styleUrls: ['./new-coursesection.component.sass']
})
export class NewCourseSectionComponent implements OnInit {
  buttonText :string;
  pageTitle : string;
  destination :string;
  CourseSectionForm : FormGroup;
  validationErrors: string[] = [];
  selectedbaseschools : SelectedModel[];
  selectedcoursename  : SelectedModel[];
  selectedbnacurriculamtype:SelectedModel[];
  courseNameId:number;
  baseSchoolNameId:number;
  BnaCurriculumTypeId :number;
  sectionList:CourseSection[];
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


  displayedColumns: string[] = ['sl','sectionName', 'sectionShortName','menuPosition','actions'];

  constructor(private snackBar: MatSnackBar,private CourseNameService: CourseNameService,private courseSectionService: CourseSectionService, private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseSectionId'); 
    if (id) {
      this.pageTitle = 'Edit Course Section';
      this.destination='Edit';
      this.buttonText="Update";
      this.courseSectionService.find(+id).subscribe(
        res => {
          this.CourseSectionForm.patchValue({          

            courseSectionId: res.courseSectionId,
            baseSchoolNameId: res.baseSchoolNameId,
            BnaCurriculumTypeId:res.BnaCurriculumTypeId  ,
            //curryculumType:res.curryculumType  ,
            courseNameId: res.courseNameId,
            sectionName: res.sectionName,
            sectionShortName:res.sectionShortName,
            course:res.courseName,
            menuPosition:res.menuPosition
          });  

          console.log(res.courseName)
          console.log(res)  
          console.log(res.baseSchoolNameId)   
          this.courseNameId = res.courseNameId;
          this.baseSchoolNameId = res.baseSchoolNameId;
          this.BnaCurriculumTypeId=res.BnaCurriculumTypeId;  
          this.isShown=true;
          this.courseSectionService.getCourseSectionListByBaseSchoolNameIdCourseNameId(this.baseSchoolNameId,this.courseNameId).subscribe(response => {
            this.sectionList = response;     
          }
        );
      })
    } 
    else {
      this.pageTitle = 'Create Course Section';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
    this.getselectedbaseschools();
    this.getselectedcoursename();
    this.getbnacurriculamtype(); 
    //this.getCourseModuleListByBaseSchoolNameIdCourseNameId();
  }
  intitializeForm() {
    this.CourseSectionForm = this.fb.group({
      courseSectionId: [0],
      baseSchoolNameId: ['', Validators.required],
      courseNameId: ['', Validators.required],
      sectionName: ['', Validators.required],
      BnaCurriculumTypeId :[''],
      course:[''],
      sectionShortName:[''],
      menuPosition: [],
      // isActive: [true],
    })
    //autocomplete
    this.CourseSectionForm.get('course').valueChanges
    .subscribe(value => {
        this.getSelectedTraineeByPno(value);
    })
  }

  //autocomplete
  onTraineeSelectionChanged(item) {
   // console.log(item);
    this.courseNameId = item.value 
    this.CourseSectionForm.get('courseNameId').setValue(item.value);
    this.CourseSectionForm.get('course').setValue(item.text);
    this.baseSchoolNameId = this.CourseSectionForm.get('baseSchoolNameId').value;

      this.isShown=true;
    this.courseSectionService.getCourseSectionListByBaseSchoolNameIdCourseNameId(this.baseSchoolNameId,this.courseNameId).subscribe(response => {
      this.sectionList = response;
    })
}

getbnacurriculamtype(){
  this.courseSectionService.getselectedbnacurriculamtype().subscribe(response=>{
    this.selectedbnacurriculamtype=response;     
  });
}

//autocomplete
getSelectedTraineeByPno(pno){
  this.CourseNameService.getSelectedCourseByName(pno).subscribe(response => {
    this.options = response;
    this.filteredOptions = response;
  })
}

  getselectedbaseschools(){
    this.courseSectionService.getselectedbaseschools().subscribe(res=>{
      
      this.selectedbaseschools=res
    });
  }  
  
  getselectedcoursename(){
    this.courseSectionService.getselectedcoursename().subscribe(res=>{
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
    const id = row.courseSectionId; 
    console.log(id)
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.courseSectionService.delete(id).subscribe(() => {
       //   this.getBranchs();
       this.courseSectionService.getCourseSectionListByBaseSchoolNameIdCourseNameId(this.baseSchoolNameId,this.courseNameId).subscribe(response => {
        this.sectionList = response;
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
    const id = this.CourseSectionForm.get('courseSectionId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Course Module Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.courseSectionService.update(+id,this.CourseSectionForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/add-coursesection');
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
      this.courseSectionService.submit(this.CourseSectionForm.value).subscribe(response => {
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
