import { Injectable, Injector, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from  '@angular/material/dialog';
import { environment } from '../environments/environment';
// import { environment } from '../environments/environment.prod';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './user';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient, public router: Router, public dialog: MatDialog, private injector: Injector){ }

  redirectUrl: string;

  public get currentUserValue(): User {
        return this.currentUserSubject.value;
  }

  register(user: User): Observable<any> {

    return this.httpClient.post(`${environment.apiUrl}/auth/signup`, user).pipe(
        catchError(this.handleError)
    )
  }

  login(email: string, password: string){
    return this.httpClient.post<any>(`${environment.apiUrl}/auth/signin`, {email: email, password: password})
    .pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        this.getUserHome(user.data._id).subscribe((user) => {
          this.currentUser = user;
        })
      }
    }),
    catchError(this.handleError.bind(this))
    )
  }

  forget(user: User): Observable<any>{

    return this.httpClient.post(`${environment.apiUrl}/auth/forgotpassword`, user).pipe(
      catchError(this.handleError)
    )
  }

  resetPassword(token: string, password: string){
    return this.httpClient.post(`${environment.apiUrl}/auth/resetpassword?token=${token}`, {password: password}).pipe(
      catchError(this.handleError)
    )
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  getUserProfile(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/user/profile?id=${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        if(res['success'] == true){
          this.router.navigate([`profile/${id}`])
        }
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getUserHome(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/user/profile?id=${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        if(res['success'] == true){
          this.router.navigate([`home/${id}`])
        }
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getSearchUser(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/user/profile?id=${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        if(res['success'] == true){
          this.router.navigate([`search/${id}`])
        }
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  openDialog(postition, city, state, country, hobbies): any {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '550px',
      data: {postition: postition, city: city, state: state, country: country, hobbies: hobbies}
    });

    return dialogRef.afterClosed();
  }

  profileUpdate(user: User): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/user/update`, user).pipe(
        catchError(this.handleError)
    )
  }

  setProfile(u_token, profile): Observable<any> {
    const formData: any = new FormData();
    formData.append('image', profile);
    this.headers.append('token', u_token)
    return this.httpClient.post(`${environment.apiUrl}/api/user/setprofileimg`, formData, {headers: {token: u_token}}).pipe(
        catchError(this.handleError)
    )
  }

  setCover(u_token, cover): Observable<any> {
    const formData: any = new FormData();
    formData.append('image', cover);
    this.headers.append('token', u_token)
    return this.httpClient.post(`${environment.apiUrl}/api/user/setcoverimg`, formData, {headers: {token: u_token}}).pipe(
        catchError(this.handleError)
    )
  }

  isLoggedErr(){
    this.dialog.open(DialogErrorComponent, {
      width: '420px'
    })
  }

  private handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      msg = 'An error occurred:', error.error.message;
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      msg = 'Backend returned code ${error.status}, ` + `body was: ${error.error}'
      this.isLoggedErr();
    }
    return throwError(msg);
  }

}
