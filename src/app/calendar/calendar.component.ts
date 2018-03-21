import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
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

// import { Component, OnInit } from '@angular/core';

// import { ChangeDetectionStrategy } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { map } from 'rxjs/operators/map';
// import { CalendarEvent } from 'angular-calendar';
// import {
//   isSameMonth,
//   isSameDay,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   startOfDay,
//   endOfDay,
//   format
// } from 'date-fns';
// import { Observable } from 'rxjs/Observable';
// // import { colors } from '../demo-utils/colors';

// interface Film {
//   id: number;
//   title: string;
//   release_date: string;
// }

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

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

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
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

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  // constructor() { }

  // ngOnInit() {
  // }


  // view: string = 'month';

  // viewDate: Date = new Date();

  // events$; // : Observable<Array<CalendarEvent<{ film: Film }>>>;

  // activeDayIsOpen: boolean = false;

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.fetchEvents();
  // }

  // fetchEvents(): void {
  //   const getStart: any = {
  //     month: startOfMonth,
  //     week: startOfWeek,
  //     day: startOfDay
  //   }[this.view];

  //   const getEnd: any = {
  //     month: endOfMonth,
  //     week: endOfWeek,
  //     day: endOfDay
  //   }[this.view];

  //   const params = new HttpParams()
  //     .set(
  //       'primary_release_date.gte',
  //       format(getStart(this.viewDate), 'YYYY-MM-DD')
  //     )
  //     .set(
  //       'primary_release_date.lte',
  //       format(getEnd(this.viewDate), 'YYYY-MM-DD')
  //     )
  //     .set('api_key', '0ec33936a68018857d727958dca1424f');

  //   this.events$ = this.http
  //     .get('https://api.themoviedb.org/3/discover/movie', { params })
  //     .pipe(
  //       map(({ results }: { results: Film[] }) => {
  //         return results.map((film: Film) => {
  //           return {
  //             title: film.title,
  //             start: new Date(film.release_date),
  //             color: "blue",
  //             meta: {
  //               film
  //             }
  //           };
  //         });
  //       })
  //     );
  // }

  // dayClicked({
  //   date,
  //   events
  // }: {
  //   date: Date;
  //   events: Array<CalendarEvent<{ film: Film }>>;
  // }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false;
  //     } else {
  //       this.activeDayIsOpen = true;
  //       this.viewDate = date;
  //     }
  //   }
  // }

  // eventClicked(event: CalendarEvent<{ film: Film }>): void {
  //   window.open(
  //     `https://www.themoviedb.org/movie/${event.meta.film.id}`,
  //     '_blank'
  //   );
  // }
}
