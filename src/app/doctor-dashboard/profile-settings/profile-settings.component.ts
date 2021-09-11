import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { find, get, pull } from "lodash";
declare var $: any;

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  data: any;


  @ViewChild('tagInput') tagInputRef: ElementRef | any;
  tags: string[] = ['Asthma', 'Blood Pressure', 'Corona-Virus Treatment', 'Diabetes'];
  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      tag: [undefined],
    });
    // this.tagInputRef = "";
  }

  ngOnInit() {
    this.form = this.fb.group({
      tag: [undefined],
    });
    //Date range picker with time picker
    $('#reservationtime').daterangepicker({
      timePicker: true,
      timePickerIncrement: 30,
      locale: {
        format: 'MM/DD/YYYY hh:mm A'
      }
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



}
