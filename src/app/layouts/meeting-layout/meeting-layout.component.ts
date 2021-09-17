import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth-service.service";

@Component({
  selector: 'app-meeting-layout',
  templateUrl: './meeting-layout.component.html',
  styleUrls: ['./meeting-layout.component.css']
})
export class MeetingLayoutComponent implements OnInit {

  currentUser = "";
  dashboardLink = "";

  constructor(private service: AuthService,
              private authService: AuthService ) {
  }

  ngOnInit(): void {
    this.currentUser = this.service.userName;


    this.authService.decodeToken().subscribe(
      data=>{
        this.dashboardLink = data.data.userType;
        switch(data.data.userType) {
          case "Admin": {
            this.dashboardLink = "/adminArea";
            break;
          }
          case "Doctor": {
            this.dashboardLink = "/doctorArea";
            break;
          }
          case "Patient": {
            this.dashboardLink = "/patientArea";
            break;
          }
          default: {
            this.dashboardLink = "";
            break;
          }
        }
      }
    );
  }

}
