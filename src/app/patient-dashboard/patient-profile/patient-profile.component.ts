import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth-service.service";
import {PatientDashboardLayoutComponent} from "../../layouts/patient-dashboard-layout/patient-dashboard-layout.component";
declare var $: any;

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {


  imageSrc:any = '';
  status:boolean = false

  private uploadImageAPI = environment.API_PATH+'shared/uploadImage.php';

  constructor(private http: HttpClient,
              private authService: AuthService,
              public layout: PatientDashboardLayoutComponent) { }

  ngOnInit(): void {

  }

  onFileChange(event:any) {
    this.status = false
    const file = event.target.files[0];
    this.status = event.target.files.length>0?true:false
    if(this.status==true){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
      }
    }
  }

  submit(){
    this.http.post(this.uploadImageAPI,
      {
        'image':this.imageSrc,
        'token': this.authService.getToken()
      })
      .subscribe(res => {
        this.layout.userImg = res.imageName;
        this.authService.userPic = res.imageName;
        $(document).Toasts('create', {
          class: 'bg-success',
          title: 'Success!',
          subtitle: 'Just Now',
          body: res.msg
        });
      })
  }

}
