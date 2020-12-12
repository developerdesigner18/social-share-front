import { Injectable, Injector } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from  '@angular/material/dialog';
import { environment } from '../environments/environment';
// import { environment } from '../environments/environment.prod';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './user';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { DialogEmailErrorComponent } from './dialog-email-error/dialog-email-error.component';
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

  forget(user: User): Observable <any> {
    return this.httpClient.post(`${environment.apiUrl}/auth/forgotpassword`, user).pipe(
      catchError(this.handleError.bind(this))
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
    localStorage.removeItem('friendId');
    // window.location.replace('');
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

  getProfileforAbout(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/user/profile?id=${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
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

  getHomePostProfile(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/user/profile?id=${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getSearchUser(name): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/friend/search?search=${name}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        if(res['success'] == true){
          this.router.navigate([`search/${res['data'][0]._id}`])
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

  // new post save
  newPost(u_token, msg, imgUrl): Observable<any> {
    const formData: any = new FormData();
    formData.append('description', msg);
    for(let i=0; i < imgUrl.length; i++){
      formData.append('Url', imgUrl[i]);
    }

    return this.httpClient.post(`${environment.apiUrl}/api/photos/newPosts`, formData, {headers: {token: u_token}}).pipe(
        catchError(this.handleError)
    )
  }

  newtextPost(u_token, msg): Observable<any> {
    const formData: any = new FormData();
    formData.append('description', msg);
    return this.httpClient.post(`${environment.apiUrl}/api/photos/newPosts`, formData, {headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getProfilePost(id): Observable<any> {
    // this.headers.append('token', u_token)
    return this.httpClient.get(`${environment.apiUrl}/api/photos/show?id=${id}`, { headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  sendFriendRequest(userId, requestId): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/friend/send`, {userId: userId, requestId: requestId}, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  acceptFriendRequest(userId, confirmId): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/friend/accept`, {userId: userId, requestId: confirmId}, {headers: this.headers}).pipe(
      map((res: Response) => {
        console.log("=-=-=-=-=-=res", res)
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  rejectFriendRequest(userId, rejectId): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/friend/reject`, {userId: userId, requestId: rejectId}, {headers: this.headers}).pipe(
      map((res: Response) => {
        console.log("=-=-=-=-=-=res", res)
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  removeSendRequest(userId, rejectId): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/friend/removeRequest`, {userId: userId, requestId: rejectId}, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getFriendPost(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/photos/showPost?id=${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        // if(Object.keys(res).length >= 0){
        //   this.router.navigate(['friends/5ef57cc81b40cf10ecf3e4ae/friend_timeline'])
        // }
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getProfileForFriend(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/user/profile?id=${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getUsersFriends(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/user/profile?id=${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getAllFriends(u_token): Observable<any> {
    this.headers.append('token', u_token)
    // return this.httpClient.get<any>(`${environment.apiUrl}/api/friend`, { headers: {token: u_token}}).pipe(
    return this.httpClient.get(`${environment.apiUrl}/api/friend/allfriendList`, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  setRequestSend(u_token): Observable<any> {
    this.headers.append('token', u_token)
    return this.httpClient.get(`${environment.apiUrl}/api/friend/sentRequests`, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getFriendRequest(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/friend/requests?id=${id}`, { headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getFriendData(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/friend/requestsData?id=${id}`, { headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getFriends(userId): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/friend/show?userId=${userId}`, { headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getAllFriendPost(u_token): Observable<any> {
    this.headers.append('token', u_token)
    return this.httpClient.get(`${environment.apiUrl}/api/photos/homePagePost`, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getSuggestUser(userId){
    return this.httpClient.post(`${environment.apiUrl}/api/friend/suggest`, {userId: userId }, { headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  sendLikePost(postId){
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/photos/like`, {postId: postId }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // sendPostComment
  sendPostComment(postId, commentMsg){
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/photos/comment`, {postId: postId, newcomment: commentMsg }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Add new Number in about section
  addNewNumber(mobileNumber: number): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, {mobileNumber: mobileNumber}, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //GetAllData from AboutData
  getAllData(userId): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.get(`${environment.apiUrl}/api/about/getAboutData?userid=${userId}`, { headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Address
  addNewAddress(address: any): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, {address: address}, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Website
  addNewWebsite(website: any): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, {website: website}, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Basic Info
  addBasicInfo(basicInfo: any): Observable<any> {
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, {basicInfo: basicInfo}, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //RelationShip Status
  addStatus(relationshipStatus: any): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, {relationshipStatus: relationshipStatus}, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //AboutYourSelf
  addDetails(aboutYourself: any): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, {aboutYourself: aboutYourself}, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Add pronunciation
  addPronunciation(pronunciation: any): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, {pronunciation: pronunciation}, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Add nickname
  addNickname(otherName: any): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, {otherName: otherName}, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Add Quotes
  addQuotes(quote: any): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, {quote: quote}, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Delete Data
  deleteNumber(mobileNumber): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ mobileNumber: mobileNumber }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteAddress(address): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ address: address }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteWebsite(website): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ website: website }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteBasicInfo(basicInfo): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ basicInfo: basicInfo }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteStatus(relationshipStatus): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ relationshipStatus: relationshipStatus }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Add Gender
  addGender(gender: any): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, {gender: gender}, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteGender(gender): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ gender: gender }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteDetails(aboutYourself): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ aboutYourself: aboutYourself }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deletePronunciation(pronunciation): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ pronunciation: pronunciation }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteNickname(otherName): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ otherName: otherName }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteQuotes(quote): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ quote: quote }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Add Birthdate
  addBirthDate(birthDate: any): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, {birthDate: birthDate}, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteBirthdate(birthDate): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ birthDate: birthDate }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Add Home town
  addHomeTown(homeTown: any): Observable<any> {
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateAbout`, { homeTown: homeTown }, { headers: { token: u_token } }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteHomeTown(homeTown): Observable<any>{
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteAbout`,{ homeTown: homeTown }, { headers: {token: u_token}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

    //Add Work Data
  addWork(userId, name, work): Observable<any> {
      let u_token = localStorage.getItem('token')
      return this.httpClient.post(`${environment.apiUrl}/api/about/addSingleArray`, {userId: userId, name: name, fieldName: work }, { headers: { token: u_token } }).pipe(
        map((res: Response) => {
          console.log("-=-=-=-=-=-=-=-=- res",res);
          return res || {}
        }),
        catchError(this.handleError)
      )
  }
  
  updateWork(userId, name, dataId, work): Observable<any> {
    console.log("userId", userId, "dataId", dataId, "name", name);
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateSingleArray`, {userId: userId, name: name, dataId: dataId, fieldName: work } ).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteWork(userId, dataId, work): Observable<any>{
    console.log("userId",userId,"dataId",dataId);
    
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteSingleArray`,{ userId: userId, dataId: dataId, fieldName: work }).pipe(
      map((res: Response) => {
        console.log("-=-=-=-=-=-=-=-=-res", res);
        
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

   //Add University
   addUniversity(userId, name, university): Observable<any> {
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/addSingleArray`, {userId: userId, name: name, fieldName: university }, { headers: { token: u_token } }).pipe(
      map((res: Response) => {
        console.log("-=-=-=-=-=-=-=-=- res",res);
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  updateUniversity(userId, name, dataId, university): Observable<any> {
    console.log("userId", userId, "dataId", dataId, "name", name);
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateSingleArray`, {userId: userId, name: name, dataId: dataId, fieldName: university } ).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteUniversity(userId, dataId, university): Observable<any>{
    console.log("userId",userId,"dataId",dataId);
    
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteSingleArray`,{ userId: userId, dataId: dataId, fieldName: university }).pipe(
      map((res: Response) => {
        console.log("-=-=-=-=-=-=-=-=-res", res);
        
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Add School
  addSchool(userId, name, school): Observable<any> {
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/addSingleArray`, {userId: userId, name: name, fieldName: school }, { headers: { token: u_token } }).pipe(
      map((res: Response) => {
        console.log("-=-=-=-=-=-=-=-=- res",res);
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  updateSchool(userId, name, dataId, school): Observable<any> {
    console.log("userId", userId, "dataId", dataId, "name", name);
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateSingleArray`, {userId: userId, name: name, dataId: dataId, fieldName: school } ).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteSchool(userId, dataId, school): Observable<any>{
    console.log("userId",userId,"dataId",dataId);
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteSingleArray`,{ userId: userId, dataId: dataId, fieldName: school }).pipe(
      map((res: Response) => {
        console.log("-=-=-=-=-=-=-=-=-res", res);      
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

   //Add Language
   addLanguage(userId, name, language): Observable<any> {
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/addSingleArray`, {userId: userId, name: name, fieldName: language }, { headers: { token: u_token } }).pipe(
      map((res: Response) => {
        console.log("-=-=-=-=-=-=-=-=- res",res);
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteLanguage(userId, dataId, language): Observable<any>{
    console.log("userId",userId,"dataId",dataId);
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteSingleArray`,{ userId: userId, dataId: dataId, fieldName: language }).pipe(
      map((res: Response) => {
        console.log("-=-=-=-=-=-=-=-=-res", res);      
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Add Life Event
  addLifeEvent(userId, name, lifeEvents): Observable<any> {
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/addSingleArray`, {userId: userId, name: name, fieldName: lifeEvents }, { headers: { token: u_token } }).pipe(
      map((res: Response) => {
        console.log("-=-=-=-=-=-=-=-=- res",res);
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  updateLifeEvent(userId, name, dataId, lifeEvents): Observable<any> {
    console.log("userId", userId, "dataId", dataId, "name", name);
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateSingleArray`, {userId: userId, name: name, dataId: dataId, fieldName: lifeEvents } ).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteLifeEvent(userId, dataId, lifeEvents): Observable<any>{
    console.log("userId",userId,"dataId",dataId);
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteSingleArray`,{ userId: userId, dataId: dataId, fieldName: lifeEvents }).pipe(
      map((res: Response) => {
        console.log("-=-=-=-=-=-=-=-=-res", res);      
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Add family member
  addFamily(userId, family, relationship): Observable<any> {
    let u_token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.apiUrl}/api/about/addFamilyMember`, {userId: userId, name: family, relationship: relationship }, { headers: { token: u_token } }).pipe(
      map((res: Response) => {
        console.log("-=-=-=-=-=-=-=-=- res",res);
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  updateFamily(userId, family, dataId, relationship): Observable<any> {
    console.log("userId", userId, "dataId", dataId, "family", family);
    return this.httpClient.post(`${environment.apiUrl}/api/about/updateFamilyMember`, {userId: userId, name: family, dataId: dataId, relationship: relationship } ).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deleteFamily(userId, dataId): Observable<any>{
    console.log("userId",userId,"dataId",dataId);
    return this.httpClient.post(`${environment.apiUrl}/api/about/deleteFamilyMember`,{ userId: userId, dataId: dataId }).pipe(
      map((res: Response) => {
        console.log("-=-=-=-=-=-=-=-=-res", res);      
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let msg = '';
    if(error.error.message == 'friend request already sent or recive either you are already friends'){
      alert('Request already send')
    }else if(error.error.success == false && error.error.message == 'email in not registered'){
      this.dialog.open(DialogEmailErrorComponent, {
        width: '500px'
      })
    }
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      msg = 'An error occurred:', error.error.message;
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      msg = 'Backend returned code ${error.status}, ` + `body was: ${error.error}'
      if(error.status == 500){
        this.dialog.open(DialogErrorComponent, {
          width: '420px'
        })
      }
    }
    return throwError(msg);
  }

}
