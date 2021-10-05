import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DoctorsService} from "../../doctor-dashboard/services/doctors.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  prescription = "";
  sub: Subscription | any;
  appointmentID = 0;
  @ViewChild('prescriptionBody') prescriptionBody: ElementRef;

  constructor(private docService: DoctorsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(paramMap => {
      this.appointmentID = paramMap['id'];
      this.docService.getPrescription(this.appointmentID).subscribe(data=>{
        this.prescription = data.prescription;
        this.loadHtml();
      });
    });
  }

  loadHtml(){
    this.prescriptionBody.nativeElement.innerHTML = this.prescription;
  }

}
