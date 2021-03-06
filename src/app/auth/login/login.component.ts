import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth-service.service";
import {Router} from "@angular/router";
import {PatientDashboardLayoutComponent} from "../../layouts/patient-dashboard-layout/patient-dashboard-layout.component";
import {DoctorDashboardLayoutComponent} from "../../layouts/doctor-dashboard-layout/doctor-dashboard-layout.component";
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  submitLogin(){
    this.login = true
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      data=>{
        if(data.Success){
          if(data.verified){
            this.authService.isLoggedIn = true;
            localStorage.setItem("userID", data.userID);
            localStorage.setItem(this.authService.authTokenName, data.token);
            this.authService.userPic = data.pic;
            $(document).Toasts('create', {
              class: 'bg-success',
              title: 'Welcome Back',
              subtitle: 'Just Now',
              body: 'Log in Successful!<br> Your Account Type is: <b>'+data.userType+'</b>'
            });
            console.log("Path is",  data);
            this.router.navigate([data.redirectTo]).then(r => {});
          }else{
            $(document).Toasts('create', {
              class: 'bg-danger',
              title: 'Account Verification Required',
              subtitle: 'Just Now',
              body: 'Your account is not verified. Please check email and verify to proceed.'
            });
          }
        }else{
          $(document).Toasts('create', {
            class: 'bg-danger',
            title: 'Login Failed',
            subtitle: 'Just Now',
            body: 'Invalid Email / Password Provided. Please try again.'
          });
        }
        this.login = false;
      },
      error => {
          $(document).Toasts('create', {
            class: 'bg-danger',
            title: 'Login Failed',
            subtitle: 'Just Now',
            body: 'Your request cannot be proceeded due to some technical issues.'
          });
          this.login = false;
      }
    );
  }

}
