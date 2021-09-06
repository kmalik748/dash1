import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "./matchPassword";
import {Router} from "@angular/router";
import {AuthService} from "../auth-service.service";
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  rqstSent = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: [''],
      dob: ['', Validators.min(1)],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      gender: [''],
      userType: [''],
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
    this.rqstSent = true;
      this.authService.signUp(this.signupForm).subscribe(data => {
        console.log(data);
        this.notificationSuccessRegister();
        this.router.navigate(['/']);
        this.rqstSent = false;
      });
  }

  notificationSuccessRegister(){
    $(document).Toasts('create', {
      class: 'bg-success',
      title: 'Account Created!',
      subtitle: 'Just Now',
      body: 'Account was created successfully, please login to continue...'
    });
  }

}
