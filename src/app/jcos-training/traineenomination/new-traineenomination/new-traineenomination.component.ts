import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraineeNominationService } from '../../service/traineenomination.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { Observable, of, Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { TraineeNomination } from '../../models/traineenomination';
import { BIODataGeneralInfoService } from 'src/app/trainee-biodata/service/BIODataGeneralInfo.service';

@Component({
  selector: 'app-new-traineenomination',
  templateUrl: './new-traineenomination.component.html',
  styleUrls: ['./new-traineenomination.component.sass']
}) 
export class NewTraineeNominationComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  TraineeNominationForm: FormGroup;
  validationErrors: string[] = [];
  selectedcourse:SelectedModel[];
  selectedduration:SelectedModel[];
  selectedcoursestatus:SelectedModel[];
  selectedLocationType:SelectedModel[];
  selecteddoc:SelectedModel[];
  selectedTrainee:SelectedModel[];
  selectedExamCenter:SelectedModel[];
  selectedNewAtempt:SelectedModel[];
  selectedpresentbillet:SelectedModel[];
  traineeId:number;
  traineeInfoById:any;
  courseDurationId:string;
  courseNameId:any;
 presentBillet:SelectedModel[];
 presentBilletName:any;
 isLoading = false;
 nominationCount:any;
 groupArrays:{ branchName: string; courses: any; }[];
