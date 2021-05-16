import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import {
  CalendarEvent,
  CalendarView,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

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

import { Subject } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { EventService } from 'src/app/services/event.service';
import { ExtendedCalendarEvent } from 'src/app/model/event/event.module';


registerLocaleData(localeHu);

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  selectedHourDate: Date;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  locale: string = 'hu';

  dayStartHour: number = 7;

  dayEndHour: number = 19;

  ONE_HOUR: number = 60 * 60 * 1000;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: ExtendedCalendarEvent[] = [
    { 
      start: new Date(2021, 4, 13, 10, 0, 0), 
      end: new Date(2021, 4, 13, 11, 0, 0), 
      title: "Jóga flow", 
      location: "Mandala Stúdió" 
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private service: EventService) {

  }

  ngOnInit(): void {

    this.service.event.subscribe(
      (data) => {
        this.addEvent(data);
        this.modal.dismissAll()
      },
      (err) => console.error(err)
    )

  }

  ngOnDestroy() {
    this.service.event.unsubscribe()
  }

  hourSegmentClicked(date: Date) {
    this.selectedHourDate = date;
    this.modal.open(this.modalContent, { size: 'lg' });
  }


  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(newEvent: CalendarEvent): void {
    console.log(newEvent);
    this.events = [
      ...this.events,
      newEvent
      ,
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
