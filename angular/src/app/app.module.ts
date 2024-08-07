import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportingModule } from './reporting/reporting.module';
import { StepperDataService } from './reporting/services/stepper-data.service';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReportingModule
  ],
  providers: [
    StepperDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
