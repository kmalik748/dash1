import { Component, OnInit } from '@angular/core';
import {UsersDetailsInterface} from "../../dataTypes/users.interface";
import {UsersService} from "../services/users.service";
declare var $: any;


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  allUsers: UsersDetailsInterface[];
  loading: boolean = false;

  constructor(private userService: UsersService) {
    this.allUsers = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe(data => {
      // data.forEach(value => {
      //   value = value as UsersDetailsInterface;
      //   // console.log(value.id);
      // });
      this.allUsers = data;
      this.loading = false;

      $(function () {
        $("#example1").DataTable();
      });
    });
  }

}
