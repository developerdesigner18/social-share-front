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
  u_status: any
  not_mention_relationship = false;
  icons: boolean;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];
    const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
    
    if (current_login_User.data._id !== id) {
      this.icons = false
      // this.authService.getProfileforAbout(id).subscribe(res => {
      //   if (res.data == null) {

      //   } else if (res.data.relationshipStatus !== undefined) {
      //     this.display5 = true
      //     this.relationshipStatus = res.data.relationshipStatus
      //   } else {
      //     this.not_mention_relationship = true
      //   }
      // })
      this.authService.getAllData(id).subscribe(res => {
        if (res.userData[0] == null) {
        } else if (res.userData[0].relationshipStatus !== undefined) {
          this.display5 = true
          this.relationshipStatus = res.userData[0].relationshipStatus
        } else {
          this.not_mention_relationship = true
        }
      })
    } else {
      this.icons = true
      this.authService.getAllData(id).subscribe(res => {

        if (res.userData[0] == null) {
          this.shows5 = true
        } else if (res.userData[0].relationshipStatus == null) {
          this.shows5 = true
          this.relationshipStatus = res.userData[0].relationshipStatus
        } else {
          this.shows5 = false
          this.display5 = true
          this.relationshipStatus = res.userData[0].relationshipStatus
        }

      })
    }
  }

  ngOnInit(): void {
  }

  addStatus(relationshipStatus: any){
    this.authService.addStatus(relationshipStatus).subscribe(res => {
      if (res['success']) {
        this.u_status = false
        this.status = false
        $(`.relationShip`).css('display','none');
        this.display5 = true
      }
    })
  }

  updateStatus(relationshipStatus: any){
    this.authService.addStatus(relationshipStatus).subscribe(res => {
      if (res['success']) {
        this.u_status = true
        $(`.relationShip`).css('display','none');
        this.display5 = false
      }
    })
  }

  deleteStatus(relationshipStatus: any){
    this.authService.deleteStatus(relationshipStatus).subscribe(res => {
      if (res['success']) {
        this.u_status = false
        this.shows5 = true
        $(`.relationShip`).css('display','block');
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
    this.display5 = false
    this.status = false
    this.family = false
  }

  u_cancel(){
    this.u_status = false
    this.display5 = true
  }

}
