import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth-service.service";

@Component({
  selector: 'app-doctor-dashboard-layout',
  templateUrl: './doctor-dashboard-layout.component.html',
  styleUrls: ['./doctor-dashboard-layout.component.css']
})
export class DoctorDashboardLayoutComponent implements OnInit {

  currentUser = "";
  userImg = "pic.png";

  constructor(private service: AuthService) {
  }

  ngOnInit(): void {
    this.currentUser = this.service.userName;
  }

}
