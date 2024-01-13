import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ChildParameterService} from '../service/ChildParameter.service'

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
  constructor(private router: Router, private route: ActivatedRoute, private childParameterService: ChildParameterService) {
    
    this.navLinks = [
        {
          label: 'General Information',
          link: '../main-tab/update-traineebiodatageneralinfo/',
          index: 0
        },

        {
          label: 'Educational Qualification',
          link: '../main-tab/educational-qualification-details',
          index: 1
        }, 
        {
          label: 'Game and Sports',
          link: '../main-tab/game-sport-details',
          index: 2
        },  
        {
          label: 'Family Info',
          link: '../main-tab/family-info-details',
          index: 3
        },
        {
          label: 'Social Media',
          link: '../main-tab/social-media-details',
          index: 4
        }, 
      ];
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
