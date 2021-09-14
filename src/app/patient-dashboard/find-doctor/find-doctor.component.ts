import { Component, OnInit } from '@angular/core';
import Stepper from "bs-stepper";
import {PatientService} from "../services/patient.service";
import {DocSearchesInterface} from "../../dataTypes/docSearches.interface";
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

  constructor(private patientService: PatientService) { }

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
    this.patientService.saveAppointment().subscribe(data=>{
      console.log(data);
      if(data.Result){
        $(document).Toasts('create', {
          class: 'bg-success',
          title: 'Appointment Booked!',
          subtitle: 'Just Now',
          body: 'Your appointment was successfully booked. You will be informed through registered email'
        });
        this.loading = false;
      }
    });
  }

  getDocProfiles(): void{
    this.loading = true;
    this.stepNext();
    this.patientService.getDocProfiles(this.query).subscribe(
      data=>{
        console.log(data);
        this.doctorsFound = data.TotalRows;
        this.loading = false;
      }
    );
  }

}
