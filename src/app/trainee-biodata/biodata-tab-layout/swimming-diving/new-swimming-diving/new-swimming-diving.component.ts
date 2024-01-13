import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwimmingDivingService } from '../../service/SwimmingDiving.service';
import { CheckboxSelectedModel } from '../../../../core/models/checkboxSelectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-new-swimming-diving',
  templateUrl: './new-swimming-diving.component.html',
  styleUrls: ['./new-swimming-diving.component.sass']
})
export class NewSwimmingDivingComponent implements OnInit {
  buttonText:string;
  loading = false;
  hideRequiredControl = new FormControl(false);
  pageTitle: string;
  destination:string;
  traineeId:string;
  SwimmingDivingForm: FormGroup;
  validationErrors: string[] = [];
  checked = false;
  indeterminate = false;
  selected = 'selected';
  //checkArray:any;
 // selectedvalues:CheckboxSelectedModel[];
  selectedvalues:CheckboxSelectedModel[];
 
 // form: FormGroup;

  constructor(private CodeValueService:CodeValueService,private snackBar: MatSnackBar,private SwimmingDivingService: SwimmingDivingService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    console.log(this.traineeId);
    // if (id) {
    //   this.pageTitle = 'Edit Swimming Diving';
    //   this.destination = "Edit";
    //   this.buttonText= "Update"
    //   this.SwimmingDivingService.find(+id).subscribe(
    //     res => {
    //       this.SwimmingDivingForm.patchValue({          

    //         swimmingDivingId: res.swimmingDivingId,
    //         traineeId: res.traineeId,
    //        // checkArray: this.fb.array([]),
            
    //         //swimmingDivingTypeId: res.swimmingDivingTypeId,
    //         swimmingLevelId: res.swimmingLevelId,
    //         additionalInformation: res.additionalInformation,
                                   
    //      //   menuPosition: res.menuPosition,
    //       });          
    //     }
    //   );
    // } else {
      this.pageTitle = 'Create Swimming Diving';
      this.destination = "Add";
      this.buttonText= "Save"
    //}
    this.intitializeForm();
  
  }
  
  onDropdownChange(selectedValue){    

      this.CodeValueService.getCheckBoxSelectedCodeValueByTypeWithChecked(selectedValue.value).subscribe(res=>{
       this.selectedvalues=res;    
    })
  }

  // private addCheckboxes() {
  //   this.selectedvalues.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  // }
 
  intitializeForm() {
    this.SwimmingDivingForm = this.fb.group({
      swimmingDivingId: [0],
      traineeId: [this.traineeId, Validators.required],
      // swimmingDivingTypeId: ['', Validators.required],
      // swimmingLevelId: ['', Validators.required],
      checkArray: this.fb.array([]),
      additionalInformation: [''],
                
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }

  onCheckboxChange(event,value) {
    //const checkArray: FormArray = this.SwimmingDivingForm.get('checkArray') as FormArray;
    this.selectedvalues.forEach(item =>{
      if(item.value == value){
          item.isChecked = event.checked
          console.log(item.isChecked );
      }
    })
    //   const checkArray = <FormArray>this.SwimmingDivingForm.get('checkArray') as FormArray;

    // if(event.checked) {
      
    //   checkArray.push(new FormControl(event.source.value))
    // } else {
    //   const i = checkArray.controls.findIndex(x => x.value === event.source.value);
    //   checkArray.removeAt(i);
    // }
  }
  
  onSubmit() {
    const SwimmingDivingFormValue = Object.assign({}, 
      this.SwimmingDivingForm.value, { 
        checkArray: this.selectedvalues
        .filter(x => {
          return x.isChecked !== false; } )
        
        });
  
    console.log(SwimmingDivingFormValue);
    const id = this.SwimmingDivingForm.get('swimmingDivingId').value;   
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This SwimmingDiving Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.SwimmingDivingService.update(+id,SwimmingDivingFormValue).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/swimming-diving-details/');
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
      this.SwimmingDivingService.submit(SwimmingDivingFormValue).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/swimming-diving-details/');
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
