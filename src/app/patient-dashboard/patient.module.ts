import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientHomeComponent } from './patient-home/patient-home.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { FindDoctorComponent } from './find-doctor/find-doctor.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';

export const routes: Routes = [
  { path: '', component: PatientHomeComponent },
  { path: 'find-doctor', component: FindDoctorComponent },
  { path: 'my-appointments', component: MyAppointmentsComponent }
];

@NgModule({
  declarations: [
    PatientHomeComponent,
    FindDoctorComponent,
    MyAppointmentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class PatientModule { }
