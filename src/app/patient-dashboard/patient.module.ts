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

export const routes: Routes = [
  { path: '', component: PatientHomeComponent },
  { path: 'find-doctor', component: FindDoctorComponent },
  { path: 'my-appointments', component: MyAppointmentsComponent },
  { path: 'prescription', component: PrescriptionComponent }
];

@NgModule({
  declarations: [
    PatientHomeComponent,
    FindDoctorComponent,
    MyAppointmentsComponent,
    DoctorDetailsComponent,
    PrescriptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class PatientModule { }
