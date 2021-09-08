import { Component, OnInit } from '@angular/core';
import {UsersDetailsInterface} from "../../dataTypes/users.interface";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
declare var $: any;


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  allUsers: UsersDetailsInterface[];
  loading: boolean = false;
  deleteUserId = 0;
  proceedDelete = false;

  constructor(private userService: UsersService,
              private router: Router) {
    this.allUsers = [];
    this.getAllUsers();
  }

  ngOnInit(): void {

  }

  getAllUsers(): void{
    this.loading = true;
    this.userService.getAllUsers().subscribe(data => {
      this.allUsers = data;
      this.loading = false;

      $(function () {
        $("#example1").DataTable();
      });
    });
  }

  setValue(id: number){
    this.deleteUserId = id;
  }

  deleteUser(){
    this.proceedDelete = true;
    this.userService.deleteUser(this.deleteUserId).subscribe(data=>{
      if(data.Result==true){
        this.deleteUserId = 0;
        this.proceedDelete = false;
        $('#delete_user_modal').modal('toggle');
        $('#example1_wrapper').remove();
        this.getAllUsers();
        $(document).Toasts('create', {
          class: 'bg-danger',
          title: 'User Deleted!',
          subtitle: 'Just Now',
          body: 'User Account was deleted successfully'
        });
      }
    });
  }

}
