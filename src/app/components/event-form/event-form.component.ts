import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, OnChanges, DoCheck } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { ExtendedCalendarEvent } from 'src/app/model/event/event.module';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnDestroy {

  eventSubject: Subscription;

  eventForm: FormGroup;

  selectedEvent: ExtendedCalendarEvent;

  title: FormControl;

  @Input() startingDate: Date;

  startingHour: number;

  startingMinute: number;

  startingTime: FormControl;

  endingDate: Date;

  endingTime: FormControl;

  endingHour: number;

  endingMinute: number;

  location: FormControl;

  macska: string = 'macska';

  constructor(private service: EventService, private modal: NgbModal) {

  }

  ngOnInit(): void {


    this.startingHour = this.addZero(this.startingDate.getHours());
    this.startingMinute = this.addZero(this.startingDate.getMinutes());

    this.createForm();


  }

  ngOnDestroy() {
    this.eventSubject.unsubscribe();
    this.service.selectedEvent.next(new Object());
  }

  createForm() {
    this.title = new FormControl('', [Validators.required]);
    this.startingTime = new FormControl(this.startingHour + ":" + this.startingMinute, [Validators.required]);
    this.endingTime = new FormControl('', [Validators.required]);
    this.location = new FormControl('', [Validators.required]);

    this.eventForm = new FormGroup({
      title: this.title,
      startingTime: this.startingTime,
      endingTime: this.endingTime,
      location: this.location
    })
    this.getEventFromCalendar();
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  convertEvent(rawEvent) {
    let startDate = new Date(
      this.startingDate.setHours(
        this.getHours(rawEvent.startingTime),
        this.getMinutes(rawEvent.startingTime))
    )
    let endDate = new Date(
      this.startingDate.setHours(
        this.getHours(rawEvent.endingTime),
        this.getMinutes(rawEvent.endingTime)
      )
    )

    let event: ExtendedCalendarEvent = {
      start: startDate,
      end: endDate,
      title: rawEvent.title,
      location: rawEvent.location,
    };
    return event
  }

  getHours(timeStamp: string) {
    return parseInt(timeStamp.split(":")[0]);
  }

  getMinutes(timeStamp: string) {
    return parseInt(timeStamp.split(":")[1]);
  }

  sendEventToCalendar() {
    this.service.newEvent.next(this.convertEvent(this.eventForm.value))
  }

  getEventFromCalendar() {
    this.eventSubject = this.service.selectedEvent.subscribe(
      event => {
        this.setFormControlsValue(event);
      }
    )
  }

  setFormControlsValue(event) {
    if (event) {
      this.title.patchValue(event.title);
      this.endingDate = event.end;
      if (this.endingDate) {
        this.endingHour = this.addZero(this.endingDate.getHours());
        this.endingMinute = this.addZero(this.endingDate.getMinutes());
        this.endingTime.patchValue(this.endingHour + ":" + this.endingMinute);
      }
      this.location.patchValue(event.location);
    }

  }

  closeModal() {
    this.eventForm.reset();
    this.modal.dismissAll()

  }


}
