import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
  status: boolean;
  family: any;
  shows5: any;
  display5: any
  relationshipStatus: any
  u_status: any
  not_mention_relationship = false;
  icons: boolean;
  family_show = true
  show_family: boolean
  not_mention_family = false
  fill_family = false
  u_fill_family: boolean
  get_family = []
  relation: any

  id = this.activatedRoute.parent.parent.params['value']['id'];
  data_id: any;
  friendid: string;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public toastr: ToastrService
  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];
    if (localStorage.getItem('friendId')) { 
      this.friendid = localStorage.getItem('friendId')
      this.icons = false
      this.authService.getAllData(this.friendid).subscribe(res => {
        if (res.userData[0] === null) {
          this.not_mention_relationship = true
        } else if (res.userData[0].relationshipStatus !== undefined) {
          this.display5 = true
          this.relationshipStatus = res.userData[0].relationshipStatus
        } else {
          this.not_mention_relationship = true
        }

        if (res.userData[0] === null) {
          this.not_mention_family = true
          this.family_show = false
        } else if (res.userData[0].family.length > 0) {
          this.get_family = res.userData[0].family
          this.show_family = true
          this.family_show = false
        } else {
          this.family_show = false
          this.not_mention_family = true
        }
      })
    } else {
      const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
      if (current_login_User.data._id !== id) {
        this.icons = false
        this.authService.getAllData(id).subscribe(res => {
          if (res.userData[0] === null) {
            this.not_mention_relationship = true
          } else if (res.userData[0].relationshipStatus !== undefined) {
            this.display5 = true
            this.relationshipStatus = res.userData[0].relationshipStatus
          } else {
            this.not_mention_relationship = true
          }

          if (res.userData[0] === null) {
            this.family_show = false
            this.not_mention_family = true
          } else if (res.userData[0].family.length > 0) {
            this.get_family = res.userData[0].family
            this.show_family = true
            this.family_show = false
          } else {
            this.family_show = false
            this.not_mention_family = true
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

          if (res.userData[0].family !== undefined && res.userData[0] !== null) {
            this.get_family = res.userData[0].family
            this.show_family = true
          }
        })
      }
    }
  }

  ngOnInit(): void {
  }

  addStatus(relationshipStatus: any) {
    if (relationshipStatus !== undefined) {
      this.authService.addStatus(relationshipStatus).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your relationship status is added successfully")
          this.u_status = false
          this.status = false
          $(`.relationShip`).css('display','none');
          this.display5 = true
        }
      })
    } else {
      this.toastr.error("Please select your relationship status")
    }
  }

  updateStatus(relationshipStatus: any) {
    if (relationshipStatus !== undefined) {
      this.authService.addStatus(relationshipStatus).subscribe(res => {
        if (res['success']) {
          // this.toastr.success("Your relationship is updated successfully")
          this.u_status = true
          $(`.relationShip`).css('display','none');
          this.display5 = false
        }
      })
    } else {
      this.toastr.error("Please select your relationship status")
    }
  }

  deleteStatus(relationshipStatus: any){
    this.authService.deleteStatus(relationshipStatus).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Your relationship status is deleted successfully")
        this.u_status = false
        this.shows5 = true
        $(`.relationShip`).css('display','block');
        this.display5 = false
      } else {
        this.toastr.error("Oops some error occur. Please try again later")
      }
    })
  }

  addFamily(family, relation) {
    if (family !== undefined && relation !== undefined) {
      this.authService.addFamily(this.id, family, relation).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your family detail is saved successfully")
          this.family = family
          this.relation = relation
          this.show_family = true
          this.fill_family = false
          this.authService.getAllData(this.id).subscribe(res => {
            if (res.userData[0].family !== undefined) {
              this.get_family = res.userData[0].family
            }
           })
        }
      })
    } else if (family === undefined || relation === undefined) {
      this.toastr.error("Please enter details properly")
    } else {
      this.toastr.error("Please enter your details properly")
    }
  }

  editFamily(family, relation) {
    if (family !== undefined && relation !== undefined) {
      this.authService.updateFamily(this.id , family, this.data_id, relation).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your family data is updated successfully")
          this.show_family = true
          this.u_fill_family = false
          this.authService.getAllData(this.id).subscribe(res => {
            if (res.userData[0].family !== undefined) {
              this.get_family = res.userData[0].family
            }
           })
        }
      })
    } else if (family === undefined || relation === undefined) {
      this.toastr.error("Please enter your details properly")
    } else {
      this.toastr.error("Please enter your details properly")
    }
  }

  updateFamily(dataId, family, relation) {
    this.family = family;
    this.relation = relation
    this.show_family = false;
    this.u_fill_family = true;
    this.data_id = dataId
    this.authService.updateFamily(this.id , family, dataId, relation).subscribe(res => {
      
    })
  }

  delFamily(dataId: any) {
    this.authService.deleteFamily(this.id, dataId).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Your family data is deleted successfully")
        this.fill_family = false;
        this.show_family = false;
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0] == null) {
          }
          else if (res.userData[0].family !== undefined) {
            this.get_family = res.userData[0].family
            this.show_family = true}
        })
      } else {
        this.toastr.error("Oops some error occur. Please try again later")
      }
    })
  }

  newStatus() {
    this.status = true
  }

  newFamily(){
    this.fill_family = true
  }

  Cancel(){
    this.display5 = false
    this.status = false
    this.family = false
  }

  F_Cancel(){
    this.fill_family = false
  }

  u_cancel(){
    this.u_status = false
    this.display5 = true
  }

  f_cancel(){
    this.show_family = true
    this.u_fill_family = false
  }

}
