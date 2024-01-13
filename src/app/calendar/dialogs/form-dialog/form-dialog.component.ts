import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CalendarService } from '../../service/calendar.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Calendar } from '../../models/calendar';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar: Calendar;
  courseTitle: any;
  noOfCandidates:any;
  durationFrom:any;
  durationTo:any;
  professional:any;
  nbcd:any;
  location:any;
  remark:any;
  showDeleteBtn = false;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: CalendarService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.calendar.title;
      this.calendar = data.calendar;
      console.log("check");
      console.log(this.calendar);
      this.courseTitle = this.calendar.courseTitle;
      this.durationFrom = this.calendar.durationForm;
      this.durationTo = this.calendar.durationTo;
      this.noOfCandidates = this.calendar.noOfCandidates;
      this.professional = this.calendar.professional;
      this.nbcd = this.calendar.nbcd;
      this.location = this.calendar.location;
      this.remark = this.calendar.remark;
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'New Event';
      this.calendar = new Calendar({});
      this.showDeleteBtn = false;
    }

    this.calendarForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.calendar.id],
      title: [
        this.calendar.title,
        [Validators.required]
      ],
      courseTitle: [this.calendar.courseTitle],
      durationForm: [this.calendar.durationForm],
      durationTo:  [this.calendar.durationTo],
      startDate: [this.calendar.startDate,
      [Validators.required]
      ],
      endDate: [this.calendar.endDate,
      [Validators.required]
      ],
      details: [
        this.calendar.details],
    });
  }
  submit() {
    // emppty stuff
  }
  deleteEvent() {
    this.calendarService.deleteCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('delete');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.calendarService.addUpdateCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('submit');
  }
}
