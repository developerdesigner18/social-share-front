import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
  status: boolean;
  family: boolean;

  constructor() { }

  ngOnInit(): void {
  }


  newStatus() {
    this.status = true
  }

  newFamily(){
    this.family = true
  }

  Cancel(){
    this.status = false
    this.family = false
  }

}
