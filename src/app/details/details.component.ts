import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // about: boolean
  nickname: any;
  quotes: any;
  shows6: any
  display7: any
  u_about: any
  details: any
  shows7: any
  display8: any
  pronunciation: any
  u_pronunciation: any
  pronun: any
  shows8: any
  display9: any
  u_nickname: any
  nick: any
  shows9: any
  display10: any
  u_quotes: any
  quote: any
  //Changes
  Required = false
  Required1 = false
  Required2 = false
  Required3 = false
  show_details: boolean
  fill_details = false
  details_about: any
  u_fill_details: any
  about: any
  pronun_value: any;
  show_pronun: boolean;
  fill_pronun = false
  u_fill_pronun: boolean;
  show_nickname: boolean;
  fill_nickname = false;
  u_fill_nickname: boolean;
  quote_value: any;
  show_quotes: boolean;
  fill_quotes = false;
  u_fill_quotes: boolean;
  not_mention_about = false;
  not_mention_quotes = false;
  not_mention_nickname = false;
  not_mention_pronun = false;
  icons: boolean
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];
    const current_login_User = JSON.parse(localStorage.getItem('currentUser'));

    if (current_login_User.data._id !== id) {
      this.icons = false
      this.authService.getAllData(id).subscribe(res => {

         if (res.userData[0].aboutYourself !== undefined && res.userData[0] !== null) {
          this.details_about = res.userData[0].aboutYourself
          this.show_details = true
        } else {
          this.not_mention_about = true           
        }

        if (res.userData[0].pronunciation !== undefined && res.userData[0] !== null) {
          this.pronun_value = res.userData[0].pronunciation
          this.show_pronun = true
        } else {
          this.not_mention_pronun = true
        }

        if (res.userData[0].otherName !== undefined && res.userData[0] !== null) {
          this.nickname = res.userData[0].otherName
          this.show_nickname = true
        } else {
          this.not_mention_nickname = true
        }

        if (res.userData[0].quote !== undefined && res.userData[0] !== null) {
          this.quote_value = res.userData[0].quote
          this.show_quotes = true
        } else {
          this.not_mention_quotes = true
        }

      })
    } else {
      this.icons = true
      this.authService.getAllData(id).subscribe(res => {

        if (res.userData[0] == null) {
          this.details = false  
        } else if (res.userData[0].aboutYourself !== undefined) {
          this.details_about = res.userData[0].aboutYourself
          this.show_details = true
        } else {
          this.details = false
        }

        if (res.userData[0] == null) {
          this.pronun = false
        } else if (res.userData[0].pronunciation !== undefined) {
          this.pronun_value = res.userData[0].pronunciation
          this.show_pronun = true
        } else {
          this.pronun = false
        }

        if (res.userData[0] == null) {
          this.nick = false
        } else if (res.userData[0].otherName !== undefined) {
          this.nickname = res.userData[0].otherName
          this.show_nickname = true
        } else {
          this.nick = false
        }

        if (res.userData[0] == null) {
          this.quote = false
        } else if (res.userData[0].quote !== undefined) {
          this.quote_value = res.userData[0].quote
          this.show_quotes = true
        } else {
          this.quote = false
        }

      })
    }
  }

  ngOnInit(): void {
  }

  addDetails(about: any){
    this.authService.addDetails(about).subscribe(res => {
     if (res['success']) {
       this.details_about = about
       this.show_details = true
       this.details = true
       this.fill_details = false
     }
    })
  }
  
  editDetails(about: any) {
    this.authService.addNewNumber(about).subscribe(res => {
      if (res['success']) {
        this.show_details = true
        this.u_fill_details = false
      }
    })
  }

  updateDetails(about: any) {
    this.details_about = about
    this.show_details = false
    this.u_fill_details = true
    this.authService.addDetails(about).subscribe(res => {
      if(res['success']){
        this.u_about = true
        this.display7 = false
      }
      else{
        this.display7 = false;
      }
    })
  }

  delDetails(about: any) {
    this.details = false;
    this.fill_details = false;
    this.show_details = false;
    this.authService.deleteDetails(about).subscribe(res => {
      if (res['success']) {
        this.shows6 = true
        $(`.details`).css('display', 'block');
        this.display7 = false
      } else {
        this.display7 = true;
      }
    })
  }

   addPronunciation(words: any){
    this.authService.addPronunciation(words).subscribe(res => {
     if (res['success']) {
       this.pronun_value = words
       this.show_pronun = true
       this.pronun = true
       this.fill_pronun = false
     }
    })
  }
  
  editPronunciation(words: any) {
    this.authService.addPronunciation(words).subscribe(res => {
      if (res['success']) {
        this.show_pronun = true
        this.u_fill_pronun = false
      }
    })
  }

  updatePronunciation(words: any) {
    this.pronun_value = words
    this.show_pronun = false
    this.u_fill_pronun = true
    this.authService.addPronunciation(words).subscribe(res => {
      if(res['success']){
        this.u_pronunciation = true
        this.display8 = false
      }
      else{
        this.display8 = false;
      }
    })
  }
  
  deletePronunciation(words: any) {
    this.pronun = false;
    this.fill_pronun = false;
    this.show_pronun = false;
    this.authService.deletePronunciation(words).subscribe(res => {
      if (res['success']) {
        this.shows7 = true
        $(`.mobile`).css('display', 'block');
        this.display8 = false
      } else {
        this.display8 = true;
      }
    })
  }

   addNickname(nickname: any){
    this.authService.addNickname(nickname).subscribe(res => {
     if (res['success']) {
       this.nickname = nickname
       this.show_nickname = true
       this.nick = true
       this.fill_nickname = false
     }
    })
  }
  
  editNickname(nickname: any) {
    this.authService.addNickname(nickname).subscribe(res => {
      if (res['success']) {
        this.show_nickname = true
        this.u_fill_nickname = false
      }
    })
  }

  updateNickname(nickname: any) {
    this.nickname = nickname
    this.show_nickname = false
    this.u_fill_nickname = true;
    this.authService.addNickname(nickname).subscribe(res => {
      if(res['success']){
        this.u_nickname = true
        this.display9 = false
      }
      else{
        this.display9 = false;
      }
    })
  }
  deleteNickname(nickname: any) {
    this.nick = false;
    this.fill_nickname = false;
    this.show_nickname = false;
    this.authService.deleteNickname(nickname).subscribe(res => {
      if (res['success']) {
        this.shows8 = true
        $(`.nickname`).css('display', 'block');
        this.display9 = false
      } else {
        this.display9 = true;
      }
    })
  }

   addQuotes(quote_value: any){
    this.authService.addQuotes(quote_value).subscribe(res => {
     if (res['success']) {
       this.quote_value = quote_value
       this.show_quotes = true
       this.quote = true
       this.fill_quotes = false
     }
    })
  }
  
  editQuotes(quote_value: any) {
    this.authService.addQuotes(quote_value).subscribe(res => {
      if (res['success']) {
        this.show_quotes = true
        this.u_fill_quotes = false
      }
    })
  }

  updateQuotes(quote_value: any) {
    this.quote_value = quote_value
    this.show_quotes = false
    this.u_fill_quotes = true
    this.authService.addQuotes(quote_value).subscribe(res => {
      if(res['success']){
        this.u_quotes = true
        this.display10 = false
      }
      else{
        this.display10 = false;
      }
    })
  }
  
  deleteQuotes(quote_value: any) {
    this.quote = false;
    this.fill_quotes = false;
    this.show_quotes = false;
    this.authService.deleteQuotes(quote_value).subscribe(res => {
      if (res['success']) {
        this.shows9 = true
        $(`.quote`).css('display', 'block');
        this.display10 = false
      } else {
        this.display10 = true;
      }
    })
  }

  newPronunciation() {
    this.fill_pronun = true
    this.pronun = false
  }

  aboutDetails() {
    this.fill_details = true
    this.details = false
  }

  newNickname() {
    this.fill_nickname = true
    this.nick = false
  }

  newQuotes() {
    this.fill_quotes = true
    this.quote = false
  }

  Cancel(){
    this.details = false
    this.fill_details = false
    this.Required = false
  }

  Cancel1(){
    this.pronun = false
    this.fill_pronun = false
    this.Required1 = false
  }

  Cancel2(){
    this.nick = false
    this.fill_nickname = false
    this.Required2 = false
  }

  Cancel3() {
    this.fill_quotes = false
    this.quote = false
    this.Required3 = false
  }

  cancel1(){
    this.show_details = true
    this.u_fill_details = false
  }

  cancel2(){
    this.show_pronun = true
    this.u_fill_pronun = false
  }

  cancel3(){
    this.show_nickname = true
    this.u_fill_nickname = false
  }

  cancel4(){
    this.show_quotes = true
    this.u_fill_quotes = false
  }
}
