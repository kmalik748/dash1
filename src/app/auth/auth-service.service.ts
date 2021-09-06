import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Subscribable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signUpAPI = environment.API_PATH+'auth/signup.php';
  private emailAPI = environment.API_PATH+'auth/checkEmail.php';

  constructor(private http: HttpClient) { }

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
}
