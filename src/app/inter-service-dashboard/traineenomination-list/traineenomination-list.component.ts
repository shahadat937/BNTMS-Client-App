import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {TraineeNomination} from '../../course-management/models/traineenomination'
import {TraineeNominationService} from '../../course-management/service/traineenomination.service'
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-traineenomination-list',
  templateUrl: './traineenomination-list.component.html',
  styleUrls: ['./traineenomination-list.component.sass']
})
export class TraineeNominationListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeNomination[] = [];
  isLoading = false;
  fileUrl:any = environment.fileUrl;
  courseDurationId:number;
  courseNameId:number;
  courseTypeId:number;
  baseSchoolNameId:any;
  dbType:any;
  dbType1:any;
  courseType3:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  groupArrays:{ sailorRank: string; courses: any; }[];
  branchId:any;
  traineeId:any;
  role:any;

  nominatedPercentageList:any;
  TraineeReportSubmittedList:any;

  getCourse:any;

  displayedColumns: string[] = ['ser','traineeName','attandanceParcentage'];
  displayedInterServiceColumns: string[] = ['ser','traineeName', 'status', 'doc'];
  
  dataSource: MatTableDataSource<TraineeNomination> = new MatTableDataSource();
 

   selection = new SelectionModel<TraineeNomination>(true, []);

  
  constructor(private route: ActivatedRoute, private authService: AuthService,private snackBar: MatSnackBar,private TraineeNominationService: TraineeNominationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    //this.getTraineeNominations();
    //var schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.gettraineeNominationListByTypeCourseDurationId(courseDurationId);
  }

  gettraineeNominationListByTypeCourseDurationId(courseDurationId) {
  
    this.isLoading = true;
    this.TraineeNominationService.gettraineeNominationListByTypeCourseDurationId(courseDurationId).subscribe(response => {
      this.TraineeReportSubmittedList=response;
      this.getCourse = response[0].course +" - " + response[0].courseTitle;
      const groups = this.TraineeReportSubmittedList.reduce((groups, courses) => {
        const sailorRank = courses.sailorRank;
        if (!groups[sailorRank]) {
          groups[sailorRank] = [];
        }
        groups[sailorRank].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((sailorRank) => {
        return {
          sailorRank,
          courses: groups[sailorRank]
        };
      });
      console.log(this.groupArrays);

      console.log(this.TraineeReportSubmittedList)
    });
  }

 
}
