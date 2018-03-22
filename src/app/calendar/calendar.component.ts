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

  calendar_name:string;

  show_name = false;

  view: string = 'month';

  viewDate: Date = new Date();

  events = []

  modalData: {
    action: string;
    event: DanCalendarEvent;
  };

  newEvent = false

  ngOnInit() {
    this.calendar_name = this.route.snapshot.paramMap.get('id');
    //console.log(id)

    var all_events = JSON.parse(window.localStorage.getItem("all_events"))
    if (!all_events) {
      all_events = []
    }
    if (!all_events.includes(this.calendar_name)) {
      all_events.push(this.calendar_name)
      window.localStorage.setItem("all_events", JSON.stringify(all_events))
    }
    
    var events = window.localStorage.getItem(this.calendar_name)
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
        if (!this.activeDayIsOpen) 
          this.addEvent(date)
        this.activeDayIsOpen = false;
        
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
    this.newEvent = false
    this.current_event = event;
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(date): void {

    if (this.activeDayIsOpen)
      date = this.viewDate

    this.newEvent = true
   
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
    if (!this.events.includes(this.current_event)) {
      this.events.push(this.current_event);
      this.refresh.next();
  
      window.localStorage.setItem(this.calendar_name, JSON.stringify(this.events))
    }
    
  }

  addEventWeekDay(event) {
    this.addEvent(event.day.date)
    //console.log(event.day.date)
  }

  addEventDayView(event) {
    this.addEvent(event.date)
    //console.log(event.date)
  }

  save_name() {
    console.log("wag")
    this.show_name = true;

  }

  delete(idx) {
      this.events.splice(idx, 1)
      this.refresh.next()
      window.localStorage.setItem(this.calendar_name, JSON.stringify(this.events))
      
      this.activeDayIsOpen = false;
  }

}
