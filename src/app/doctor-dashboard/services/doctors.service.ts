import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../auth/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private updateProfileAPI = environment.API_PATH+'doctor/updateProfileData.php';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getUID(): Number{
    return this.authService.getCurrentUserID();
  }

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
        userID: this.getUID()
      }
    );
  }
}
