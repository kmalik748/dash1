import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth-service.service";
import {DoctorDashboardLayoutComponent} from "../../layouts/doctor-dashboard-layout/doctor-dashboard-layout.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
              private docLayout: DoctorDashboardLayoutComponent) {
    this.docLayout.userImg = authService.userPic;
  }

  ngOnInit(): void {
  }

}
