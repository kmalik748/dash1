import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth-service.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  currentUser = "";

  constructor(private service: AuthService) {
  }

  ngOnInit(): void {
    this.currentUser = this.service.userName;
  }

}
