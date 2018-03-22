import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

import { DanCalendarEvent } from '../dancalendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  current_event: DanCalendarEvent;

  view: string = 'month';

  viewDate: Date = new Date();

  events = []

  modalData: {
    action: string;
    event: DanCalendarEvent;
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)

    var events = window.localStorage.getItem("events")
    if (events) {

      // for (var event in JSON.parse(events)) {
      //   console.log(event)
      // }

      //this.events = JSON.parse(events)

      // console.log(JSON.parse(events)[0])

      var calEvents:DanCalendarEvent[] = JSON.parse(events)

      // console.log(calEvents.length)

      for (var i = 0; i < calEvents.length; i++) {
        var event = calEvents[i]

        event.start = new Date(event.start)
        event.end = new Date(event.end)

        this.events.push(event)

      }

      // console.log(event)

    }
  }
  
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  //: DanCalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     description: ""
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     description: ""
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     description: ""
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true,
  //     description: ""
  //   }
  // ];

  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal, private route: ActivatedRoute,) {}

  dayClicked({ date, events }: { date: Date; events: DanCalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
        this.addEvent(date)
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: any): void {
    this.current_event = event;
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(date): void {
   
    if (!date)
      date = new Date()

    var end_date = new Date(date.getTime())
    end_date = new Date(end_date.setMinutes(end_date.getMinutes() + 30))
    
    // console.log(date)
    // console.log(end_date)  

    this.current_event = {
      title: '',
      start: date,
      end: end_date,
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      description: ""
    };
    //this.refresh.next();

    var action = ""
    //console.log(this.events)
    var event = this.current_event
    
    //this.current_event = event;
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  saveEvent() {
    this.events.push(this.current_event);
    this.refresh.next();

    window.localStorage.setItem('events', JSON.stringify(this.events))
  }

  addEventWeekDay(event) {
    this.addEvent(event.day.date)
    //console.log(event.day.date)
  }

  addEventDayView(event) {
    this.addEvent(event.date)
    //console.log(event.date)
  }

}
