import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDurationService } from '../../service/courseduration.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { CourseNameService } from 'src/app/basic-setup/service/CourseName.service';
import { OrganizationNameService } from 'src/app/basic-setup/service/organizationname.service';
import { CourseDuration } from '../../models/courseduration';

@Component({
  selector: 'app-new-interservicecourse',
  templateUrl: './new-interservicecourse.component.html',
  styleUrls: ['./new-interservicecourse.component.sass']
})
export class NewInterservicecourseComponent implements OnInit {
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
  interServiceList: CourseDuration[];
  isShown: boolean = false;
  courseTypeId:19;
  getInterServiceCourseByParameters: CourseDuration[];
  courseNameId:number;
  organizationNameId:number;
  selectedcoursename:SelectedModel[];
  selectedorganizationname:SelectedModel[];

  options = [];
  filteredOptions;
  //option = [];
  //filtere;

  displayedColumns: string[] = ['ser', 'courseName', 'organizationName', 'durationFrom','durationTo','isCompletedStatus', 'actions'];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  constructor(private snackBar: MatSnackBar,private OrganizationNameService: OrganizationNameService,private CourseNameService: CourseNameService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private CourseDurationService: CourseDurationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseDurationId'); 
     
    if (id) {
      this.pageTitle = 'Edit Interservice Course'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.CourseDurationService.find(+id).subscribe(
        res => {
          this.CourseDurationForm.patchValue({          
            courseDurationId:res.courseDurationId, 
            courseNameId: res.courseNameId, 
            courseTitle:res.courseTitle, 
            baseSchoolNameId:res.baseSchoolNameId, 
            durationFrom:res.durationFrom, 
            durationTo:res.durationTo,
            professional:res.durationTo,
            nbcd:res.nbcd,
            remark:res.remark,
            courseTypeId:res.courseTypeId,
            countryId:res.countryId,
            baseNameId:res.baseNameId,
            organizationNameId:res.organizationNameId,
            status:res.status,
            isCompletedStatus:res.isCompletedStatus,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
            course:res.courseName,
            name:res.organizationName,
          });     
          this.courseNameId = res.courseNameId; 
          this.organizationNameId=res.organizationNameId;
        }
      );
    } else {
      this.pageTitle = 'Create Interservice Course'; 
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedcoursename();
    this.getselectedOrganizationName();
    this.getselectedcoursetype();
  }
  intitializeForm() {
    this.CourseDurationForm = this.fb.group({
      courseDurationId: [0],
      courseNameId:[''],
      course:[''],
      courseTitle:[''],
      baseSchoolNameId:[''],
      baseNameId:[],
      durationFrom:[],
      durationTo:[],    
      professional:[''],
      nbcd:[''], 
      remark:[''],
      courseTypeId:[19],
      organizationNameId:[],
      name:[''],
      status:[1],
      isCompletedStatus:[0],
      isActive: [true],    
    })
     
    this.CourseDurationForm.get('course').valueChanges
    .subscribe(value => {
     
        this.getSelectedCourseAutocomplete(value);
    })

    //autocomplete for OrganizationName
    this.CourseDurationForm.get('name').valueChanges
    .subscribe(value => {
        this.getSelectedOrganizationName(value);
    })

  }
  
onCourseSelectionChanged(item) {
  // console.log(item);
  this.courseNameId = item.value 
  this.CourseDurationForm.get('courseNameId').setValue(item.value);
  this.CourseDurationForm.get('course').setValue(item.text);
}

//autocomplete for OrganizationName
onOrganizationSelectionChanged(item) {
  //console.log(item.value);
  this.organizationNameId = item.value
  this.CourseDurationForm.get('organizationNameId').setValue(item.value);
  this.CourseDurationForm.get('name').setValue(item.text);
}

  getSelectedCourseAutocomplete(cName){
    this.CourseNameService.getSelectedCourseByNameAndType(this.masterData.coursetype.InterService,cName).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }
//autocomplete for OrganizationName
getSelectedOrganizationName(pno){
  this.OrganizationNameService.getSelectedOrganizationName(pno).subscribe(response => {
    this.onOrganizationNameSelectionChange(response)
    this.options = response;
    this.filteredOptions = response;
  })
}
//Stop Inter srvice Course 
stopInterService(element) {
  this.confirmService.confirm('Confirm Stop message', 'Are You Sure Stop This Item?').subscribe(result => {
    if (result) {
      this.CourseDurationService.stopInterService(element.courseDurationId).subscribe(() => {


          this.CourseDurationService.getInterServiceCourseByParameters(this.courseNameId, this.organizationNameId).subscribe(res => {
            this.interServiceList = res;
            console.log(this.interServiceList);
          });
        
        this.snackBar.open('Information Stop Successfully ', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-warning'
        });
      })
    }
    
  })
  
}
//Running Inter srvice Course 
runningInterService(element) {
  this.confirmService.confirm('Confirm Stop message', 'Are You Sure Stop This Item?').subscribe(result => {
    if (result) {
      this.CourseDurationService.runningInterService(element.courseDurationId).subscribe(() => {

        

          this.CourseDurationService.getInterServiceCourseByParameters(this.courseNameId,this.organizationNameId).subscribe(res => {
            this.interServiceList = res;
            console.log(this.interServiceList);
          });
        
        this.snackBar.open('Information Stop Successfully ', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-warning'
        });
      })
    }
  })
}
  getselectedcoursename(){
    this.CourseDurationService.getselectedcoursename().subscribe(res=>{
      this.selectedcoursename=res
    });
  }
  getselectedcoursetype(){
    this.CourseDurationService.getselectedcoursetype().subscribe(res=>{
      this.selectedcoursetype=res
    });
  } 
  getselectedOrganizationName(){
    this.CourseDurationService.getselectedOrganizationName().subscribe(res=>{
      this.selectedorganizationname=res
    });
  } 
  onOrganizationNameSelectionChange(dropdown) {
    this.isShown = true;
    if (dropdown.isUserInput) {
      
      this.organizationNameId=this.CourseDurationForm.get('organizationNameId').value;
      this.organizationNameId = dropdown.source.value.value;
      this.CourseDurationForm.get('organizationNameId').setValue(dropdown.source.value)
     console.log("courseNameId")
     console.log(this.organizationNameId)
     console.log("ddddd")
      
      this.CourseDurationService.getSelectedInterServiceCourseListByCourseNameIdAndOrganizationNameId(this.courseNameId, this.organizationNameId).subscribe(response => {
        this.interServiceList = response;
        console.log(this.interServiceList);
      })
    }
  }
  

  onSubmit() {
    const id = this.CourseDurationForm.get('courseDurationId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.CourseDurationService.update(+id,this.CourseDurationForm.value).subscribe(response => {
            this.router.navigateByUrl('/inter-service/interservicecourse-list');
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
      this.CourseDurationService.submit(this.CourseDurationForm.value).subscribe(response => {
        this.router.navigateByUrl('/inter-service/interservicecourse-list');
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
