import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CourseDuration } from '../../../course-management/models/courseduration';
import { CourseDurationService } from '../../../course-management/service/courseduration.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { CourseNameService } from '../../../basic-setup/service/CourseName.service';

@Component({
  selector: 'app-view-coursecreatenbcd',
  templateUrl: './view-coursecreatenbcd.component.html',
  styleUrls: ['./view-coursecreatenbcd.component.sass']
})
export class ViewCourseCreateNbcdComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  userRole = Role;
  ELEMENT_DATA: CourseDuration[] = [];
  isLoading = false;
  courseDurationId: number;
  courseNameId: number;
  courseTypeId: number;
  courseTitle: string;
  courseName:string;
  noOfCandidates:string;
  baseSchoolNameId: number;
  durationFrom:Date;
  durationTo:Date;
  professional: string;
  nbcd: string;
  remark: string;
  schoolDb:any;
  branchId:any;
  traineeId:any;
  role:any;
  showHideDiv = false;
  baseSchoolName:any;
  nbcdDurationFrom:any;
  nbcdDurationTo:any;
  CourseDurationForm: FormGroup;
  options = [];
  filteredOptions;

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private CourseNameService: CourseNameService,private authService: AuthService,private snackBar: MatSnackBar,private CourseDurationService: CourseDurationService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    const id = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.schoolDb = Number(this.route.snapshot.paramMap.get('schoolDb')); 
    this.courseTypeId = Number(this.route.snapshot.paramMap.get('courseTypeId'));
    console.log(this.schoolDb)
    this.CourseDurationService.find(+id).subscribe( res => {
      console.log(res)
      this.courseDurationId = res.courseDurationId,
      this.courseNameId = res.courseNameId,
      this.courseName = res.courseName,
      this.courseTitle = res.courseTitle,
      this.courseName=res.courseName,
      this.noOfCandidates = res.noOfCandidates,
      this.baseSchoolNameId = res.baseSchoolNameId,
      this.durationFrom = res.durationFrom,    
      this.durationTo = res.durationTo,
      this.professional = res.professional,
      this.nbcd = res.nbcd,
      this.remark = res.remark,
      this.baseSchoolName =res.baseSchoolName,
      this.nbcdDurationFrom = res.nbcdDurationFrom,
      this.nbcdDurationTo =res.nbcdDurationTo   
    })
    this.intitializeForm();
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
      nbcdDurationFrom:[],
      nbcdDurationTo:[],
      professional:[''],
      nbcd:[''], 
      remark:[''],
      courseTypeId:[3],
      countryId:[1],
      isCompletedStatus:[0],
      nbcdSchoolId:[''],
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
       console.log("888888888");
      this.courseNameId = item.value 
      this.CourseDurationForm.get('courseNameId').setValue(item.value);
      this.CourseDurationForm.get('course').setValue(item.text);
    }
    getSelectedCourseAutocomplete(cName){
      console.log("8888888ww88");
      this.CourseNameService.getSelectedCourseByNameAndType(3,cName).subscribe(response => {
        this.options = response;
        this.filteredOptions = response;
        console.log("eeeeeee");
        console.log(this.filteredOptions);
      })
    }

  onSubmit()
  {
    this.CourseDurationForm.get('nbcd').setValue(this.nbcd);
    this.CourseDurationForm.get('nbcdDurationFrom').setValue(this.durationFrom);
    this.CourseDurationForm.get('nbcdDurationTo').setValue(this.durationTo);
    this.CourseDurationForm.get('noOfCandidates').setValue(this.noOfCandidates);
    this.CourseDurationForm.get('professional').setValue(this.professional);
    this.CourseDurationForm.get('courseDurationId').setValue(this.courseDurationId);  
    this.CourseDurationForm.get('courseTitle').setValue(this.courseTitle ); 
    
    this.CourseDurationService.saveCourseDurationNbcd(this.CourseDurationForm.value,this.branchId).subscribe(response => {
    this.snackBar.open('Information Inserted Successfully ', '', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });
  },
  )  
    console.log(this.CourseDurationForm.value);
  }
}
