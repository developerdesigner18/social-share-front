import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute} from '@angular/router';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
  status: boolean;
  family: boolean;

  shows5: any;

  display5: any
  relationshipStatus: any

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];

    this.authService.getAllData(id).subscribe(res => {

      if (res.userData[0].relationshipStatus == null) {
        this.shows5 = true
        this.relationshipStatus = res.userData[0].relationshipStatus
      } else {
        this.shows5 = false
        this.display5 = true
        this.relationshipStatus = res.userData[0].relationshipStatus
      }

    })
  }

  ngOnInit(): void {
  }

  addStatus(relationshipStatus: any){
    this.authService.addStatus(relationshipStatus).subscribe(res => {
      if (res['success']) {
        this.status = false
        $(`.relationShip`).css('display','none');
        this.display5 = true
      }
    })
  }

  updateStatus(relationshipStatus: any){
    this.authService.addStatus(relationshipStatus).subscribe(res => {
      if (res['success']) {
        this.status = true
        $(`.relationShip`).css('display','none');
        this.display5 = false
      }
    })
  }

  newStatus() {
    this.status = true
  }

  newFamily(){
    this.family = true
  }

  Cancel(){
    this.display5 = true
    this.status = false
    this.family = false
  }

}
