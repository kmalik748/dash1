import { Routes } from '@angular/router';

export const MEETING_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../meeting-area/meeting.module').then(m => m.MeetingModule)
  }
]
