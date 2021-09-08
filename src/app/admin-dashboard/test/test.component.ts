import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private router: Router,
              private adminService: UsersService) {
    this.adminService.getAllUsers().subscribe(
      data=>{
        this.router.navigate(['adminArea']);
      }
    );
  }

  ngOnInit(): void {
  }

}
