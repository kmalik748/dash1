import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    $(function () {
      $("#example1").DataTable();
    });
  }

}
