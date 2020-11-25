import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  name: boolean
  about: boolean
  nickname: boolean;
  quotes: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  newPronunciation(){

    this.name = true
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
    this.name = false
    this.about = false
    this.nickname = false
    this.quotes = false
  }

}
