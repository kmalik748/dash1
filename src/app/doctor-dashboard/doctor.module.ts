import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { DocAppointmentsComponent } from './doc-appointments/doc-appointments.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile-settings', component: ProfileSettingsComponent },
  { path: 'appointments', component: DocAppointmentsComponent },
  { path: 'prescription/:id', component: PrescriptionComponent }
];


@NgModule({
  declarations: [
    HomeComponent,
    ProfileSettingsComponent,
    DocAppointmentsComponent,
    PrescriptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class DoctorModule { }
