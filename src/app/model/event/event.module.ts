import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent } from 'calendar-utils';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EventModule { }

export interface ExtendedCalendarEvent extends CalendarEvent{
  location?: string; 
}
