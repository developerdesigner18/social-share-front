import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ForgetComponent } from './forget/forget.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthComponent } from './auth/auth.component';

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'profile/:id', component: UserProfileComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ForgetComponent]
