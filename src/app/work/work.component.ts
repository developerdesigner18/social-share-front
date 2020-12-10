import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  work: boolean;
  university: boolean;
  school: boolean;
  current_user_profile = true;
  works = 'work';
  id: string;
  get_works = [];
  event: string;
  fill_work = false;
  show_work: boolean
  u_fill_work: boolean
  icons = false;
  not_mention_work = false;
  dataId: any;
  data_id: any;

  
  constructor(
    public router: Router,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
    const id = this.activatedRoute.parent.parent.params['value']['id'];
    if (this.router.url == '/friends/' + id + '/about/work_and_education') {
      this.authService.getFriendData(localStorage.getItem('friendId')).subscribe(res => {
        this.current_user_profile = false
      })
    }else{
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      localStorage.removeItem('friendId')
      if(currentUser.data._id !== id){
        this.current_user_profile = false
      }
    }
    this.authService.getAllData(id).subscribe(res => {
      this.icons = true
      if (res.userData[0] == null) {
        this.work = false
        console.log("-=-=-=-=-=-=-=-=-=--res", res.userData);
      }
      else if (res.userData[0].work !== undefined) {
        // this.get_works = res.userData[0].work.map((name) => name.name)
        this.get_works = res.userData[0].work
        this.dataId = res.userData[0].work.map((_id) => _id._id[0])
        this.show_work = true
        this.work = true
      } else {
        this.work = false
      }
    })
    this.id = this.activatedRoute.parent.parent.params['value']['id'];
    // this.show_work = true
  }

  
  

  ngOnInit(): void {
  }

  newWork(){
    this.fill_work = true
    this.work = false
  }

  newUniversity(){
    this.university = true
  }

  newSchool(){
    this.school = true
  }
  
  save_add_work(event: any) {
    this.authService.addWork(this.id, event, this.works).subscribe(res => {
      if (res['success']) {
        this.event = event
        this.show_work = true
        this.work = true;
        this.fill_work = false
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0].work !== undefined) {
            this.get_works = res.userData[0].work
          }
         })
      }
    })
  }

  editWork(event: any) {
    this.authService.updateWork(this.id , event, this.data_id, this.works).subscribe(res => {
      if (res['success']) {
        this.show_work = true
        this.u_fill_work = false
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0].work !== undefined) {
            this.get_works = res.userData[0].work
          }
         })
      }
    })
  }

  updateWork(dataId: any, event: any) {
    this.event = event;
    this.show_work = false;
    this.u_fill_work = true;
    this.data_id = dataId
    this.authService.updateWork(this.id , event, dataId, this.works).subscribe(res => {
      if (res['success']) {
        // this.u_mobile = true
        // this.display1 = false
      } else {
        console.log("error");
        // this.display1 = true;
      }
    })
  }

  delWork(dataId: any) {
    this.work = false;
    this.fill_work = false;
    this.show_work = false;
    this.authService.deleteWork(this.id, dataId, this.works).subscribe(res => {
      if (res['success']) {
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0].work !== undefined) {
            this.get_works = res.userData[0].work
          }
         })
      } else {
        console.log("error");
        // this.display1 = true;
      }
    })

   
  }

 

  Cancel(){
    // this.work = false
    // this.university = false
    // this.school = false
    this.work = false;
    this.fill_work = false;
  }

  u_cancel() {
    this.show_work = true
    this.u_fill_work = false
  }

}
