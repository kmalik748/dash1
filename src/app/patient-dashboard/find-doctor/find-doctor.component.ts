import { Component, OnInit } from '@angular/core';
import Stepper from "bs-stepper";


@Component({
  selector: 'app-find-doctor',
  templateUrl: './find-doctor.component.html',
  styleUrls: ['./find-doctor.component.css']
})
export class FindDoctorComponent implements OnInit {

  stepper: any;

  constructor() { }

  ngOnInit(): void {
    this.stepper = new Stepper(<Element>document.querySelector('.bs-stepper'))
  }

  stepNext(): void{
    this.stepper.next()
  }
  stepBack(): void{
    this.stepper.previous()
  }

}
