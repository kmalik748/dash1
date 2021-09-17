import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import { AdminDashboardComponent } from './layouts/admin-dashboard/admin-dashboard.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./guards/auth.guard";
import { PatientDashboardLayoutComponent } from './layouts/patient-dashboard-layout/patient-dashboard-layout.component';
import { DoctorDashboardLayoutComponent } from './layouts/doctor-dashboard-layout/doctor-dashboard-layout.component';
import { MeetingLayoutComponent } from './layouts/meeting-layout/meeting-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AuthLayoutComponent,
    PatientDashboardLayoutComponent,
    DoctorDashboardLayoutComponent,
    MeetingLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
