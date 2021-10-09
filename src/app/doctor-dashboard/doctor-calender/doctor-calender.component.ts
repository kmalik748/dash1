import { Component, OnInit } from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";
import {getAppointmentsInterface} from "../../dataTypes/getAppointments.interface";
import {UsersDetailsInterface} from "../../dataTypes/users.interface";
import {PatientService} from "../../patient-dashboard/services/patient.service";
import {AuthService} from "../../auth/auth-service.service";
import {DoctorsService} from "../services/doctors.service";

@Component({
  selector: 'app-doctor-calender',
  templateUrl: './doctor-calender.component.html',
  styleUrls: ['./doctor-calender.component.css']
})
export class DoctorCalenderComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: []
  };

  appointments: getAppointmentsInterface[];
  loading: boolean = false;
  patientDetails: UsersDetailsInterface | any;

  constructor(private doctorService: DoctorsService,
              private authService: AuthService) {
    this.appointments = [];
  }

  ngOnInit(): void {
    var events: any = [];
    this.loading = true;
    this.authService.decodeToken().subscribe(
      data=>{
        this.patientDetails = data.data;
        this.doctorService.getAppointments(this.patientDetails.id).subscribe(data1 => {
          // var property: any;
          // data1 = data1.data;
          data1.data.forEach(element => {
            console.log(element.DoctorName);
            events.push({ title: element.PatientName, date: element.date_standard, url: '#/doctorArea/appointments' });
          });
          this.calendarOptions= {
            initialView: 'dayGridMonth',
            events: events
          };
          this.loading = false;
        });
      }
    );
  }



}
