import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ChildParameterService} from '../service/ChildParameter.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-main-tab-layout',
  templateUrl: './main-tab-layout.component.html',
  styleUrls: ['./main-tab-layout.component.sass']
})
export class MainTabLayoutComponent implements OnInit {

  
  
  title = 'angular-material-tab-router';  
  navLinks: any[];
  id: any;
  activeLinkIndex = -1; 
  role:any;
  traineeId:any;
  userRole = Role;
  constructor(private router: Router,private authService: AuthService, private route: ActivatedRoute, private childParameterService: ChildParameterService) {
  
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();

    if(this.role == this.userRole.JSTISchool){
      this.navLinks = [
      {
        label: 'Family Info',
        link: '../main-tab/family-info-details',
        index: 0
      }, 
      {
        label: 'Military Training',
        link: '../main-tab/militarytraining-details',
        index: 1
      },
      {
        label: 'Edu. Qual.',
        link: '../main-tab/educational-qualification-details',
        index: 2
      }, 
      {
        label: 'Record of Service',
        link: '../main-tab/record-of-service-details',
        index: 3
      },
      {
        label: 'COVID-19  Vaccine',
        link: '../main-tab/covidvaccine-details',
        index: 4
      }
    ]
  }
    else{
      this.navLinks = [
        {
          label: 'Gen Info',
          link: '../main-tab/update-traineebiodatageneralinfo/',
          index: 0
        },

        {
          label: 'Misc Info',
          link: '../main-tab/trainee-biodata-other-details',
          index: 2
        }, 

        {
          label: 'Edu. Qual.',
          link: '../main-tab/educational-qualification-details',
          index: 3
        }, 
        {
          label: 'Game and Sports',
          link: '../main-tab/game-sport-details',
          index: 4
        }, 
        {
          label: 'Grand Father',
          link: '../main-tab/grandfather-details',
          index: 5
        },  
        {
          label: 'Achievement',
          link: '../main-tab/election-details',
          index: 6
        }, 
        {
          label: 'Family Info',
          link: '../main-tab/family-info-details',
          index: 7
        }, 
        {
          label: 'Educational Institutions',
          link: '../main-tab/educational-institution-details',
		      index: 8
		    },
        {
          label: 'Swimming/Driving',
          link: '../main-tab/swimming-diving-details',
          index: 9
        },
        {
          label: 'Reasons for Joining Navy',
          link: '../main-tab/joining-reason-details', 
          index: 10
        }, 
        {
          label: 'Co-Curricular Activities',
          link: '../main-tab/co-curricular-activity-details',
		      index: 11
		    },
		    {
          label: 'Language',
          link: '../main-tab/trainee-language-details',
          index: 12
        }, 
        {
          label: 'Social Media',
          link: '../main-tab/social-media-details',
          index: 13
        }, 
        {
          label: 'Question',
          link: '../main-tab/question-details',
          index: 14
        }, 
        {

          label: 'Employment Before Joining BNA',
          link: '../main-tab/employment-before-join-bna-details',
          index: 15
        },
        {
          label: 'Favorites',
          link: '../main-tab/favorites-details',
          index: 16

        }, 
        {
          label: 'Membership',
          link: '../main-tab/trainee-membership-details',
          index: 17
        },
        {
          label: 'Visit Aboard',
          link: '../main-tab/trainee-visited-aboard-details',
          index: 18
        },
        {
          label: 'Record of Service',
          link: '../main-tab/record-of-service-details',
          index: 19
        }, 
        {
          label: 'Military Training',
          link: '../main-tab/militarytraining-details',
          index: 20
        }, 
      ];
    }

  }
  ngOnInit(): void {
   
    this.id = this.route.snapshot.paramMap.get('traineeId');
    


    //this.id = 17;
    if (this.id) {
      this.childParameterService.SetupTraineeId(this.id);
    }
    else{
      if (this.childParameterService.currentTraineeValue) {
        this.id = this.childParameterService.currentTraineeValue;
      }
    }
  
    
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }


}
