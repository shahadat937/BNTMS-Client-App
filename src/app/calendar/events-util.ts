import { EventInput } from "@fullcalendar/angular";

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: "event1",
    title: "All Day Event",
    start: "2022-02-14T18:00:00",
    // start: new Date(year, month, day + 20, 10, 0),
    //end: new Date(year, month, 1, 23, 59),
     className: "fc-event-success",
     allDay: true,
    groupId: "work",
    details:
      "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
  },
  {
    id: "event2",
    title: "Break",
    start: "2022-01-29T18:00:00",
    // start: new Date(year, month, day + 20, 10, 0),
    //end: new Date(year, month, day + 29, 20, 0),
    // allDay: false,
     className: "fc-event-primary",
     allDay: true,
    groupId: "important",
    details:
      "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. ",
  },
  {
    id: "event3",
    title: "Shopping",
    start: "2022-03-07T18:00:00",
    // start: new Date(year, month, day + 20, 10, 0),
    //end: new Date(year, month, day + 4, 20, 0),
    // allDay: false,
    className: "fc-event-warning",
    allDay: true,
    groupId: "personal",
    details:
      "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. ",
  },
  {
    id: "event4",
    title: "Meeting",
    start: "2022-03-12T18:00:00",
    // start: new Date(year, month, day + 20, 10, 0),
    //end: new Date(year, month, day + 16, 20, 0),
    // allDay: false,
    className: "fc-event-success",
    allDay: true,
    groupId: "work",
    details:
      "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
  },
  {
    id: "event5",
    title: "Lunch",
    start: "2022-03-22T18:00:00",
    // start: new Date(year, month, day + 20, 10, 0),
    //end: new Date(year, month, day, 14, 0),
    // allDay: false,
    className: "fc-event-primary",
    allDay: true,
    groupId: "important",
    details:
      "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
  },
  {
    id: "event6",
    title: "Meeting",
    start: "2022-04-02T18:00:00",
    // start: new Date(year, month, day + 20, 10, 0),
    //end: new Date(year, month, day + 2, 14, 30),
    // allDay: false,
    className: "fc-event-success",
    allDay: true,
    groupId: "work",
    details:
      "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
  },
  {
    id: "event7",
    title: "Birthday Party",
    start: "2022-04-02T18:00:00",
    allDay: true,
    // start: new Date(year, month, day + 20, 10, 0),
    //end: new Date(year, month, day + 17, 19, 30),
    // allDay: false,
    className: "fc-event-warning",
    groupId: "personal",
    details:
      "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
  },
  {
    id: "event8",
    title: "Go to Delhi",
    start: "2022-04-12T18:00:00",
    allDay: true,
    // start: new Date(year, month, day + 20, 10, 0),
    //end: new Date(year, month, day + -4, 10, 30),
    // allDay: false,
    className: "fc-event-danger",
    groupId: "travel",
    details:
      "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
  },
  {
    id: "event9",
    title: "Get To Gather",
    start: "2022-03-02T18:00:00",
    // start: new Date(year, month, day + 20, 10, 0),
    //end: new Date(year, month, day + 7, 10, 30),
    // allDay: false,
    className: "fc-event-info",
    allDay: true,
    groupId: "friends",
    details:
      "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
  },
  {
    id: "event10",
    title: "Collage Party",
    start: "2022-04-04T18:00:00",
    // start: new Date(year, month, day + 20, 10, 0),
    //end: new Date(year, month, day + 20, 10, 30),
    allDay: false,
    className: "fc-event-info",
    // allDay: true,
    groupId: "friends",
    details:
      "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
  },
];
