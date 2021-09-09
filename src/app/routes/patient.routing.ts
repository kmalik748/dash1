import { Routes } from '@angular/router';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../patient-dashboard/patient.module').then(m => m.PatientModule)
  }
]
