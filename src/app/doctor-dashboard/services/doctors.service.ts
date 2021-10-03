import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../auth/auth-service.service";
import {UsersDetailsInterface} from "../../dataTypes/users.interface";

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private updateProfileAPI = environment.API_PATH+'doctor/updateProfileData.php';
  private getProfileAPI = environment.API_PATH+'doctor/getProfileData.php';
  private getAppointmentsAPI = environment.API_PATH+'doctor/getAppointments.php';
  private savePrescriptionAPI = environment.API_PATH+'doctor/savePrescription.php';
  private getPrescriptionAPI = environment.API_PATH+'doctor/getPrescription.php';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  updateData(form: FormGroup, availability: string, tags: String[]): Observable<any>{
    var arrayToString = JSON.stringify(Object.assign({}, tags));  // convert array to string
    var tags_json = JSON.parse(arrayToString);  // convert string to json object
    return this.http.post(
      this.updateProfileAPI,
      {
        speciality: form.get('speciality')?.value,
        qualification: form.get('qualification')?.value,
        fees: form.get('fees')?.value,
        availability: availability,
        tags: tags_json,
        token: this.authService.getToken()
      }
    );
  }

  getDocDetails(token: string | null): Observable<any>{
    return this.http.post<UsersDetailsInterface>(
      this.getProfileAPI,
      {token: token}
    );
  }

  getAppointments(doctorID: Number): Observable<any>{
    return  this.http.post<any>(
      this.getAppointmentsAPI,
      {doctorID: doctorID}
    );
  }


  getPrescription(appointment: number): Observable<any>{
    return  this.http.post<any>(
      this.getPrescriptionAPI,
      {appointmentID: appointment}
    );
  }

  savePrescription(prescription: string, appointment: number): Observable<any>{
    return  this.http.post<any>(
      this.savePrescriptionAPI,
      {prescription: prescription, appointment: appointment}
    );
  }

}
