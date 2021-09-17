import { Component, OnInit } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-meeting-home',
  templateUrl: './meeting-home.component.html',
  styleUrls: ['./meeting-home.component.css']
})
export class MeetingHomeComponent implements OnInit {

  link = "https://aivizo.online/12332";
  urlSafe: SafeResourceUrl |any;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
    $( "body" ).addClass( "sidebar-collapse" );
  }

}
