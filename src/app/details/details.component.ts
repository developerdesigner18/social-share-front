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

  about: boolean
  nickname: boolean;
  quotes: boolean;
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
  Required = false
  Required1 = false
  Required2 = false
  Required3 = false
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];

    this.authService.getAllData(id).subscribe(res => {

      if (res.userData[0] == null) {
        this.shows6 = true
        this.shows7 = true
        this.shows8 = true
        this.shows9 = true
      } else if(res.userData[0].aboutYourself == null){
        this.shows6 = true
        this.shows7 = true
        this.shows8 = true
        this.shows9 = true
        this.details = res.userData[0].aboutYourself
      } else if(res.userData[0].pronunciation == null){
        this.shows7 = true
        this.shows8 = true
        this.shows9 = true
        this.display7 = true
        this.details = res.userData[0].aboutYourself
      } else if(res.userData[0].otherName == null){
        this.shows8 = true
        this.shows9 = true
        this.display7 = true
        this.display8 = true
        this.details = res.userData[0].aboutYourself
        this.pronun = res.userData[0].pronunciation
      }
      else if(res.userData[0].quote == null){
        this.shows9 = true
        this.display7 = true
        this.display8 = true
        this.display9 = true
        this.details = res.userData[0].aboutYourself
        this.pronun = res.userData[0].pronunciation
        this.nick = res.userData[0].otherName
      }
      else{
        this.shows6 = false
        this.display7 = true
        this.details = res.userData[0].aboutYourself
        this.shows7 = false
        this.display8 = true
        this.pronun = res.userData[0].pronunciation
        this.shows8 = false
        this.display9 = true
        this.nick = res.userData[0].otherName
        this.shows9 = false
        this.display10 = true
        this.quote = res.userData[0].quote
      }

    })
  }

  ngOnInit(): void {
  }

  addDetails(details: any){
    this.authService.addDetails(details).subscribe(res => {
     if(this.details == null){
      this.Required = true
      this.display7 = false
     } else if(res['success']){
        this.about = false
        this.shows6 = false
        $(`.about`).css('display','none');
        this.display7 = true
      }
      else{
        console.log("error");
        this.display7 = false;
      }
    })

   }

   updateDetails(details: any){
    this.authService.addDetails(details).subscribe(res => {
      if(res['success']){
        this.u_about = true
        this.display7 = false
      }
      else{
        console.log("error");
        this.display7 = false;
      }
    })
   }

   addPronunciation(pronun: any){
    this.authService.addPronunciation(pronun).subscribe(res => {
     if(this.pronun == null){
      this.Required1 = true
      this.display8 = false
     } else if(res['success']){
        this.pronunciation = false
        this.shows7 = false
        $(`.pronunciation`).css('display','none');
        this.display8 = true
      }
      else{
        console.log("error");
        this.display8 = false;
      }
    })
   }

   updatePronunciation(pronun: any){
    this.authService.addPronunciation(pronun).subscribe(res => {
      if(res['success']){
        this.u_pronunciation = true
        this.display8 = false
      }
      else{
        console.log("error");
        this.display8 = false;
      }
    })
   }

   addNickname(nick: any){
    this.authService.addNickname(nick).subscribe(res => {
     if(this.nick == null){
      this.Required2 = true
      this.display9 = false
     } else if(res['success']){
        this.nickname = false
        this.shows8 = false
        $(`.nickname`).css('display','none');
        this.display9 = true
      }
      else{
        console.log("error");
        this.display9 = false;
      }
    })
   }

   updateNickname(nick: any){
    this.authService.addNickname(nick).subscribe(res => {
      if(res['success']){
        this.u_nickname = true
        this.display9 = false
      }
      else{
        console.log("error");
        this.display9 = false;
      }
    })
   }

   addQuotes(quote: any){
    this.authService.addQuotes(quote).subscribe(res => {
     if(this.quote == null){
      this.Required3 = true
      this.display10 = false
     } else if(res['success']){
        this.quotes = false
        this.shows9 = false
        $(`.quotes`).css('display','none');
        this.display10 = true
      }
      else{
        console.log("error");
        this.display10 = false;
      }
    })
   }

   updateQuotes(quote: any){
    this.authService.addQuotes(quote).subscribe(res => {
      if(res['success']){
        this.u_quotes = true
        this.display10 = false
      }
      else{
        console.log("error");
        this.display10 = false;
      }
    })
   }

  newPronunciation(){
    this.pronunciation = true
  }

  aboutDetails(){
    this.about = true
  }

  newNickname(){
    this.nickname = true
  }

  newQuotes(){
    this.quotes = true
  }

  Cancel(){
    this.about = false
    this.Required = false
  }

  Cancel1(){
    this.pronunciation = false
    this.Required1 = false
  }

  Cancel2(){
    this.nickname = false
    this.Required2 = false
  }

  Cancel3(){
    this.quotes = false
    this.Required3 = false
  }

  cancel1(){
    this.display7 = true
    this.u_about = false
  }

  cancel2(){
    this.display8 = true
    this.u_pronunciation = false
  }

  cancel3(){
    this.display9 = true
    this.u_nickname = false
  }

  cancel4(){
    this.display10 = true
    this.u_quotes = false
  }
}
