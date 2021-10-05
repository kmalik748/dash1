import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth-service.service";
import {MustMatch} from "../../auth/register/matchPassword";
import {UsersDetailsInterface} from "../../dataTypes/users.interface";
import {UsersService} from "../services/users.service";
declare var $: any;

import {
  SearchCountryField,
  TooltipLabel,
  CountryISO
} from "ngx-intl-tel-input";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  rqstSent = false;
  userID: number = 0;
  sub: any = 0;
  userDetails: UsersDetailsInterface | any;

  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Qatar];
  phoneForm = new FormGroup({
    phone: new FormControl("", [Validators.required])
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,
              private adminService: UsersService) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: [''],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      gender: [''],
      userType: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_pass: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirm_pass')
    });
    this.signupForm.controls['email'].disable();

    console.log("edit user");
    this.sub = this.route.params.subscribe( paramMap => {
      this.userID = +paramMap['id'];
    });

    this.userDetails = this.adminService.getUserDetails(this.userID).subscribe(
      (data: UsersDetailsInterface)=>{
        console.log(data);
        this.signupForm.patchValue({
          firstname: data.first_name,
          middlename: data.middle_name,
          lastname: data.last_name,
          dob: data.dob,
          phone: data.phone_number,
          gender: data.gender,
          userType: data.userType,
          email: data.email,
          password: data.password,
          confirm_pass: data.password
        });
      }
    );
  }

  checkMaleGender(){
    // return false;
    return this.signupForm.get('gender')?.value==='Male';
  }
  checkFemaleGender(): boolean{
    return this.signupForm.get('gender')?.value==='Female';
  }
  checkOtherGender(): boolean{
    return this.signupForm.get('gender')?.value==='Other';
  }
  userTypePatient(): boolean{
    // console.log(this.signupForm.get('userType')?.value);
    return this.signupForm.get('userType')?.value==='Patient';
  }
  userTypeDoctor(): boolean{
    return this.signupForm.get('userType')?.value==='Doctor';
  }
  userTypeAdmin(): boolean{
    return this.signupForm.get('userType')?.value==='Admin';
  }



  ngOnInit(): void {
    this.phoneForm.patchValue({
      number: "+97431422391",
      internationalNumber: "+974 3142 2391",
      nationalNumber: "3142 2391",
      countryCode: "QA",
      dialCode: "+974"
    });

  }

  submitEdit(){
    this.rqstSent = true;
    this.adminService.updateUserDetails(this.signupForm, this.userID).subscribe(data => {
      if(data.Success){
        console.log(data);
        this.notificationSuccessRegister();
        this.rqstSent = false;
        this.router.navigate(['adminArea', 'users', 'all-users']);
      }
    });
  }

  notificationSuccessRegister(){
    $(document).Toasts('create', {
      class: 'bg-success',
      title: 'Details Updated!',
      subtitle: 'Just Now',
      body: 'User details was updated successfully'
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
