import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./layouts/admin-dashboard/admin-dashboard.component";
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {AuthGuard} from "./guards/auth.guard";
import {PatientDashboardLayoutComponent} from "./layouts/patient-dashboard-layout/patient-dashboard-layout.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
