import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MustMatch} from "../register/matchPassword";
import {Subscription} from "rxjs";
declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  login = false;
  userID :number = 0;
  token :number = 0;
  sub: Subscription;
  canReset = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }, {
      validator: MustMatch('email', 'password')
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(paramMap => {
      this.userID = paramMap['id'];
      this.token = paramMap['token'];
    });
    this.authService.verifyChangePasswordLink(this.userID, this.token).subscribe(
      data=>{
        console.log("=====",data,"========");
        if(data.Success){
          this.canReset = true;
        }else{
          $(document).Toasts('create', {
            class: 'bg-danger',
            title: 'Link Expired',
            subtitle: 'Just Now',
            body: 'Seems like you have already used this link and cannot use again.'
          });
        }
      }
    );
  }

  submitLogin(){
    this.login = true
    this.authService.changePassword(this.loginForm.get('email')?.value, this.userID).subscribe(
      data=>{
        if(data.Success){
          $(document).Toasts('create', {
            class: 'bg-success',
            title: 'Password Reset Done',
            subtitle: 'Just Now',
            body: 'Your password was updated Successfully. Please Login to continue.'
          });
        }
        this.login = false;
        this.router.navigate(['/auth']);
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
