import {Component, Input, OnInit} from '@angular/core';
import {FindDoctorComponent} from "../find-doctor.component";
import {DocSearchesInterface} from "../../../dataTypes/docSearches.interface";

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  @Input() doctor: DocSearchesInterface | any;
  tags: String[] = []

  constructor(private findDocComp: FindDoctorComponent) { }

  ngOnInit(): void {
    console.log(this.doctor);

    var apiTags =JSON.parse(this.doctor.tags);
    ;
    for (let key of Object.keys(apiTags)) {
      let value = apiTags[key];
      if(!this.tags.includes(value)) this.tags.push(value);
    }
  }

  stepNext(): void{
    this.findDocComp.stepNext();
  }

}
