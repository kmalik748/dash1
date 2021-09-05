import { Injectable } from '@angular/core';
import {UsersDetailsInterface} from "../../dataTypes/users.interface";
import {Observable, Subscribable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private getallUsersAPI = environment.API_PATH+'admin/getAllUsers.php';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<UsersDetailsInterface[]> {
    return this.http.get<UsersDetailsInterface[]>(this.getallUsersAPI);
  }

}
