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
  private getDocTimingsAPI = environment.API_PATH+'patient/getDocTimings.php';
  private getAppointmentsAPI = environment.API_PATH+'patient/getAppointments.php';

  constructor(private http: HttpClient) { }

  saveAppointment(patientID: number, doctorID: number, Apnt_date: String, Apnt_time: String): Observable<any>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    return  this.http.post<any>(
      this.saveAppointmentAPI,
      {
        patientID: patientID,
        doctorID: doctorID,
        apt_Date: Apnt_date,
        apt_Time: Apnt_time,
        timestamp: dateTime
      }
    );
  }

  getDocProfiles(qry: String, docName: String): Observable<any>{
    return  this.http.post<any>(
      this.getDocProfilesAPI,
      {
        query: qry,
        docName: docName
      }
    );
  }

  getDocTimings(docID: Number): Observable<any>{
    return  this.http.post<any>(
      this.getDocTimingsAPI,
      {docID: docID}
    );
  }

  getAppointments(patientID: Number): Observable<any>{
    return  this.http.post<any>(
      this.getAppointmentsAPI,
      {patientID: patientID}
    );
  }
}
