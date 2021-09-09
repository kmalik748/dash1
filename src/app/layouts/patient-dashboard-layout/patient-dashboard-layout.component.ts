import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth-service.service";

@Component({
  selector: 'app-patient-dashboard-layout',
  templateUrl: './patient-dashboard-layout.component.html',
  styleUrls: ['./patient-dashboard-layout.component.css']
})
export class PatientDashboardLayoutComponent implements OnInit {

  currentUser = "";

  constructor(private service: AuthService) {
  }

  ngOnInit(): void {
    this.currentUser = this.service.userName;
  }

}
