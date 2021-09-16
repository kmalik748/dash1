import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocSearchesInterface} from "../../../dataTypes/docSearches.interface";

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  @Input() doctor: DocSearchesInterface | any;
  @Output() doctorID = new EventEmitter<{ fees: any; name: any; id: any }>();
  tags: String[] = [];
  docDetails: { fees: any; name: any; id: any; } | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log(this.doctor.fullName);

    var apiTags =JSON.parse(this.doctor.tags);
    for (let key of Object.keys(apiTags)) {
      let value = apiTags[key];
      if(!this.tags.includes(value)) this.tags.push(value);
    }
  }

  selectDoc(): void{
    this.docDetails = {id: this.doctor.id, name: this.doctor.fullName, fees: this.doctor.fees};
    this.doctorID.emit(this.docDetails);
  }

}
