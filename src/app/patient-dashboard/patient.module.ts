import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientHomeComponent } from './patient-home/patient-home.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { FindDoctorComponent } from './find-doctor/find-doctor.component';

export const routes: Routes = [
  { path: '', component: PatientHomeComponent },
  { path: 'find-doctor', component: FindDoctorComponent }
];

@NgModule({
  declarations: [
    PatientHomeComponent,
    FindDoctorComponent
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
