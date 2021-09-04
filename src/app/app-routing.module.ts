import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./layouts/admin-dashboard/admin-dashboard.component";
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'adminArea',
    component: AdminDashboardComponent,
    loadChildren: () => import('./admin-dashboard/adminDashboard.module').then(m => m.AdminDashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
