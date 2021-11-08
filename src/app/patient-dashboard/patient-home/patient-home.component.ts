import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth-service.service";
import {PatientDashboardLayoutComponent} from "../../layouts/patient-dashboard-layout/patient-dashboard-layout.component";

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {

  constructor(private authService: AuthService,
              private patLayout: PatientDashboardLayoutComponent) {
    this.patLayout.userImg = authService.userPic;
  }

  ngOnInit(): void {
  }

}
