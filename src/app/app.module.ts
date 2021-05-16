import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ClassesComponent } from './components/classes/classes.component';
import { FooterComponent } from './components/footer/footer.component';
import { InstaFeedComponent } from './components/insta-feed/insta-feed.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventModule } from './model/event/event.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeroSectionComponent,
    IntroductionComponent,
    ClassesComponent,
    FooterComponent,
    InstaFeedComponent,
    CalendarComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CommonModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    ReactiveFormsModule,
    EventModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
