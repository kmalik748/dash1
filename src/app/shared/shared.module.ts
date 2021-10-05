import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopNavComponent} from "./top-nav/top-nav.component";
import {SideNavComponent} from "./side-nav/side-nav.component";
import {FooterComponent} from "./footer/footer.component";
import { LoaderComponent } from './loader/loader.component';
import { PasswordStrenghtComponent } from './password-strenght/password-strenght.component';



@NgModule({
  declarations: [
    TopNavComponent,
    SideNavComponent,
    FooterComponent,
    LoaderComponent,
    PasswordStrenghtComponent
  ],
  imports: [
    CommonModule
  ],
    exports: [
        TopNavComponent,
        SideNavComponent,
        FooterComponent,
        LoaderComponent,
        PasswordStrenghtComponent
    ]
})
export class SharedModule { }
