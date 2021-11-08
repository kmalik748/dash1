import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientHomeComponent } from './patient-home/patient-home.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FindDoctorComponent } from './find-doctor/find-doctor.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { DoctorDetailsComponent } from './find-doctor/doctor-details/doctor-details.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PatientCalenderComponent } from './patient-calender/patient-calender.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
]);

export const routes: Routes = [
  { path: '', component: PatientHomeComponent },
  { path: 'find-doctor', component: FindDoctorComponent },
  { path: 'my-appointments', component: MyAppointmentsComponent },
  { path: 'calender', component: PatientCalenderComponent },
  { path: 'prescription/:id', component: PrescriptionComponent },
  { path: 'myProfile', component: PatientProfileComponent }
];

@NgModule({
  declarations: [
    PatientHomeComponent,
    FindDoctorComponent,
    MyAppointmentsComponent,
    DoctorDetailsComponent,
    PrescriptionComponent,
    PatientCalenderComponent,
    PatientProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule
  ],
  exports: [
    RouterModule
  ]
})
export class PatientModule { }
