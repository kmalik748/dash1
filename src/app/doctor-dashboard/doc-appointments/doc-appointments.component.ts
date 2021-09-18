import { Component, OnInit } from '@angular/core';
import {getAppointmentsInterface} from "../../dataTypes/getAppointments.interface";
import {UsersDetailsInterface} from "../../dataTypes/users.interface";
import {AuthService} from "../../auth/auth-service.service";
import {DoctorsService} from "../services/doctors.service";
declare var $: any;


@Component({
  selector: 'app-doc-appointments',
  templateUrl: './doc-appointments.component.html',
  styleUrls: ['./doc-appointments.component.css']
})
export class DocAppointmentsComponent implements OnInit {

  appointments: getAppointmentsInterface[];
  loading: boolean = false;
  doctorDetails: UsersDetailsInterface | any;

  constructor(private doctorService: DoctorsService,
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
        this.doctorDetails = data.data;
        this.doctorService.getAppointments(this.doctorDetails.id).subscribe(data => {
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
