import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { InputDatesComponent } from './input-dates/input-dates.component';
import { OutputDatesComponent } from './output-dates/output-dates.component';
import { InputDateComponent } from './input-date/input-date.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AantalKeerOuderService } from './services/aantal-keer-ouder.service';
import { SamenZoveelDagenOudService } from './services/samen-zoveel-dagen-oud.service';

@NgModule({
  declarations: [
    AppComponent,
    InputDatesComponent,
    OutputDatesComponent,
    InputDateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  providers: [
    AantalKeerOuderService,
    SamenZoveelDagenOudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
