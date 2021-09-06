import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth-service.service";
import {MustMatch} from "../../auth/register/matchPassword";
declare var $: any;

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
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
      email: ['', [Validators.required, Validators.email], this.isEmailUnique.bind(this)],
      password: ['', Validators.required],
      confirm_pass: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirm_pass')
    });
  }

  isEmailUnique(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      this.authService.checkIfEmailExists(control.value).subscribe(data => {
        var value = data.Error==false ? null : { isEmailUnique: true };
        console.log(value);
        resolve(value);
        console.log(this.signupForm.get('email'));
      });
    });
    return q;
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
      this.rqstSent = false;
      this.signupForm.reset();
    });
  }

  notificationSuccessRegister(){
    $(document).Toasts('create', {
      class: 'bg-success',
      title: 'Account Created!',
      subtitle: 'Just Now',
      body: 'Account was created successfully'
    });
  }

}
