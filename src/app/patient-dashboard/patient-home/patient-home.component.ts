import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth-service.service";
import {PatientDashboardLayoutComponent} from "../../layouts/patient-dashboard-layout/patient-dashboard-layout.component";
import {PatientService} from "../services/patient.service";

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {

  previousApp = 0;
  upcomingApp = 0;
  consults = 0;
  alerts = 0;

  constructor(private authService: AuthService,
              private patLayout: PatientDashboardLayoutComponent,
              private patService: PatientService) {
    this.patLayout.userImg = authService.userPic;
    this.patService.getDashboardStats(this.authService.getToken()).subscribe(data =>{
      this.previousApp = data.data.previousAppointments;
      this.upcomingApp = data.data.upcomingAppointments;
      this.consults = data.data.consults;
    });
  }

  ngOnInit(): void {
  }

}
