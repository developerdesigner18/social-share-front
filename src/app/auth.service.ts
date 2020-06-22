import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
// import { environment } from '../environments/environment.prod';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;
  // API_URL: string = 'http://localhost:8000';
  // let headers = new HttpHeaders();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  // currentUser = {};
  errorData: {};

  constructor(private httpClient: HttpClient){ }

  redirectUrl: string;

  public get currentUserValue(): User {
        return this.currentUserSubject.value;
  }

  register(user: User): Observable<any> {

    return this.httpClient.post(`${environment.apiUrl}/auth/signup`, user).pipe(
        catchError(this.handleError)
    )
  }

  // login(user: User) {
  //   return this.httpClient.post<any>(`${environment.apiUrl}/auth/signin`, user)
  //   .subscribe((res: any) => {
  //     localStorage.setItem('access_token', res.token)
  //     this.getUserProfile(res._id).subscribe((res) => {
  //       this.currentUser = res;
  //       // this.router.navigate(['users/profile/' + res.msg._id]);
  //       alert('User login in successfully')
  //     })
  //   })
  // }

  // login(user: User) {
  //  return this.httpClient.post<any>(`${environment.apiUrl}/auth/signin`, user)
  //      .pipe(map(user => {
  //          // store user details and jwt token in local storage to keep user logged in between page refreshes
  //          localStorage.setItem('currentUser', JSON.stringify(user));
  //          this.currentUserSubject.next(user);
  //          return user;
  //      }));
  //  }

  login(email: string, password: string){
    return this.httpClient.post<any>(`${environment.apiUrl}/auth/signin`, {email: email, password: password})
    .pipe(map(user => {
      if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
    }),
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
    return this.httpClient.get(`${environment.apiUrl}/user/profile/${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
