import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {find, forEach, pull} from "lodash";
import {DoctorsService} from "../services/doctors.service";
import {AuthService} from "../../auth/auth-service.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
declare var $: any;

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {


  @ViewChild('tagInput') tagInputRef: ElementRef | any;
  @ViewChild('availability') availability: ElementRef | any;
  tags: string[] = [];
  form: FormGroup;
  loading=false;
  docDetails: any;
  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Profile Details Here</p>'
  }
  specialities = ["Family Medicine", "Internal Medicine", "Pediatrics", "Dermatology", "Psychiatry"];
  selectedSpeciality = ""

  constructor(private fb: FormBuilder, private docService: DoctorsService, private authService: AuthService) {

    this.form = this.fb.group({
      speciality: ['', Validators.required],
      qualification: ['', Validators.required],
      availability: [''],
      fees: ['', Validators.required],
      tag: [undefined],
      profileData: [undefined],
    });

    this.docDetails = this.docService.getDocDetails(this.authService.getToken()).subscribe(
      (data)=>{
        this.selectedSpeciality = data.data.specialty;
        this.form.patchValue({
          speciality: data.data.specialty,
          qualification: data.data.qualification,
          fees: data.data.fees,
          profileData: data.data.profileData
        });
        console.log(data.data.specialty);

        var apiTags =JSON.parse(data.data.tags);
;
        for (let key of Object.keys(apiTags)) {
          let value = apiTags[key];
          if(!this.tags.includes(value)) this.tags.push(value);
        }

      }
    );
  }

  ngOnInit() {
    //Date range picker with time picker
    $('#reservationtime').daterangepicker({
      timePicker: true,
      timePickerIncrement: 30,
      locale: {
        format: 'MM/DD/YYYY hh:mm A'
      }
      // timePicker: true,
      // timePicker24Hour: true,
      // timePickerIncrement: 30,
      // locale: {
      //   format: 'MM/DD/YYYY H:mm'
      // }
    })
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.form.controls.tag.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      // if (event.code === 'Comma' || event.code === 'Space') {
      if (event.code === 'Comma') {
        this.addTag(inputValue.replace(/,/g, '')); //Removes Comma and then add
        this.form.controls.tag.setValue('');
      }
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.tags, tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
  }

  submitRequest(): void{
    this.loading = true;
    console.log(this.tags);
    this.docService.updateData(this.form, this.availability.nativeElement.value, this.tags, this.model.editorData).subscribe(
      data=>{
        console.log(this.model.editorData);
        console.log(data);
        if(data.Success){
          this.loading = false;
          $(document).Toasts('create', {
            class: 'bg-success',
            title: 'Settings Updated!',
            subtitle: 'Just Now',
            body: 'Account information was saved successfully'
          });
        }
      },
      error => {
        $(document).Toasts('create', {
          class: 'bg-danger',
          title: 'Error!',
          subtitle: 'Just Now',
          body: 'Error Occurred while saving. Please fill all fields'
        });
        this.loading = false;
      }
    );
  }


}
