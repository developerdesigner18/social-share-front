import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    SearchComponent
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
    MatToolbarModule
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
