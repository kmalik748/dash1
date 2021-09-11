import { Routes } from '@angular/router';

export const DOCTOR_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../doctor-dashboard/doctor.module').then(m => m.DoctorModule)
  }
]
