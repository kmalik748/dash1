import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth-service.service";
import {DoctorDashboardLayoutComponent} from "../../layouts/doctor-dashboard-layout/doctor-dashboard-layout.component";
import {DoctorsService} from "../services/doctors.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  previousApp = 0;
  upcomingApp = 0;
  consults = 0;
  alerts = 0;

  constructor(private authService: AuthService,
              private docLayout: DoctorDashboardLayoutComponent,
              private docService: DoctorsService) {
    this.docLayout.userImg = authService.userPic;
    this.docService.getDashboardStats(this.authService.getToken()).subscribe(data =>{
      this.previousApp = data.data.previousAppointments;
      this.upcomingApp = data.data.upcomingAppointments;
      this.consults = data.data.consults;
    });
  }

  ngOnInit(): void {
  }

}
