import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import { TestComponent } from './test/test.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EditUserComponent } from './edit-user/edit-user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', redirectTo: 'users/all-users' },
  { path: 'users/all-users', component: AllUsersComponent },
  { path: 'users/add-user', component: AddUsersComponent },
  { path: 'users/edit/:id', component: AddUsersComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    TestComponent,
    AllUsersComponent,
    AddUsersComponent,
    EditUserComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        ReactiveFormsModule
    ],
  exports: [
    RouterModule
  ]
})
export class AdminDashboardModule { }
