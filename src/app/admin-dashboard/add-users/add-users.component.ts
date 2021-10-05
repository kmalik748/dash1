import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth-service.service";
import {MustMatch} from "../../auth/register/matchPassword";
declare var $: any;

import {
  SearchCountryField,
  TooltipLabel,
  CountryISO
} from "ngx-intl-tel-input";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  signupForm: FormGroup;
  rqstSent = false;

  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Qatar];
  phoneForm = new FormGroup({
    phone: new FormControl("", [Validators.required])
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: [''],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
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


    this.phoneForm.patchValue({
      number: "+97431422391",
      internationalNumber: "+974 3142 2391",
      nationalNumber: "3142 2391",
      countryCode: "QA",
      dialCode: "+974"
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
