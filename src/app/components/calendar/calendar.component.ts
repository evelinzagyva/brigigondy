import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnDestroy
} from '@angular/core';

import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';

import { Subject } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { EventService } from 'src/app/services/event.service';
import { ExtendedCalendarEvent } from 'src/app/model/event/event.module';


registerLocaleData(localeHu);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  selectedHourDate: Date;

  selectedEvent: ExtendedCalendarEvent;

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

  refresh: Subject<any> = new Subject();

  events: ExtendedCalendarEvent[] = [
    {
      start: new Date(2021, 5, 6, 10, 0, 0),
      end: new Date(2021, 5, 6, 15, 0, 0),
      title: "Jóga flow",
      location: "Mandala Stúdió"
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private service: EventService) {

  }

  ngOnInit(): void {

    this.service.event$.subscribe(
      (data) => {
        if (this.selectedEvent) {
          let selectedEventIndex = this.events.findIndex(event => event === this.selectedEvent);
          this.selectedEvent = null;
          this.events[selectedEventIndex] = data;
          this.refresh.next();
        } else {
          this.addEvent(data);
        }

      },
      (err) => console.error(err)
    );
  }

  ngOnDestroy() {
    this.service.event$.unsubscribe()
  }

  hourSegmentClicked(date: Date) {
    this.selectedHourDate = date;
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  handleEvent(event: ExtendedCalendarEvent): void {
    this.selectedHourDate = event.start;
    this.selectedEvent = event;
    this.service.selectedEvent$.next(event);
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(newEvent: ExtendedCalendarEvent): void {
    this.events = [
      ...this.events,
      newEvent
      ,
    ];
  }

  deleteEvent(eventToDelete: ExtendedCalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
