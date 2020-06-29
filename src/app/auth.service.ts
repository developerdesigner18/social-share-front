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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;
  // API_URL: string = 'http://localhost:8000';
  // let headers = new HttpHeaders();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  errorData: {};

  // private modalService: MatDialogModule

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
        this.getUserProfile(user.data._id).subscribe((user) => {
          this.currentUser = user;
        })
      }
    }),
    catchError(this.handleError)
    )
  }

  forget(user: User): Observable<any>{

    return this.httpClient.post(`${environment.apiUrl}/auth/forgotpassword`, user).pipe(
      catchError(this.handleError)
    )
  }

  resetPassword(token: string, password: string){
    return this.httpClient.post(`${environment.apiUrl}/auth/resetPassword?token=${token}`, {password: password}).pipe(
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
  }

  getUserProfile(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/user/profile?id=${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        if(res['success'] == true){
          // this.router.navigate([`profile`, {id: res['data'][0]['_id']}])
          this.router.navigate([`profile/${id}`])
          // this.router.navigate([`profile`], { queryParams: {id: id}})
        }
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      msg = 'An error occurred:', error.error.message;
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      msg = 'Backend returned code ${error.status}, ` + `body was: ${error.error}'
      // LoginComponent
      // this.modalService = this.injector.get(MatDialogModule);
      // if(error.status === 500){
      // this.dialog.open(DialogErrorComponent, {
      //   width: '420px'
      // })
      // }
    }
    // if(error.status === 500)
    // {
      // console.log('Retun this poup if error 500');
      //
      // this.modalService = this.injector.get(MatDialogModule);
      // this.dialog.open(DialogErrorComponent, {
      //   width: '420px'
      // })
      // alert('Wrong authenticate')
      // this.router.navigate([''])
    // }
    return throwError(msg);
  }
}
