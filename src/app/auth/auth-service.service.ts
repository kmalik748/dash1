import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signUpAPI = environment.API_PATH+'auth/signup.php';
  private emailAPI = environment.API_PATH+'auth/checkEmail.php';
  private loginAPI = environment.API_PATH+'auth/login.php';
  validate_sessionAPI = environment.API_PATH+'auth/validate_session.php';
  signUpVerifyTokenAPI = environment.API_PATH+'auth/signUpVerifyToken.php';
  signUpSendTokenAPI = environment.API_PATH+'auth/signUpSendToken.php';
  forgetPasswordAPI = environment.API_PATH+'auth/forgetPassword.php';
  verifyChangePasswordLinkAPI = environment.API_PATH+'auth/forgetPasswordVerifyLink.php';
  changePasswordAPI = environment.API_PATH+'auth/changePassword.php';
  welcomeEmailAPI = environment.API_PATH+'mail/welcome.php';

  authTokenName = 'token';
  isLoggedIn = false;
  userName = "";

  constructor(private http: HttpClient,
              private router: Router) { }

  signUp(data: FormGroup): Observable<any> {
    return this.http.post(
      this.signUpAPI,
      {
        firstname: data.get('firstname')?.value,
        middlename: data.get('middlename')?.value,
        lastname: data.get('lastname')?.value,
        dob: data.get('dob')?.value,
        phone: data.get('phone')?.value.internationalNumber,
        city: '',
        state: '',
        country: data.get('phone')?.value.countryCode,
        email: data.get('email')?.value,
        password: data.get('password')?.value,
        gender: data.get('gender')?.value,
        userType: data.get('userType')?.value
      }
    );
  }

  checkIfEmailExists(email: string): Observable<any>{
    return this.http.post(
      this.emailAPI,
      {email: email}
    );
  }

  login(uname: string, pass: string): Observable<any>{
    return this.http.post(
      this.loginAPI,
      {email: uname, pass: pass}
    );
  }

  decodeToken(): Observable<any>{
    return this.http.post(
      this.validate_sessionAPI,
      {key: localStorage.getItem(this.authTokenName)}
    );
  }

  getToken(): string | null{
    return localStorage.getItem(this.authTokenName);
}

  logout(){
    this.userName = "";
    this.isLoggedIn = false;
    localStorage.removeItem(this.authTokenName);
    this.router.navigate(['auth']);
  }

  signUpSendToken(userID: number): Observable<any>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    return this.http.post(
      this.signUpSendTokenAPI,
      {
        userID: userID,
        timestamp: dateTime
      }
    );
  }

  signUpVerifyToken(userID: number, token: number): Observable<any>{
    return this.http.post(
      this.signUpVerifyTokenAPI,
      {
        userID: userID,
        token: token
      }
    );
  }

  forgetPassword(email: string): Observable<any>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    return this.http.post(
      this.forgetPasswordAPI,
      {
        email: email,
        timestamp: dateTime
      }
    );
  }

  verifyChangePasswordLink(userID: number,token: number): Observable<any>{
    return this.http.post(
      this.verifyChangePasswordLinkAPI,
      {
        userID: userID,
        token: token
      }
    );
  }

  changePassword(password: string, userID: number): Observable<any>{
    return this.http.post(
      this.changePasswordAPI,
      {
        userID: userID,
        password: password
      }
    );
  }

  sendWelcomeEmail(email: String,token: number): Observable<any>{
    var params = "?to="+email+"&code="+token;
    return this.http.get(
      this.welcomeEmailAPI+params
    );
  }
}
