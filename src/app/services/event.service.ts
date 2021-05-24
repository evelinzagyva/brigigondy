import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ExtendedCalendarEvent } from 'src/app/model/event/event.module';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  newEvent = new Subject<any>();

  selectedEvent  = new BehaviorSubject<any>(event)

  constructor() { }
}
