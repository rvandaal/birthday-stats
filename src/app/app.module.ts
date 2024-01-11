import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDateComponent } from './input-date/input-date.component';
import { InputDatesComponent } from './input-dates/input-dates.component';
import { OutputDatesComponent } from './output-dates/output-dates.component';
import { NumberOfTimesOlderService } from './services/numberOfTimesOlder.service';
import { TogetherNumberOfDaysOldService } from './services/together-number-of-days-old';
import { DateService } from './services/date.service';

@NgModule({
  declarations: [
    AppComponent,
    InputDatesComponent,
    OutputDatesComponent,
    InputDateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [NumberOfTimesOlderService, TogetherNumberOfDaysOldService, DateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
