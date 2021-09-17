import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingHomeComponent } from './meeting-home/meeting-home.component';
import {RouterModule, Routes} from "@angular/router";

import {SharedModule} from "../shared/shared.module";

export const routes: Routes = [
  { path: 'join/:id', component: MeetingHomeComponent }
];

@NgModule({
  declarations: [
    MeetingHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [
    RouterModule
  ]
})
export class MeetingModule { }
