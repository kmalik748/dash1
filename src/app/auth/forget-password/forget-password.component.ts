import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../auth-service.service";
import {ActivatedRoute, Router} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {


  loginForm: FormGroup;
  login = false;
  sub: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = this.fb.group({
      token: ['', [Validators.required, Validators.email]]
    });
  }


  ngOnInit(): void {
  }

  submitLogin(){
    this.login = true
    this.authService.forgetPassword(this.loginForm.get('token')?.value).subscribe(
      data=>{
        if(!data.emailNotFound){
          this.authService.sendForgetPassEmail(this.loginForm.get('token')?.value, data.userID, data.token).subscribe();
          $(document).Toasts('create', {
            class: 'bg-success',
            title: 'Password Reset Email Sent',
            subtitle: 'Just Now',
            body: 'We just sent you a password reset Email. Please check inbox.'
          });
          this.router.navigate(['auth']);
        }else{
          $(document).Toasts('create', {
            class: 'bg-danger',
            title: 'Email Not Found',
            subtitle: 'Just Now',
            body: 'The email you provided was not registered. Please try again.'
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
