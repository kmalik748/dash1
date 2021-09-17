import { Component, OnInit } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../auth/auth-service.service";
declare var $: any;

@Component({
  selector: 'app-meeting-home',
  templateUrl: './meeting-home.component.html',
  styleUrls: ['./meeting-home.component.css']
})
export class MeetingHomeComponent implements OnInit {

  link: string = "";
  urlSafe: SafeResourceUrl |any;
  sub: any;


  constructor(public sanitizer: DomSanitizer,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( paramMap => {
      this.link = "https://aivizo.online/"+paramMap['id'];
      console.log("Link: "+this.link);
    });

    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
    $( "body" ).addClass( "sidebar-collapse" );
  }

}