//  courseDurationId:number;

  options = [];
  filteredOptions;
  

  constructor(private snackBar: MatSnackBar,private bioDataGeneralInfoService: BIODataGeneralInfoService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private TraineeNominationService: TraineeNominationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }
 
  ngOnInit(): void {
   
    const id = this.route.snapshot.paramMap.get('traineeNominationId'); 
    console.log("id");
    this.courseNameId = Number(this.route.snapshot.paramMap.get('courseNameId'));  
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.TraineeNominationService.findByCourseDuration(+this.courseDurationId).subscribe(
      res => { 
        this.TraineeNominationForm.patchValue({          
          traineeNominationId:res.traineeNominationId, 
          courseDurationId: res.courseDurationId, 
          courseNameId:res.courseNameId, 
          traineeId:res.traineeId, 
          examCenterId:res.examCenterId,
          newAtemptId:res.newAtemptId,
          traineeCourseStatusId:res.traineeCourseStatusId, 
          saylorRankId:res.saylorRankId,
          rankId:res.rankId,
          saylorBranchId:res.saylorBranchId,
          saylorSubBranchId:res.saylorSubBranchId,
          branchId:res.branchId,
          withdrawnDocId:res.withdrawnDocId,
          withdrawnRemarks:res.withdrawnRemarks,
          withdrawnDate:res.withdrawnDate,
          status:res.status,
          menuPosition: res.menuPosition,
          isActive: res.isActive,
        });   
        console.log("res");
        console.log(res);
      }
    );

    if (id) {
      this.pageTitle = 'Edit Trainee Nomination'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.TraineeNominationService.find(+id).subscribe(
        res => {
          this.TraineeNominationForm.patchValue({          
            traineeNominationId:res.traineeNominationId, 
            courseDurationId: res.courseDurationId, 
            courseNameId:res.courseNameId, 
            traineeId:res.traineeId, 
            examCenterId:res.examCenterId,
            newAtemptId:res.newAtemptId,
            traineeCourseStatusId:res.traineeCourseStatusId, 
            withdrawnDocId:res.withdrawnDocId,
            saylorRankId:res.saylorRankId,
            rankId:res.rankId,
            saylorBranchId:res.saylorBranchId,
            saylorSubBranchId:res.saylorSubBranchId,
            branchId:res.branchId,
            traineeName:res.trainee,
            indexNo:res.indexNo,
            dateCreated:res.dateCreated,
            createdBy:res.createdBy,
            presentBillet:res.presentBillet,
            withdrawnRemarks:res.withdrawnRemarks,
            withdrawnDate:res.withdrawnDate,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Trainee Nomination';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedcoursename();
   // this.getselectedcourseduration();
    this.getselectedTraineeCourseStatus();
    this.getselectedWithdrawnDoc();
    this.getSelectedTrainee();
    this.getselectedExamCentern();
    this.getselectedNewAtempt();
    this.getselectedpresentbillets();
    this.getTraineeNominationsByCourseDurationId(this.courseDurationId);
  }

  intitializeForm() {
    this.TraineeNominationForm = this.fb.group({
      traineeNominationId: [0],
      courseDurationId:[''],
      courseNameId:[''],
      traineeId:[''],
      presentBilletId:[''],
      previousAttemp:[''],
      presentBillet:[''],
      examCenterId:[''],
      newAtemptId:[''],
      traineeName:[''],
      traineeCourseStatusId:[],
      saylorRankId:[],
      rankId:[],
      saylorBranchId:[],
      saylorSubBranchId:[],
      branchId:[],
      withdrawnDocId:[],    
      withdrawnRemarks:[''],
      createdBy:[''],
      dateCreated:[''],
      indexNo:[''],
      withdrawnDate:[], 
      status:[1],
      isActive: [true],    
    })

    //autocomplete
    this.TraineeNominationForm.get('traineeName').valueChanges
    .subscribe(value => {
     
        this.getSelectedTraineeByPno(value,this.courseDurationId,this.courseNameId);
    })
  }
  //autocomplete
  onTraineeSelectionChanged(item) {

    console.log("Name");
    console.log(item.value);

      this.TraineeNominationService.getPresentBilletByTraineeId(item.value).subscribe(res=>{
        this.presentBillet=res;
        this.presentBilletName=this.presentBillet[0].text;
        //this.presentBilletName=this.presentBillet[0].text
        console.log("Present");
        console.log(this.presentBilletName);
        this.TraineeNominationForm.get('presentBillet').setValue(this.presentBilletName);
      });

    this.traineeId = item.value
    this.TraineeNominationForm.get('traineeId').setValue(item.value);
    this.TraineeNominationForm.get('traineeName').setValue(item.text);

    this.getTraineeInfoByTraineeId(this.traineeId);

      this.TraineeNominationService.getTraineeNominationCount(this.traineeId,this.courseNameId).subscribe(res=>{
        this.nominationCount=res
        console.log("nomination count");
        console.log(this.nominationCount);
      });    
  }

  deleteItem(row) {
    const id = row.traineeNominationId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.TraineeNominationService.delete(id).subscribe(() => {
          this.getTraineeNominationsByCourseDurationId(this.courseDurationId);
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

//autocomplete
getSelectedTraineeByPno(pno,courseDurationId,courseNameId){
  if(pno !=null && courseDurationId !=null && courseNameId !=null){
    this.TraineeNominationService.getSelectedTraineeByparameterRequest(pno,courseDurationId,courseNameId).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }
}

  getSelectedTrainee(){
    this.TraineeNominationService.getSelectedTrainee().subscribe(res=>{
      this.selectedTrainee=res
    });
  } 

  getselectedcoursename(){
    this.TraineeNominationService.getselectedcoursename().subscribe(res=>{
      this.selectedcourse=res
      console.log("courses");
    });
  } 

  getselectedWithdrawnDoc(){
    this.TraineeNominationService.getselectedWithdrawnDoc().subscribe(res=>{
      this.selecteddoc=res
    });
  } 

  getTraineeInfoByTraineeId(traineeId){
    this.bioDataGeneralInfoService.find(traineeId).subscribe(res=>{
      this.traineeInfoById=res;
      console.log(this.traineeInfoById);
      this.TraineeNominationForm.get('saylorRankId').setValue(res.saylorRankId);
      this.TraineeNominationForm.get('rankId').setValue(res.rankId);
      this.TraineeNominationForm.get('saylorBranchId').setValue(res.saylorBranchId);
      this.TraineeNominationForm.get('saylorSubBranchId').setValue(res.saylorSubBranchId);
      this.TraineeNominationForm.get('branchId').setValue(res.branchId);
    });
  }

  getselectedcourseduration(){
    this.TraineeNominationService.getselectedcourseduration().subscribe(res=>{
      this.selectedduration=res
    });
  }

  getselectedTraineeCourseStatus(){
    this.TraineeNominationService.getselectedTraineeCourseStatus().subscribe(res=>{
      this.selectedcoursestatus=res
    });
  }
  getselectedExamCentern(){
    this.TraineeNominationService.getselectedExamCentern().subscribe(res=>{
      this.selectedExamCenter=res
    });
  }
  getselectedNewAtempt(){
    this.TraineeNominationService.getselectedNewAtempt().subscribe(res=>{
      this.selectedNewAtempt=res
    });
  }

  getselectedpresentbillets(){
    this.TraineeNominationService.getselectedpresentbillets().subscribe(res=>{
      this.selectedpresentbillet=res
    });
  }
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','traineeName', 'examCenter', 'presentBillet',  'actions'];
  dataSource: MatTableDataSource<TraineeNomination> = new MatTableDataSource();

  getTraineeNominationsByCourseDurationId(courseDurationId) {
    if(courseDurationId !=null){
      this.isLoading = true;
      this.TraineeNominationService.getTraineeNominationsByCourseDurationId(this.paging.pageIndex, this.paging.pageSize,this.searchText,courseDurationId).subscribe(response => {
        this.dataSource.data = response.items; 

        // this gives an object with dates as keys
      const groups = this.dataSource.data.reduce((groups, courses) => {
        const branchName = courses.saylorBranch;
        if (!groups[branchName]) {
          groups[branchName] = [];
        }
        groups[branchName].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((branchName) => {
        return {
          branchName,
          courses: groups[branchName]
        };
      });

      console.log(this.groupArrays)


        this.paging.length = response.totalItemsCount    
        this.isLoading = false;
        console.log("Data source");
        console.log(this.dataSource.data);
      })
    }
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getTraineeNominationsByCourseDurationId(this.courseDurationId);
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getTraineeNominationsByCourseDurationId(this.courseDurationId);
  } 

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  onSubmit() {
    const id = this.TraineeNominationForm.get('traineeNominationId').value;   
    console.log(this.TraineeNominationForm.value) 
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.TraineeNominationService.update(+id,this.TraineeNominationForm.value).subscribe(response => {
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
      this.TraineeNominationService.submit(this.TraineeNominationForm.value).subscribe(response => {
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
