import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {getAppointmentsInterface} from "../../dataTypes/getAppointments.interface";
import {UsersDetailsInterface} from "../../dataTypes/users.interface";
import {PatientService} from "../services/patient.service";
import {AuthService} from "../../auth/auth-service.service";
declare var $: any;


@Component({
  selector: 'app-patient-calender',
  templateUrl: './patient-calender.component.html',
  styleUrls: ['./patient-calender.component.css']
})
export class PatientCalenderComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: []
  };

  appointments: getAppointmentsInterface[];
  loading: boolean = false;
  patientDetails: UsersDetailsInterface | any;

  constructor(private patientService: PatientService,
              private authService: AuthService) {
    this.appointments = [];
  }

  ngOnInit(): void {
    var events: any = [];
    this.loading = true;
    this.authService.decodeToken().subscribe(
      data=>{
        this.patientDetails = data.data;
        this.patientService.getAppointments(this.patientDetails.id).subscribe(data1 => {
          // var property: any;
          // data1 = data1.data;
          data1.data.forEach(element => {
            console.log(element.DoctorName);
              events.push({ title: element.DoctorName, date: element.date_standard, url: '#/patientArea/my-appointments' });
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
