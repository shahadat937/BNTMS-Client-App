import { Component, ViewChild, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/angular';

import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Calendar } from '../models/calendar';
import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';
import { CalendarService } from '../service/calendar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INITIAL_EVENTS } from '../events-util';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UnsubscribeOnDestroyAdapter } from '../../shared/UnsubscribeOnDestroyAdapter';
import {dashboardService} from '../../admin/dashboard/services/dashboard.service';
import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @ViewChild('calendar', { static: false })
  calendar: Calendar | null;
  public addCusForm: FormGroup;
  dialogTitle: string;
  filterOptions = 'All';
  calendarData: any;
  filterItems: string[] = [
    'work',
    'personal',
    'important',
    'travel',
    'friends',
  ];

  calendarEvents: EventInput[];
  tempEvents: EventInput[];

  public filters = [
    { name: 'work', value: 'Work', checked: true },
    { name: 'personal', value: 'Personal', checked: true },
    { name: 'important', value: 'Important', checked: true },
    { name: 'travel', value: 'Travel', checked: true },
    { name: 'friends', value: 'Friends', checked: true },
  ];

  branchId:any;
  traineeId:any;
  role:any;

  constructor( private fb: FormBuilder,private authService: AuthService, private dashboardService: dashboardService,private dialog: MatDialog, public calendarService: CalendarService, private snackBar: MatSnackBar) {
    super();
    this.dialogTitle = 'Add New Event';
    this.calendar = new Calendar({});
    this.addCusForm = this.createCalendarForm(this.calendar);
  }
 


  public ngOnInit(): void {

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    
  //    this.calendarEvents = INITIAL_EVENTS;
  //    console.log(INITIAL_EVENTS)
  //   // this.tempEvents = this.calendarEvents;
  //    this.calendarOptions.initialEvents = this.calendarEvents;
  //  //this.initializeEvents()
    

   this.dashboardService.getCourseDurationForEventCalendar().subscribe(res=>{
   
    //  this.calendarEvents=INITIAL_EVENTS;
    this.calendarEvents= res;
    console.log(res)
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      initialView: 'dayGridMonth',
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      events:this.calendarEvents,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
    };
    
      
    });
  }

  initializeEvents(){
    this.calendarService.getCourseDurationForEventCalendar().subscribe(res=>{
      //var durationData: EventInput[] = res;
      const durationData: EventInput[] =res;
      console.log(durationData)
      this.calendarEvents=durationData
    //  this.tempEvents = this.calendarEvents;
      this.calendarOptions.initialEvents = this.calendarEvents;
      
    });
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  handleDateSelect(selectInfo: DateSelectArg) {
    this.addNewEvent();
  }

  addNewEvent() {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: this.calendar,
        action: 'add',
      },
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.calendarData = this.calendarService.getDialogData();

        this.calendarEvents = this.calendarEvents.concat({
          // add new event data. must create new array
          id: this.calendarData.id,
          title: this.calendarData.title,
          start: this.calendarData.startDate,
          end: this.calendarData.endDate,
          className: this.getClassNameValue(this.calendarData.category),
          groupId: this.calendarData.category,
          details: this.calendarData.details,
        });
        this.calendarOptions.events = this.calendarEvents;
        this.addCusForm.reset();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  changeCategory(event: MatCheckboxChange, filter) {
    if (event.checked) {
      this.filterItems.push(filter.name);
    } else {
      this.filterItems.splice(this.filterItems.indexOf(filter.name), 1);
    }
    this.filterEvent(this.filterItems);
  }

  filterEvent(element) {
    const list = this.calendarEvents.filter((x) =>
      element.map((y) => y).includes(x.groupId)
    );

    this.calendarOptions.events = list;
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.eventClick(clickInfo);
  }

  eventClick(row) {
    console.log("check event click")
    console.log(row)
    const calendarData: any = {
      id: row.event.id,
      title: row.event.title,
      courseTitle: row.event._def.extendedProps.courseTitle,
      durationForm: row.event._def.extendedProps.durationFrom,
      durationTo: row.event._def.extendedProps.durationTo,
      noOfCandidates: row.event._def.extendedProps.noOfCandidates,
      professional: row.event._def.extendedProps.professional,
      nbcd: row.event._def.extendedProps.nbcd,
      location: row.event._def.extendedProps.location,
      remark: row.event._def.extendedProps.remark,
      startDate: row.event.start,
      endDate: row.event.end,
      details: row.event.extendedProps.details,
    }; 

    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: calendarData,
        action: 'edit',
      },
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents.forEach(function (element, index) {
          if (this.calendarData.id === element.id) {
            this.editEvent(index, this.calendarData);
          }
        }, this);
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
        this.addCusForm.reset();
      } else if (result === 'delete') {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents.forEach(function (element, index) {
          if (this.calendarData.id === element.id) {
            row.event.remove();
          }
        }, this);

        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  editEvent(eventIndex, calendarData) {
    const calendarEvents = this.calendarEvents.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    singleEvent.title = calendarData.title;
    singleEvent.start = calendarData.startDate;
    singleEvent.end = calendarData.endDate;
    singleEvent.className = this.getClassNameValue(calendarData.category);
    singleEvent.groupId = calendarData.category;
    singleEvent.details = calendarData.details;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array

    this.calendarOptions.events = calendarEvents;
  }

  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
  }

  createCalendarForm(calendar): FormGroup {
    return this.fb.group({
      id: [calendar.id],
      title: [
        calendar.title,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      category: [calendar.category],
      startDate: [calendar.startDate, [Validators.required]],
      endDate: [calendar.endDate, [Validators.required]],
      details: [
        calendar.details,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getClassNameValue(category) {
    let className: string;

    if (category === 'work') className = 'fc-event-success';
    else if (category === 'personal') className = 'fc-event-warning';
    else if (category === 'important') className = 'fc-event-primary';
    else if (category === 'travel') className = 'fc-event-danger';
    else if (category === 'friends') className = 'fc-event-info';

    return className;
  }
}
