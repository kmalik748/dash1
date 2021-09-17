import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../admin-dashboard/services/users.service";
import {Router} from "@angular/router";
import {AppointmentsInterface} from "../../dataTypes/appointments.interface";
import {PatientService} from "../services/patient.service";
import {UsersDetailsInterface} from "../../dataTypes/users.interface";
import {AuthService} from "../../auth/auth-service.service";
declare var $: any;



@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent implements OnInit {

  appointments: AppointmentsInterface[];
  loading: boolean = false;
  patientDetails: UsersDetailsInterface | any;

  constructor(private patientService: PatientService,
              private authService: AuthService) {
    this.appointments = [];
    this.patientDetails = this.authService.decodeToken().subscribe(
      data=>{
        return  data.data;
      }
    );
  }

  ngOnInit(): void {
  }

  getAppointments(): void{
    this.loading = true;
    this.patientService.getAppointments(this.patientDetails.id).subscribe(data => {
      this.appointments = data;
      this.loading = false;

      $(function () {
        $("#example1").DataTable();
      });
    });
  }

}
