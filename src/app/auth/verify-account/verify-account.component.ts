import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
declare var $: any;

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit, OnDestroy{

  loginForm: FormGroup;
  login = false;
  userID :number = 0;
  sub: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      token: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(paramMap => {
      this.userID = paramMap['id'];
    });
  }

  submitLogin(){
    this.login = true
    this.authService.signUpVerifyToken(this.userID, this.loginForm.get('token')?.value).subscribe(
      data=>{
        if(data.Success){
          $(document).Toasts('create', {
            class: 'bg-success',
            title: 'Account Verified',
            subtitle: 'Just Now',
            body: 'Your account was verified. Please login to continue..'
          });
          this.router.navigate(['auth', 'login']);
        }else{
          $(document).Toasts('create', {
            class: 'bg-danger',
            title: 'Invalid Token',
            subtitle: 'Just Now',
            body: 'Token you provided was not valid. Please try again.'
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
