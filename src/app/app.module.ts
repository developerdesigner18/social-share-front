import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgImageSliderModule } from 'ng-image-slider';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth.interceptor';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { ForgetComponent } from './forget/forget.component';
import { AuthComponent } from './auth/auth.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogForgetComponent } from './dialog-forget/dialog-forget.component';
import { DialogPasswordChangeComponent } from './dialog-password-change/dialog-password-change.component';
import { DialogPassmatchComponent } from './dialog-passmatch/dialog-passmatch.component';
import { ResetComponent } from './reset/reset.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PhotosComponent } from './photos/photos.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AboutComponent } from './about/about.component';
import { FriendsComponent } from './friends/friends.component';
import { OverviewComponent } from './overview/overview.component';
import { WorkComponent } from './work/work.component';
import { PlaceComponent } from './place/place.component';
import { ContactComponent } from './contact/contact.component';
import { FamilyComponent } from './family/family.component';
import { DetailsComponent } from './details/details.component';
import { LifeComponent } from './life/life.component';
import { PostModalComponent } from './post-modal/post-modal.component';
import { RequestFriendsComponent } from './request-friends/request-friends.component';
import { PeopleKnowComponent } from './people-know/people-know.component';
import { NgxGalleryModule } from 'ngx-gallery-9';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { VideosComponent } from './videos/videos.component';
import { AlbumsComponent } from './albums/albums.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    SigninComponent,
    ForgetComponent,
    AuthComponent,
    DialogBodyComponent,
    DialogForgetComponent,
    DialogPasswordChangeComponent,
    DialogPassmatchComponent,
    ResetComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    EditProfileComponent,
    PhotosComponent,
    TimelineComponent,
    AboutComponent,
    FriendsComponent,
    OverviewComponent,
    WorkComponent,
    PlaceComponent,
    ContactComponent,
    FamilyComponent,
    DetailsComponent,
    LifeComponent,
    PostModalComponent,
    RequestFriendsComponent,
    PeopleKnowComponent,
    VideosComponent,
    AlbumsComponent
  ],
  entryComponents: [DialogBodyComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ImageCropperModule,
    AutocompleteLibModule,
    NgImageSliderModule,
    NgxGalleryModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
