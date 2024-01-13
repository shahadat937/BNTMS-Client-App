import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SocialMedia } from '../../models/SocialMedia';
import { SocialMediaService } from '../../service/SocialMedia.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-social-media',
  templateUrl: './view-social-media.component.html',
  styleUrls: ['./view-social-media.component.sass']
})
export class ViewSocialMediaComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: SocialMedia[] = [];
  isLoading = false;
  socialMediaId: number;
  traineeId: number;
  socialMediaTypeId:number;
  socialMediaTypeName: string;
  socialMediaAccountName: string;
  additionalInformation: string;
  menuPosition: number;
  isActive: true

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private SocialMediaService: SocialMediaService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('socialMediaId'); 
    this.SocialMediaService.find(+id).subscribe( res => {
      console.log(res);
      this.socialMediaId= res.socialMediaId,
      this.traineeId= res.traineeId,
      this.socialMediaTypeId= res.socialMediaTypeId,
      this.socialMediaTypeName = res.socialMediaTypeName,
      this.socialMediaAccountName=res.socialMediaAccountName,
      this.additionalInformation=res.additionalInformation,
      this.isActive= true
    })
  }
}
