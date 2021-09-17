import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth-service.service";

@Component({
  selector: 'app-meeting-layout',
  templateUrl: './meeting-layout.component.html',
  styleUrls: ['./meeting-layout.component.css']
})
export class MeetingLayoutComponent implements OnInit {

  currentUser = "";

  constructor(private service: AuthService) {
  }

  ngOnInit(): void {
    this.currentUser = this.service.userName;
  }

}
