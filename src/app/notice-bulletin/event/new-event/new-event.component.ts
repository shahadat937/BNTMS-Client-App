import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../service/event.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ClassRoutineService } from 'src/app/routine-management/service/classroutine.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.sass']
}) 
export class NewEventComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  eventForm: FormGroup;
  validationErrors: string[] = [];
  selectedCourse:SelectedModel[];
  selectedbaseschools:SelectedModel[];
  selectedevent:Event[];
  isShown: boolean = false ;
  courseName:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['ser','eventHeading','eventDetails','courseName','startDate','endDate','status'];
  constructor(
    private snackBar: MatSnackBar,
    private confirmService: ConfirmService,
    private eventService: EventService,
    private fb: FormBuilder, 
    private router: Router,  
    private route: ActivatedRoute, 
    private classRoutineService: ClassRoutineService
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('eventId'); 
    if (id) {
      this.pageTitle = 'Edit event'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.eventService.find(+id).subscribe(
        res => {
          this.eventForm.patchValue({             
            eventId: res.eventId,
            courseDurationId: res.courseDurationId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId: res.courseNameId,
            traineeNominationId: res.traineeNominationId,
            courseInstructorId: res.courseInstructorId,
            eventHeading:res.eventHeading,
            endDate:res.endDate,
            status: res.status,
            eventDetails: res.eventDetails,
            menuPosition: res.menuPosition,
            isActive: res.isActive
          });          
        }
      );
    } else {
      this.pageTitle = 'Create event';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedbaseschools();
    //this.getselectedcoursedurationbyschoolname();
   // this.geteventBySchool();
  }
  intitializeForm() {
    this.eventForm = this.fb.group({
      eventId: [0],
      courseDurationId: [''],
      baseSchoolNameId: [''],
      courseNameId: [''],
     // courseNameIds: [''],
      courseName:[''],
      eventHeading:[''],
      startDate:[],
      endDate:[],
      traineeNominationId: [''],
      courseInstructorId: [''],
      status: [0],
      eventDetails: [''],
      menuPosition: [''],
      isActive: [true]
    })
  }
  

  // onBaseSchoolNameSelectionChangeGetCourse(baseSchoolNameId){
  //     this.classRoutineService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res=>{
  //     console.log(res);
  //     this.selectedCourse=res;
  //   });
  // var baseSchoolNameId=this.ClassRoutineForm.value['baseSchoolNameId'];
  // var courseNameArr = dropdown.value.split('_');
  // var courseDurationId = courseNameArr[0];
  // var courseNameId=courseNameArr[1];
  // this.courseName=dropdown.text;
  // this.ClassRoutineForm.get('courseName').setValue(dropdown.text);
  // this.ClassRoutineForm.get('courseNameId').setValue(courseNameId);
  // this.ClassRoutineForm.get('courseDurationId').setValue(courseDurationId);
  // }

  getSelectedCourseName(dropdown){
   var baseSchoolNameId=this.eventForm.value['baseSchoolNameId'];
  var courseNameArr = dropdown.value.split('_');
  var courseDurationId = courseNameArr[0];
  var courseNameId=courseNameArr[1];
  this.courseName=dropdown.text;
  console.log("Course Name Id");
  console.log(courseNameId);
  //this.eventForm.get('courseName').setValue(dropdown.text);
  this.eventForm.get('courseNameId').setValue(courseNameId);
  this.eventForm.get('courseDurationId').setValue(courseDurationId);
  }

  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  getselectedcoursedurationbyschoolname(){
    var baseSchoolNameId=this.eventForm.value['baseSchoolNameId'];
    this.isShown=true;
    //console.log(baseSchoolNameId);
    this.classRoutineService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res=>{
     // console.log(baseSchoolNameId+"hhh");
      this.selectedCourse=res;   
      console.log("lof");
      console.log(this.selectedCourse)
    });
    this.eventService.geteventBySchool(baseSchoolNameId).subscribe(res=>{
      this.selectedevent=res
      console.log("ffff");
      console.log(this.selectedevent);
    }); 
} 

