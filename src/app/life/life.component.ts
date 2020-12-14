import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.css']
})
export class LifeComponent implements OnInit {
  life: any;
  life_show = true;
  show_life: boolean;
  fill_life = false;
  u_fill_life: boolean
  icons: boolean
  not_mention_life = false;
  get_life: any
  lifes = 'lifeEvents';

  id = this.activatedRoute.parent.parent.params['value']['id'];
  data_id: any;
  constructor(
    public router: Router,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
    const id = this.activatedRoute.parent.parent.params['value']['id'];
    if (this.router.url == '/friends/' + id + '/about/work_and_education') {
      this.authService.getFriendData(localStorage.getItem('friendId')).subscribe(res => {
      })
    } else {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      localStorage.removeItem('friendId')
      if (currentUser.data._id !== id) {
        this.icons = false
        this.authService.getAllData(id).subscribe(res => {
          if (res.userData[0].lifeEvents.length > 0) {
            this.get_life = res.userData[0].lifeEvents
            this.show_life = true
            this.life_show = false
          } else {
            this.life_show = false
            this.not_mention_life = true
          }
        })
      } else {
        this.authService.getAllData(id).subscribe(res => {
          this.icons = true
          if (res.userData[0].lifeEvents !== undefined && res.userData[0] !== null) {
            this.get_life = res.userData[0].lifeEvents
            this.show_life = true
          } else {
            // this.work = false
          }
        })
      }
    }
   }

  ngOnInit(): void {
  }

  save_add_life(life: any) {
    this.authService.addLifeEvent(this.id, life, this.lifes).subscribe(res => {
      if (res['success']) {
        this.life = life
        this.show_life = true
        this.fill_life = false
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0].lifeEvents !== undefined) {
            this.get_life = res.userData[0].lifeEvents
          }
         })
      }
    })
  }

  editLife(life: any) {
    this.authService.updateLifeEvent(this.id , life, this.data_id, this.lifes).subscribe(res => {
      if (res['success']) {
        this.show_life = true
        this.u_fill_life = false
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0].lifeEvents !== undefined) {
            this.get_life = res.userData[0].lifeEvents
          }
         })
      }
    })
  }

  updateLife(dataId: any, life: any) {
    this.life = life;
    this.show_life = false;
    this.u_fill_life = true;
    this.data_id = dataId
    this.authService.updateLifeEvent(this.id , life, dataId, this.lifes).subscribe(res => {
      if (res['success']) {
      } 
    })
  }

  delLife(dataId: any) {
    this.authService.deleteLifeEvent(this.id, dataId, this.lifes).subscribe(res => {
      if (res['success']) {
        this.fill_life = false;
        this.show_life = false;
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0].lifeEvents !== undefined && res.userData[0] !== null) {
            this.get_life = res.userData[0].lifeEvents
            this.show_life = true
          } else {
            // this.work = false
          }
        })
      }
    })
  }

  newLifeEvent(){
    this.fill_life = true
  }

  Life_Cancel() {
    this.fill_life = false
  }

  l_cancel() {
    this.show_life = true
    this.u_fill_life = false
  }

}
