import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseNameService } from '../../service/CourseName.service';
import { ConfirmService } from '../../../core/service/confirm.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-new-coursename',
  templateUrl: './new-coursename.component.html',
  styleUrls: ['./new-coursename.component.sass']
})
export class NewCourseNameComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  CourseNameForm: FormGroup;
  validationErrors: string[] = [];
  selectedCourseType:SelectedModel[]; 

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CourseNameService: CourseNameService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseNameId'); 
    if (id) {
      this.pageTitle = 'Edit Course Name';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.CourseNameService.find(+id).subscribe(
        res => {
          this.CourseNameForm.patchValue({          

            courseNameId: res.courseNameId,
            course: res.course,
            shortName:res.shortName,
            courseSyllabus:res.courseSyllabus,
            courseTypeId:res.courseTypeId
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Course Name';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
    this.getSelectedCourseName();
  }
  intitializeForm() {
    this.CourseNameForm = this.fb.group({
      courseNameId: [0],
      course: ['', Validators.required],
      shortName:[''],
      courseSyllabus:[''],
      doc: [''],
      courseTypeId:[''],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.CourseNameForm.patchValue({
        doc: file,
      });
    }
  }

  
  getSelectedCourseName(){
    this.CourseNameService.getSelectedCourseName().subscribe(res=>{
      this.selectedCourseType=res
      console.log(this.selectedCourseType);
    });
  }

  onSubmit() {
    const id = this.CourseNameForm.get('courseNameId').value;  
    const formData = new FormData();
    for (const key of Object.keys(this.CourseNameForm.value)) {
      const value = this.CourseNameForm.value[key];
      formData.append(key, value);
    } 
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.CourseNameService.update(+id,formData).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/coursename-list');
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
      this.CourseNameService.submit(formData).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/coursename-list');
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
