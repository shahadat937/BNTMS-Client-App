import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationalQualificationService } from '../../service/EducationalQualification.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';

@Component({
  selector: 'app-new-educational-qualification',
  templateUrl: './new-educational-qualification.component.html',
  styleUrls: ['./new-educational-qualification.component.sass']
})
export class NewEducationalQualificationComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  traineeId:  string;
  EducationalQualificationForm: FormGroup;
  validationErrors: string[] = [];
  examTypeValues:SelectedModel[]; 
  groupValues:SelectedModel[]; 
  boardValues:SelectedModel[]; 

  constructor(private snackBar: MatSnackBar,private EducationalQualificationService: EducationalQualificationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('educationalQualificationId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Educational Qualification';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.EducationalQualificationService.find(+id).subscribe(
        res => {
          this.EducationalQualificationForm.patchValue({          

            educationalQualificationId: res.educationalQualificationId,
            traineeId: res.traineeId,
            examTypeId: res.examTypeId,
            boardId: res.boardId,
            address: res.address,
            subject: res.subject,
            instituteName: res.instituteName,
            groupId: res.groupId,
            passingYear: res.passingYear,
            result: res.result,
            outOfResult: res.outOfResult,
            courseDuration: res.courseDuration,
            status: res.status,            
            additionaInformation: res.additionaInformation,            
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Educational Qualification';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getExamType();
    this.getBoardName();
    this.getGroupName();
  }
  intitializeForm() {
    this.EducationalQualificationForm = this.fb.group({
      educationalQualificationId: [0],
      traineeId: [this.traineeId, Validators.required],
      examTypeId: ['', Validators.required],
      boardId: ['', Validators.required],
      address: [''],
      subject: [''],
      instituteName: [''],
      groupId: ['', Validators.required],
      passingYear: [''],
      result: ['', Validators.required],
      outOfResult: [''],
      courseDuration: [''],
      additionaInformation: [],
      status: ['2'],           
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }

  getExamType(){
    this.EducationalQualificationService.getselectedexamtype().subscribe(res=>{
      this.examTypeValues=res
    });
  }

  getBoardName(){
    this.EducationalQualificationService.getselectedboard().subscribe(res=>{
      this.boardValues=res
    });
  }

  getGroupName(){
    this.EducationalQualificationService.getselectedgroup().subscribe(res=>{
      this.groupValues=res
    });
  }
  
  onSubmit() {
    const id = this.EducationalQualificationForm.get('educationalQualificationId').value;  
    
    
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.EducationalQualificationService.update(+id,this.EducationalQualificationForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/educational-qualification-details/'+this.traineeId);
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
    } else {
      this.loading=true;
      this.EducationalQualificationService.submit(this.EducationalQualificationForm.value).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/educational-qualification-details/'+this.traineeId);
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
