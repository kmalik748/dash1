import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./layouts/admin-dashboard/admin-dashboard.component";
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {AuthGuard} from "./guards/auth.guard";
import {PatientDashboardLayoutComponent} from "./layouts/patient-dashboard-layout/patient-dashboard-layout.component";
import {DoctorDashboardLayoutComponent} from "./layouts/doctor-dashboard-layout/doctor-dashboard-layout.component";
import {MeetingLayoutComponent} from "./layouts/meeting-layout/meeting-layout.component";
import {HomepageComponent} from "./layouts/homepage/homepage.component";
import {Page404Component} from "./layouts/page404/page404.component";
import {TermsServicesComponent} from "./layouts/terms-services/terms-services.component";

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: '',
    component: HomepageComponent
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'adminArea',
    component: AdminDashboardComponent,
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./admin-dashboard/adminDashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: 'patientArea',
    component: PatientDashboardLayoutComponent,
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./patient-dashboard/patient.module').then(m => m.PatientModule)
  },
  {
    path: 'doctorArea',
    component: DoctorDashboardLayoutComponent,
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./doctor-dashboard/doctor.module').then(m => m.DoctorModule)
  },
  {
    path: 'meeting',
    component: MeetingLayoutComponent,
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./meeting-area/meeting.module').then(m => m.MeetingModule)
  },
  {
    path: 'TermsOfServices',
    component: TermsServicesComponent
  },


  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
