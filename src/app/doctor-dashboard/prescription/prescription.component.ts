import {Component, OnDestroy, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ActivatedRoute, Router} from "@angular/router";
import {DoctorsService} from "../services/doctors.service";
import {Subscription} from "rxjs";
declare var $: any;

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit, OnDestroy {

  sub: Subscription | any;
  public Editor = ClassicEditor;
  appointmentID = 0;
  public model = {
    editorData: ''
  }
  loading = false;

  constructor(private docService: DoctorsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(paramMap => {
      this.appointmentID = paramMap['id'];
      this.docService.getPrescription(this.appointmentID).subscribe(data=>{
        this.model = {
          editorData: data.prescription
        };
      });
    });
  }

  saveData():void{
    this.loading = true;
    console.log(this.model.editorData);
    this.docService.savePrescription(this.model.editorData, this.appointmentID).subscribe(data=>{
      this.loading = false;
      this.router.navigate(['doctorArea', 'appointments']);

      $(document).Toasts('create', {
        class: 'bg-success',
        title: 'Prescription saved',
        subtitle: 'Just Now',
        body: 'Prescription was saved successfully!'
      });
    });
  }

  goBack(): void{
    this.router.navigate(['doctorArea', 'appointments']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}


