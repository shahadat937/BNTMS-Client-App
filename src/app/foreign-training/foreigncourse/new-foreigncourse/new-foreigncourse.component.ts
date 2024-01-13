import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDurationService } from '../../service/courseduration.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-foreigncourse',
  templateUrl: './new-foreigncourse.component.html',
  styleUrls: ['./new-foreigncourse.component.sass']
})
export class NewForeigncourseComponent implements OnInit {
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
  dayCount:any=0;
  selectedSchool:SelectedModel[];
  selectedBaseName:SelectedModel[];
  foreignCourseListByCountry:any[];
  isShown:boolean=false;
  countryId:any;
  groupArrays:{ country: string; courses: any; }[];

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['ser','courseTitle','courseName','durationFrom','durationTo', 'country', 'actions'];


  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private CourseDurationService: CourseDurationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseDurationId'); 
     this.courseTypeId= this.route.snapshot.paramMap.get('courseTypeId');  
     console.log(this.courseTypeId);
    if (id) {
      this.pageTitle = 'Edit Foreign Course'; 
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
            status:res.status,
            isCompletedStatus:res.isCompletedStatus,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });     
          this.onBaseNameSelectionChangeGetSchool(res.baseNameId)
        }
      );
    } else {
      this.pageTitle = 'Create Foreign Course';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedcoursename();
    this.getselectedbaseschools();
    this.getselectedcountry();
    this.getselectedcoursetype();
    this.getselectedbasesName();
  }
  intitializeForm() {
    this.CourseDurationForm = this.fb.group({
      courseDurationId: [0],
      courseNameId:['',Validators.required],
      courseTitle:['',Validators.required],
      
      durationFrom:[],
      durationTo:[],    
      professional:[''],
      nbcd:[''], 
      remark:[''],
      courseTypeId:[this.courseTypeId],
      countryId:[],
      isCompletedStatus:[0],
      status:[1],
      isActive: [true],    
    })
  }

  getDaysfromDate(lastDate){
    var date1 = this.CourseDurationForm.get('durationFrom').value; 
	  var date2 = lastDate.value; 
  
    var Time = date2.getTime() - date1.getTime(); 
    var Days = Time / (1000 * 3600 * 24);
    this.dayCount = Days+1;
    console.log(lastDate.value)
    console.log(this.dayCount + " Days")
  }
  
  getForeignCoursesByCountryId(){
    this.isShown=true;
    this.countryId = this.CourseDurationForm.value['countryId'];
    this.CourseDurationService.getForeignCoursesByCountryId(this.countryId).subscribe(res=>{
      this.foreignCourseListByCountry=res
      console.log(this.foreignCourseListByCountry);

      // this gives an object with dates as keys
      const groups = this.foreignCourseListByCountry.reduce((groups, courses) => {
        const countryName = courses.country;
        if (!groups[countryName]) {
          groups[countryName] = [];
        }
        groups[countryName].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((country) => {
        return {
          country,
          courses: groups[country]
        };
      });
      console.log(this.groupArrays);
    });
  }
  getselectedbasesName(){
    this.CourseDurationService.getSelectedBaseName().subscribe(res=>{
      this.selectedBaseName=res
      console.log(this.selectedBaseName);
    });
  }
  onBaseNameSelectionChangeGetSchool(baseNameId){
    this.CourseDurationService.getSchoolByBaseId(baseNameId).subscribe(res=>{
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
          this.loading=true;
          this.CourseDurationService.update(+id,this.CourseDurationForm.value).subscribe(response => {
            this.router.navigateByUrl('/foreign-training/foreigncourse-list');
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
        this.router.navigateByUrl('/foreign-training/foreigncourse-list');
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

  inActiveItem(row){
    const id = row.courseDurationId; 

    if(row.isCompletedStatus == 0){
      this.confirmService.confirm('Confirm Deactive message', 'Are You Sure to Mark Complete This Course').subscribe(result => {
        if (result) {
          this.CourseDurationService.ChangeCourseCompleteStatus(id,1).subscribe(() => {
            this.getForeignCoursesByCountryId();
            this.snackBar.open('Course Completed!', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-warning'
            });
          })
        }
      })
    }
    else{
      this.confirmService.confirm('Confirm Active message', 'Are You Sure Mark Running This Course').subscribe(result => {
        if (result) {
          this.CourseDurationService.ChangeCourseCompleteStatus(id,0).subscribe(() => {
            this.getForeignCoursesByCountryId();
            this.snackBar.open('Course Running!', '', { 
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success'
            });
          })
        }
      })
    }
  }
}
