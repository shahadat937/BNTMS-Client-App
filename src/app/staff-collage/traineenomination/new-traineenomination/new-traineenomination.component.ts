import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraineeNominationService } from '../../service/traineenomination.service';
import { BIODataGeneralInfoService } from '../../../trainee-biodata/service/BIODataGeneralInfo.service';
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
  traineeInfoById:any;
  traineeId:number;
  courseDurationId:string;
  courseNameId:string;
 presentBillet:SelectedModel[];
 presentBilletName:any;
 isLoading = false;
 isTrainee = false;
 nominationCount:any;
 traineeAge:any;
 traineeJoining:any;
 nominatedList:any;
 yearNow:any = 0;
 showHideDiv = false;
//  courseDurationId:number;

  options = [];
  filteredOptions;
  

  constructor(private snackBar: MatSnackBar,private bioDataGeneralInfoService: BIODataGeneralInfoService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private TraineeNominationService: TraineeNominationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }
 
  ngOnInit(): void {
   
    const id = this.route.snapshot.paramMap.get('traineeNominationId');  
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId');  
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
    

      this.TraineeNominationService.getNominatedTraineeDate(this.traineeId).subscribe(res=>{
        this.isTrainee = true;
        this.traineeAge = this.getCalculateAge(res.dateOfBirth,0);
        this.traineeJoining = this.getCalculateAge(res.joiningDate,0);
      }); 
      
      this.TraineeNominationService.getTraineeNominationCount(this.traineeId,this.courseNameId).subscribe(res=>{
        this.nominationCount=res
        console.log("nomination count");
        console.log(this.nominationCount);
      });   
      
    
  }
  getCalculateAge(getDate,returnstatus){
    var currentDate = new Date(new Date().getFullYear(), 0, 1);
    var startDate = new Date(getDate);

    this.yearNow = currentDate.getFullYear();
    var monthNow = currentDate.getMonth() + 1;
    var dateNow = currentDate.getDate()

    var yearDob = startDate.getFullYear();
    var monthDob = startDate.getMonth() + 1;
    var dateDob = startDate.getDate();
    var yearAge,monthAge,dateAge;
    
    yearAge = this.yearNow - yearDob;

    if (monthNow >= monthDob)
       monthAge = monthNow - monthDob;
    else {
      yearAge--;
       monthAge = 12 + monthNow -monthDob;
    }

    if (dateNow >= dateDob)
       dateAge = dateNow - dateDob;
    else {
      monthAge--;
       dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    if(returnstatus == 0){
      return (yearAge +" Years "+ monthAge +" Months "+ dateAge +" Days");
    }else if(returnstatus == 1){
      return (yearAge);
    }else if(returnstatus == 2){
      return (monthAge);
    }else if(returnstatus == 3){
      return (dateAge);
    }else{
      return 0;
    }
    
  }
//autocomplete
getSelectedTraineeByPno(pno,courseDurationId,courseNameId){
    this.TraineeNominationService.getSelectedTraineeByparameterRequest(pno,courseDurationId,courseNameId).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }

  getSelectedTrainee(){
    this.TraineeNominationService.getSelectedTrainee().subscribe(res=>{
      this.selectedTrainee=res
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
  getselectedcoursename(){
    this.TraineeNominationService.getselectedcoursename().subscribe(res=>{
      this.selectedcourse=res
    });
  } 

  getselectedWithdrawnDoc(){
    this.TraineeNominationService.getselectedWithdrawnDoc().subscribe(res=>{
      this.selecteddoc=res
    });
  } 

  toggle(){
    this.showHideDiv = !this.showHideDiv;
  }
  printSingle(){
    this.showHideDiv= false;
    this.print();
  }
  print(){ 
     
    let printContents, popupWin;
    printContents = document.getElementById('printNomineeList').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
          body{  width: 99%;}
            label { 
              font-weight: 400;
              font-size: 13px;
              padding: 2px;
              margin-bottom: 5px;
            }
            table, td, th {
              border: 1px solid silver;
            }
            table td {
              font-size: 13px;
              text-align:center;
            }
            .nomination-custom-design.staff-collage tr td.cl-name {
              text-align: left;
            }
            .nomination-custom-design.staff-collage tr .cl-action {
              display:none;
            }
            table th {
              font-size: 13px;
              text-align:center;
            }
            table {
              border-collapse: collapse;
              width: 98%;
            }
            th {
              height: 26px;
            }
            .header-text{
              text-align:center;
            }
            .header-text h3{
              margin:0;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          </div>
          <br>
          ${printContents}
          
        </body>
      </html>`
    );
    popupWin.document.close();

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

  displayedColumns: string[] = ['ser','traineeName', 'attempt','age','service', 'presentBillet', 'remarks', 'actions'];
  dataSource: MatTableDataSource<TraineeNomination> = new MatTableDataSource();

  getTraineeNominationsByCourseDurationId(courseDurationId) {
    this.isLoading = true;
    this.TraineeNominationService.getTraineeNominationsByCourseDurationId(this.paging.pageIndex, this.paging.pageSize,this.searchText,courseDurationId).subscribe(response => {
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      this.nominatedList = this.dataSource.data;
      console.log("Data source");
      console.log(this.dataSource.data);
    })
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
    console.log( this.TraineeNominationForm.value)
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.TraineeNominationService.update(+id,this.TraineeNominationForm.value).subscribe(response => {

            // this.router.navigateByUrl('/central-exam/traineenomination-list/'+this.courseDurationId);
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
        // this.router.navigateByUrl('/central-exam/traineenomination-list/'+this.courseDurationId);
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
    const id = row.traineeNominationId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
     // console.log(result);
     this.reloadCurrentRoute();
      if (result) {
        this.TraineeNominationService.delete(id).subscribe(() => {
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
