import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ForgetComponent } from './forget/forget.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResetComponent } from './reset/reset.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PhotosComponent } from './photos/photos.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AboutComponent } from './about/about.component';
import { FriendsComponent } from './friends/friends.component';

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'profile/:id', component: UserProfileComponent, canActivate:[AuthGuard],
    children: [
      { path: 'timeline', component: TimelineComponent },
      { path: 'about', component: AboutComponent },
      { path: 'photos', component: PhotosComponent },
      { path: 'friends', component: FriendsComponent },
      { path: '', redirectTo:'timeline', pathMatch:"full" }
    ]
  },
  { path: 'reset', component: ResetComponent},
  { path: 'home/:id', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'search/:id', component: SearchComponent, canActivate:[AuthGuard]}
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
