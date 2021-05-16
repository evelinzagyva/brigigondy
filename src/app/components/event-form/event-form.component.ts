import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExtendedCalendarEvent } from 'src/app/model/event/event.module';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  @Input() startingDate: Date;

  startingHour: number;

  startingMinute;

  eventForm: FormGroup;

  constructor(private service: EventService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.startingHour = this.addZero(this.startingDate.getHours());
    this.startingMinute = this.addZero(this.startingDate.getMinutes());

    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      startingTime: new FormControl(this.startingHour + ":" + this.startingMinute, [Validators.required]),
      endingTime: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required])
    })

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
    this.service.event.next(this.convertEvent(this.eventForm.value))
  }

  closeModal() {
    this.modal.dismissAll()
  }


}
