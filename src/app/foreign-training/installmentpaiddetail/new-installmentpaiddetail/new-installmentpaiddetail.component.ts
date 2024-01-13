import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { InstallmentPaidDetailService } from "../../service/installmentpaiddetail.service";
import { SelectedModel } from "src/app/core/models/selectedModel";
import { CodeValueService } from "src/app/basic-setup/service/codevalue.service";
import { MasterData } from "src/assets/data/master-data";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmService } from "src/app/core/service/confirm.service";

@Component({
  selector: "app-new-installmentpaiddetail",
  templateUrl: "./new-installmentpaiddetail.component.html",
  styleUrls: ["./new-installmentpaiddetail.component.sass"],
})
export class NewInstallmentPaidDetailComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText: string;
  pageTitle: string;
  destination: string;
  courseDurationId: any;
  traineeId:any;
  InstallmentPaidDetailForm: FormGroup;
  validationErrors: string[] = [];
  paymentdetailValues: SelectedModel[];

  constructor(
    private snackBar: MatSnackBar,
    private confirmService: ConfirmService,
    private CodeValueService: CodeValueService,
    private InstallmentPaidDetailService: InstallmentPaidDetailService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("installmentPaidDetailId");
    this.courseDurationId = this.route.snapshot.paramMap.get("courseDurationId");
    this.traineeId = this.route.snapshot.paramMap.get("traineeId");
    console.log(this.courseDurationId);
    if (id) {
      this.pageTitle = "Edit Installment Paid Detail";
      this.destination = "Edit";
      this.buttonText = "Update";
      this.InstallmentPaidDetailService.find(+id).subscribe((res) => {
        this.InstallmentPaidDetailForm.patchValue({
          installmentPaidDetailId: res.installmentPaidDetailId,
          traineeId: res.traineeId,
          courseDurationId: res.courseDurationId,
          totalUsd: res.totalUsd,
          totalBdt: res.totalBdt,
          scheduleDate: res.scheduleDate,
          paymentCompletedStatus: res.paymentCompletedStatus,
          remarks: res.remarks,
          status: res.status,
          menuPosition: res.menuPosition,
          isActive: res.isActive,
        });
      });
    } else {
      this.pageTitle = "Create Installment Paid Detail";
      this.destination = "Add";
      this.buttonText = "Save";
    }
    this.intitializeForm();
    this.getpaymentdetail();
  }
  intitializeForm() {
    this.InstallmentPaidDetailForm = this.fb.group({
      installmentPaidDetailId: [0],
      traineeId: [this.traineeId],
      courseDurationId: [this.courseDurationId],
      totalUsd: [""],
      totalBdt: [""],
      scheduleDate: [],
      paymentCompletedStatus: [],
      remarks: [""],
      status: [],
      isActive: [true],
    });
  }

  getpaymentdetail() {
    this.InstallmentPaidDetailService.getselectedpaymentdetails().subscribe(
      (res) => {
        this.paymentdetailValues = res;
      }
    );
  }

  onSubmit() {
    const id = this.InstallmentPaidDetailForm.get(
      "installmentPaidDetailId"
    ).value;
    if (id) {
      this.confirmService
        .confirm("Confirm Update message", "Are You Sure Update This  Item?")
        .subscribe((result) => {
          console.log(result);
          if (result) {
            this.loading=true;
            this.InstallmentPaidDetailService.update(
              +id,
              this.InstallmentPaidDetailForm.value
            ).subscribe(
              (response) => {
                this.router.navigateByUrl(
                  "/foreign-training/installmentpaiddetail-list"
                );
                this.snackBar.open("Information Updated Successfully ", "", {
                  duration: 2000,
                  verticalPosition: "bottom",
                  horizontalPosition: "right",
                  panelClass: "snackbar-success",
                });
              },
              (error) => {
                this.validationErrors = error;
              }
            );
          }
        });
    } else {
      this.loading=true;
      this.InstallmentPaidDetailService.submit(
        this.InstallmentPaidDetailForm.value
      ).subscribe(
        (response) => {
          this.router.navigateByUrl(
          "/foreign-training/installmentpaiddetail-list/:courseDurationId/:traineeId"
          );
          this.snackBar.open("Information Inserted Successfully ", "", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "right",
            panelClass: "snackbar-success",
          });
        },
        (error) => {
          this.validationErrors = error;
        }
      );
    }
  }
}