inActiveItem(row){
  const id = row.eventId;    
  var baseSchoolNameId=this.eventForm.value['baseSchoolNameId'];
  if(row.status == 0){
    this.confirmService.confirm('Confirm Deactive message', 'Are You Sure Stop This Event').subscribe(result => {
      if (result) {
        this.eventService.ChangeEventStatus(id,1).subscribe(() => {
          this.eventService.geteventBySchool(baseSchoolNameId).subscribe(res=>{
            this.selectedevent=res
            console.log("ffff");
            console.log(this.selectedevent);
          }); 
          this.snackBar.open('Event Stopped!', '', {
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
    this.confirmService.confirm('Confirm Active message', 'Are You Sure Run This Event').subscribe(result => {
      if (result) {
        this.eventService.ChangeEventStatus(id,0).subscribe(() => {
          this.eventService.geteventBySchool(baseSchoolNameId).subscribe(res=>{
            this.selectedevent=res
            console.log("ffff");
            console.log(this.selectedevent);
          }); 
          this.snackBar.open('Event Running!', '', { 
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

stopevents(element){
  //console.log("Number");
  //console.log(id)
  if(element.status ===0){
    console.log("element id");
    console.log(element.status);
    this.confirmService.confirm('Confirm Stop message', 'Are You Sure Stop This Item').subscribe(result => {
      if (result) {
     this.eventService.stopevents(element.eventId).subscribe(() => {
      var baseSchoolNameId=this.eventForm.value['baseSchoolNameId'];

      this.eventService.geteventBySchool(baseSchoolNameId).subscribe(res=>{
        this.selectedevent=res
        console.log("ffff");
        console.log(this.selectedevent);
      }); 

     // this.getCourseplanCreates();
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
//   else{
//     console.log("element id");
//     console.log(element.status);
//     this.confirmService.confirm('Confirm Running message', 'Are You Sure Running This Item').subscribe(result => {
//       if (result) {
//      this.eventService.runningevents(element.eventId).subscribe(() => {
//       var baseSchoolNameId=this.eventForm.value['baseSchoolNameId'];

//       this.eventService.geteventBySchool(baseSchoolNameId).subscribe(res=>{
//         this.selectedevent=res
//   console.log("ffff");
//         console.log(this.selectedevent);
//       }); 

//      // this.getCourseplanCreates();
//       this.snackBar.open('Information Rnnning Successfully ', '', {
//         duration: 3000,
//         verticalPosition: 'bottom',
//         horizontalPosition: 'right',
//         panelClass: 'snackbar-success'
//       });
//     })
//   }
// })
//   }
}
// stopevents(id: number) {
//   this.eventService.st
// }


  // this.eventService.stopevents(id).subscribe(res=>{
  //   this.events=res
  // }); 


// inActiveItem(){

//   if(row.isActive == true){
//     this.confirmService.confirm('Confirm Deactive message', 'Are You Sure Deactive This Item').subscribe(result => {
//       if (result) {
//     this.CourseplanCreateService.deactiveCoursePlan(id).subscribe(() => {
//       this.getCourseplanCreates();
//       this.snackBar.open('Information Deactive Successfully ', '', {
//         duration: 3000,
//         verticalPosition: 'bottom',
//         horizontalPosition: 'right',
//         panelClass: 'snackbar-warning'
//       });
//     })
//   }
// })
// }
//   this.eventService.stopevents(id).subscribe(() => {
//     //this.getCourseplanCreates();
//     this.snackBar.open('Information Deactive Successfully ', '', {
//       duration: 3000,
//       verticalPosition: 'bottom',
//       horizontalPosition: 'right',
//       panelClass: 'snackbar-warning'
//     });
//   })
// }

  getselectedbaseschools(){
    this.eventService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschools=res
    }); 
  } 

  onSubmit() {
    const id = this.eventForm.get('eventId').value; 
    console.log(this.eventForm.value);  
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.eventService.update(+id,this.eventForm.value).subscribe(response => {
            // this.router.navigateByUrl('/event-bulletin/event-list');
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
      this.loading = true;
      this.eventService.submit(this.eventForm.value).subscribe(response => {
        // this.router.navigateByUrl('/event-bulletin/event-list');
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
