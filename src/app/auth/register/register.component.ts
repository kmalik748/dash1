import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "./matchPassword";
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: [''],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_pass: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirm_pass')
    });
  }

  ngOnInit(): void {
    //Date picker
    $('#reservationdate').datetimepicker({
      format: 'L'
    });
  }

  submitSignup(){
    if(this.signupForm.invalid){
      return;
    }
  }

}
