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
  private encodeAPI = environment.API_PATH+'auth/encode.php';
  validate_sessionAPI = environment.API_PATH+'auth/validate_session.php';
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
        phone: data.get('phone')?.value,
        city: data.get('city')?.value,
        state: data.get('state')?.value,
        country: data.get('country')?.value,
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
}
