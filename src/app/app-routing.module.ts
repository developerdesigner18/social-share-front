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
import { OverviewComponent } from './overview/overview.component';
import { WorkComponent } from './work/work.component';
import { PlaceComponent } from './place/place.component';
import { ContactComponent } from './contact/contact.component';
import { FamilyComponent } from './family/family.component';
import { DetailsComponent } from './details/details.component';
import { LifeComponent } from './life/life.component';
import { FriendsComponent } from './friends/friends.component';
import { RequestFriendsComponent } from './request-friends/request-friends.component';
import { PeopleKnowComponent } from './people-know/people-know.component';

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'profile/:id', component: UserProfileComponent, canActivate:[AuthGuard],
    children: [
      { path: 'timeline', component: TimelineComponent },
      { path: 'about', component: AboutComponent,
        children: [
          { path: 'overview', component: OverviewComponent },
          { path: 'work_and_education', component: WorkComponent },
          { path: 'place', component: PlaceComponent },
          { path: 'contact_and_basic_info', component: ContactComponent },
          { path: 'family_and_relationships', component: FamilyComponent },
          { path: 'about_details', component: DetailsComponent },
          { path: 'life_event', component: LifeComponent },
          { path: '', redirectTo:'overview', pathMatch:"full" }
        ]
      },
      { path: 'photos', component: PhotosComponent },
      { path: 'friends', component: FriendsComponent },
      { path: '', redirectTo:'timeline', pathMatch:"full" }
    ]
  },
  { path: 'reset', component: ResetComponent},
  { path: 'friends/:id', component: RequestFriendsComponent, canActivate:[AuthGuard],
    children: [
      { path: 'about', component: AboutComponent,
        children: [
          { path: 'overview', component: OverviewComponent },
          { path: 'work_and_education', component: WorkComponent },
          { path: 'place', component: PlaceComponent },
          { path: 'contact_and_basic_info', component: ContactComponent },
          { path: 'family_and_relationships', component: FamilyComponent },
          { path: 'about_details', component: DetailsComponent },
          { path: 'life_event', component: LifeComponent },
          { path: '', redirectTo:'overview', pathMatch:"full" }
        ]
      },
      { path: 'photos', component: PhotosComponent },
      { path: 'friends', component: FriendsComponent }
      // { path: '', redirectTo:'friends/:id', pathMatch:"full" }
    ]
  },
  { path: 'home/:id', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'search/:id', component: SearchComponent, canActivate:[AuthGuard]},
  { path: 'peopleknow/:id', component: PeopleKnowComponent, canActivate:[AuthGuard]}
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
