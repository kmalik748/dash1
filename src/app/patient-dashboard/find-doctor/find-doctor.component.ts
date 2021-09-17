import { Component, OnInit } from '@angular/core';
import Stepper from "bs-stepper";
import {PatientService} from "../services/patient.service";
import {DocSearchesInterface} from "../../dataTypes/docSearches.interface";
import {DocTimingsInterface} from "../../dataTypes/docTimings.interface";
import {AuthService} from "../../auth/auth-service.service";
import {UsersDetailsInterface} from "../../dataTypes/users.interface";
import {PatientDashboardLayoutComponent} from "../../layouts/patient-dashboard-layout/patient-dashboard-layout.component";
import {Router} from "@angular/router";
declare var $: any;


@Component({
  selector: 'app-find-doctor',
  templateUrl: './find-doctor.component.html',
  styleUrls: ['./find-doctor.component.css']
})
export class FindDoctorComponent implements OnInit {

  query = "";
  stepper: any;
  loading = false;
  doctorsFound = 0;
  doctorsList: DocSearchesInterface[] = [];
  selectedDoctor = 0;
  timeSlots: String[] = [];
  dateSlots: String[] = [];
  finalTIme: String = "";
  finalDate: String = "";
  patientDetails: UsersDetailsInterface;
  doctorDetails: { fees: any; name: any; id: any; } | undefined;

  constructor(private patientService: PatientService,
              private authService: AuthService,
              private router: Router) {
    this.patientDetails = {
      id: 0,
      first_name: '',
      middle_name: '',
      last_name: '',
      gender: '',
      dob: '',
      city: '',
      state: '',
      country: '',
      email: '',
      phone_number: '',
      password: '',
      userType: ''
    };
  }

  ngOnInit(): void {
    this.stepper = new Stepper(<Element>document.querySelector('.bs-stepper'))
  }

  stepNext(): void{
    this.stepper.next()
  }
  stepBack(): void{
    this.stepper.previous()
  }

  saveAppointment(): void{
    this.loading = true;
    this.patientService.saveAppointment(this.patientDetails.id, this.doctorDetails?.id, this.finalDate, this.finalTIme).subscribe(data=>{
      console.log(data);
      if(data.Result){
        $(document).Toasts('create', {
          class: 'bg-success',
          title: 'Appointment Booked!',
          subtitle: 'Just Now',
          body: 'Your appointment was successfully booked. You will be informed through registered email'
        });
        this.loading = false;
        this.router.navigate(['patientArea', 'my-appointments']);
      }
    });
  }

  getDocProfiles(): void{
    this.loading = true;
    this.stepNext();
    this.patientService.getDocProfiles(this.query).subscribe(
      data=>{
        console.log(data);
        this.doctorsList = data.Doctors;
        this.doctorsList = data.Doctors;
        this.doctorsFound = data.TotalRows;
        this.loading = false;
        console.log(this.doctorsList);
      }
    );
  }

  selectDoctor(data: { fees: any; name: any; id: any }): void{
    // let arr: any = [];
    // Object.keys(data).map(function(key: any){
    //   arr.push({[key]:data[key]})
    //   return arr;
    // });
    // arr = arr[0][0];
    // console.log(arr);

    this.doctorDetails = data;
    console.log(data);
    this.getDocTimings();
  }

  getDocTimings(): void{
    this.stepNext();
    this.loading = true;
    this.patientService.getDocTimings(this.doctorDetails?.id).subscribe(
      (data: DocTimingsInterface) =>{
       // this.timeSlots = data.
        this.timeSlots = data.times;
        this.dateSlots = data.dates;
        this.loading = false;
      }
    );
  }

  setFinalTime(time: String): void{
    this.finalTIme = time;
  }

  setFinalDate(date: String): void{
    console.log(date);
    this.finalDate = date;
  }

  getPatientDetails(): void{
    this.loading = true;
    this.stepNext();
    this.authService.decodeToken().subscribe(
      data=>{
          this.patientDetails = data.data;
          this.loading = false;
      }
    );
  }

}
