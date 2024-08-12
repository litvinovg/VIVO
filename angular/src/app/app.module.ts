import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportingModule } from './reporting/reporting.module';
import { StepperDataService } from './reporting/services/stepper-data.service';
import {provideHttpClient} from "@angular/common/http";

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
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
