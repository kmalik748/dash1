import { Injectable } from '@angular/core';
import {UsersDetailsInterface} from "../../dataTypes/users.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private getallUsersAPI = environment.API_PATH+'admin/getAllUsers.php';
  private deleteuser = environment.API_PATH+'admin/deleteUser.php';
  private userDetailAPI = environment.API_PATH+'admin/getUserDetails.php';
  private updateUserAPI = environment.API_PATH+'admin/updateUserDetails.php';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<UsersDetailsInterface[]> {
    return this.http.get<UsersDetailsInterface[]>(this.getallUsersAPI);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.post(
      this.deleteuser,
      {id: id}
    );
  }

  getUserDetails(id: number): Observable<any>{
    return this.http.post<UsersDetailsInterface>(
      this.userDetailAPI,
      {id: id}
    );
  }

  updateUserDetails(data: FormGroup, id: number): Observable<any>{
    return this.http.post(
      this.updateUserAPI,
      {
        id: id,
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
}
