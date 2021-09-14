import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private saveAppointmentAPI = environment.API_PATH+'patient/bookAppointment.php';
  private getDocProfilesAPI = environment.API_PATH+'patient/getDoctors.php';

  constructor(private http: HttpClient) { }

  saveAppointment(): Observable<any>{
    return  this.http.post<any>(
      this.saveAppointmentAPI,
      {data: 123}
    );
  }

  getDocProfiles(qry: String): Observable<any>{
    return  this.http.post<any>(
      this.getDocProfilesAPI,
      {query: qry}
    );
  }
}
