import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.css']
})
export class LifeComponent implements OnInit {
  life: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  newLifeEvent(){
    this.life = true
  }

  Cancel(){
    this.life = false
  }

}
