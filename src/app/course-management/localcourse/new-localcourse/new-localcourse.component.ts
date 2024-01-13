import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDurationService } from '../../service/courseduration.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { CourseNameService } from '../../../basic-setup/service/CourseName.service';

@Component({
  selector: 'app-new-localcourse',
  templateUrl: './new-localcourse.component.html',
  styleUrls: ['./new-localcourse.component.sass']
})
export class NewLocalcourseComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  CourseDurationForm: FormGroup;
  validationErrors: string[] = [];
  selectedcourse:SelectedModel[];
  selectedbaseschool:SelectedModel[];
  selectedcountry:SelectedModel[];
  selectedLocationType:SelectedModel[];
  selectedcoursetype:SelectedModel[];
  courseTypeId:string;
  selectedSchool:SelectedModel[];
  selectedBaseName:SelectedModel[];
  selectedbaseschoolfornbcd:SelectedModel[];
  courseNameId:number;

  options = [];
  filteredOptions;

  constructor(private snackBar: MatSnackBar,private CourseNameService: CourseNameService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private CourseDurationService: CourseDurationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseDurationId'); 
     this.courseTypeId= this.route.snapshot.paramMap.get('courseTypeId');  
     console.log(this.courseTypeId);
    if (id) {
      this.pageTitle = 'Edit Local Course'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.CourseDurationService.find(+id).subscribe(

        res => {
          console.log(res)
          this.CourseDurationForm.patchValue({          
            courseDurationId:res.courseDurationId,  
            courseNameId: res.courseNameId, 
            courseTitle:res.courseTitle, 
            baseSchoolNameId:res.baseSchoolNameId, 
            durationFrom:res.durationFrom, 
            durationTo:res.durationTo,
            professional:res.professional,
            nbcd:res.nbcd,
            remark:res.remark,
            courseTypeId:res.courseTypeId,
            countryId:res.countryId,
            baseNameId:res.baseNameId,
            isCompletedStatus:res.isCompletedStatus,
            // isApproved:res.isApproved,
            // approvedBy:res.approvedBy,
            noOfCandidates:res.noOfCandidates,
            status:res.status,
            menuPosition: res.menuPosition, 
            isActive: res.isActive,
            course:res.courseName,
            nbcdSchoolId:res.nbcdSchoolId
            
          });     
          this.courseNameId = res.courseNameId;  
          this.getselectedbasesName();
          this.onBaseNameSelectionChangeGetSchool(res.baseNameId);
          
        }
      );
    } else {
      this.pageTitle = 'Create Local Course';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedcoursename();
    this.getselectedbaseschools();
    this.getselectedcountry();
    this.getselectedcoursetype();
    this.getselectedbasesName();
    this.getselectedbaseschoolsfornbcd();
  }
  intitializeForm() {
    this.CourseDurationForm = this.fb.group({
      courseDurationId: [0],
      courseNameId:['',Validators.required],
      course:[''],
      courseTitle:['',Validators.required],
      baseSchoolNameId:['',Validators.required],
      baseNameId:[],
      durationFrom:[],
      durationTo:[],    
      professional:[''],
      nbcd:[''], 
      remark:[''],
      courseTypeId:[this.courseTypeId],
      countryId:[1],
      isCompletedStatus:[0],
      nbcdSchoolId:[''],
      // isApproved:[],
      // approvedBy:[],
      noOfCandidates:[''],
      status:[1],
      isActive: [true],    
    })
    this.CourseDurationForm.get('course').valueChanges
    .subscribe(value => {
     
        this.getSelectedCourseAutocomplete(value);
       //console.log(this.courseDurationId+" "+this.courseNameId +" "+this.traineeId)
    })
  }

  //autocomplete
  onCourseSelectionChanged(item) {
    // console.log(item);
    this.courseNameId = item.value 
    this.CourseDurationForm.get('courseNameId').setValue(item.value);
    this.CourseDurationForm.get('course').setValue(item.text);
  }
  getSelectedCourseAutocomplete(cName){
    this.CourseNameService.getSelectedCourseByNameAndType(this.courseTypeId,cName).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }
  
  getselectedbaseschoolsfornbcd(){
    this.CourseDurationService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschoolfornbcd=res
    });
  }

  getselectedbasesName(){
    let branchLevel = 3;
    this.CourseDurationService.getselectedBaseNamesForCourse(branchLevel).subscribe(res=>{
      this.selectedBaseName=res
      console.log(this.selectedBaseName);
    });
  }
  onBaseNameSelectionChangeGetSchool(baseNameId){
    this.CourseDurationService.getSelectedSchoolsForCourse(baseNameId).subscribe(res=>{
      this.selectedSchool=res
      console.log(this.selectedSchool);
    });
   }

  getselectedcoursename(){
    this.CourseDurationService.getCourseByType(this.courseTypeId).subscribe(res=>{
      this.selectedcourse=res
    });
  } 

  getselectedcoursetype(){
    this.CourseDurationService.getselectedcoursetype().subscribe(res=>{
      this.selectedcoursetype=res
    });
  } 

  getselectedbaseschools(){
    this.CourseDurationService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschool=res
    });
  }

  getselectedcountry(){
    this.CourseDurationService.getselectedcountry().subscribe(res=>{
      this.selectedcountry=res
    });
  }

  onSubmit() {
    const id = this.CourseDurationForm.get('courseDurationId').value;   
    console.log(this.CourseDurationForm.value)
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        //console.log(result);
        if (result) {
          this.loading = true;
          this.CourseDurationService.update(+id,this.CourseDurationForm.value).subscribe(response => {
            this.router.navigateByUrl('/course-management/localcourse-list');
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
      this.loading = true;
      this.CourseDurationService.submit(this.CourseDurationForm.value).subscribe(response => {
        this.router.navigateByUrl('/course-management/localcourse-list');
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
 
  }}
