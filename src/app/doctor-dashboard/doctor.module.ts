import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { DocAppointmentsComponent } from './doc-appointments/doc-appointments.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile-settings', component: ProfileSettingsComponent },
  { path: 'appointments', component: DocAppointmentsComponent },
];


@NgModule({
  declarations: [
    HomeComponent,
    ProfileSettingsComponent,
    DocAppointmentsComponent
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
export class DoctorModule { }
