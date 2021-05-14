import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  event = new Subject<any>();

  constructor() { }
}
