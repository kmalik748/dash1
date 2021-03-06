import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {AuthService} from "../../auth/auth-service.service";
import {DoctorDashboardLayoutComponent} from "../../layouts/doctor-dashboard-layout/doctor-dashboard-layout.component";
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  imageSrc:any = '';
  status:boolean = false

  private uploadImageAPI = environment.API_PATH+'shared/uploadImage.php';

  constructor(private http: HttpClient,
              private authService: AuthService,
              public layout: DoctorDashboardLayoutComponent) { }

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
