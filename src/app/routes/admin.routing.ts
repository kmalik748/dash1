import { Routes } from '@angular/router';

export const ADMIN_ROUTE: Routes = [
  {
    path: '',
    loadChildren: () => import('../admin-dashboard/adminDashboard.module').then(m => m.AdminDashboardModule)
  }
]
