import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JoiningReason } from '../../models/JoiningReason';
import { JoiningReasonService } from '../../service/JoiningReason.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-joining-reason',
  templateUrl: './view-joining-reason.component.html',
  styleUrls: ['./view-joining-reason.component.sass']
})
export class ViewJoiningReasonComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: JoiningReason[] = [];
  isLoading = false;
  joiningReasonId: number;
    traineeId: number;
    reasonTypeId:number;
    reasonTypeName: string;
    ifAnotherReason: string;
    additionlInformation: string;
    menuPosition: number;
    isActive: true

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private JoiningReasonService: JoiningReasonService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('joiningReasonId'); 
    this.JoiningReasonService.find(+id).subscribe( res => {
      console.log(res);
      this.joiningReasonId= res.joiningReasonId,
      this.traineeId= res.traineeId,
      this.reasonTypeId= res.reasonTypeId,
      this.reasonTypeName = res.reasonTypeName,
      this.ifAnotherReason=res.ifAnotherReason,
      this.additionlInformation=res.additionlInformation,
      this.isActive= true
    })
  }
}
