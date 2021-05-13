import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  @Input() startingDate: Date;

  startingHour : number ;

  startingMinute;

  eventForm : FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.startingHour = this.addZero(this.startingDate.getHours());
    this.startingMinute = this.addZero(this.startingDate.getMinutes()); 
    
    this.eventForm = new FormGroup({
      title : new FormControl('', [Validators.required]),
      startingTime : new FormControl(this.startingHour+ ":" + this.startingMinute),
      endingTime : new FormControl('', [Validators.required]),
      location : new FormControl('', [Validators.required])
    })

  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

}
