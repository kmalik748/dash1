import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../admin-dashboard/services/users.service";
import {Router} from "@angular/router";
import {AppointmentsInterface} from "../../dataTypes/appointments.interface";
import {PatientService} from "../services/patient.service";
import {UsersDetailsInterface} from "../../dataTypes/users.interface";
import {AuthService} from "../../auth/auth-service.service";
import {getAppointmentsInterface} from "../../dataTypes/getAppointments.interface";
declare var $: any;



@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent implements OnInit {

  appointments: getAppointmentsInterface[];
  loading: boolean = false;
  patientDetails: UsersDetailsInterface | any;

  constructor(private patientService: PatientService,
              private authService: AuthService) {
    this.appointments = [];
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void{
    this.loading = true;
    this.authService.decodeToken().subscribe(
      data=>{
        this.patientDetails = data.data;
        this.patientService.getAppointments(this.patientDetails.id).subscribe(data => {
          this.appointments = data.data;
          $(function () {
            $("#example1").DataTable();
          });
          this.loading = false;
        });
      }
    );
  }

}
