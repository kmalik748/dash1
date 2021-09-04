import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopNavComponent} from "./top-nav/top-nav.component";
import {SideNavComponent} from "./side-nav/side-nav.component";
import {FooterComponent} from "./footer/footer.component";



@NgModule({
  declarations: [
    TopNavComponent,
    SideNavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopNavComponent,
    SideNavComponent,
    FooterComponent
  ]
})
export class SharedModule { }
