import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ForgetComponent } from './forget/forget.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResetComponent } from './reset/reset.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'profile/:id', component: UserProfileComponent, canActivate:[AuthGuard]},
  { path: 'reset', component: ResetComponent},
  { path: 'home/:id', component: HomeComponent, canActivate:[AuthGuard]}
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
