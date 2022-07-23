import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common'
import { Emoji } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.scss'],
  providers: [DatePipe]
})
export class LifeComponent implements OnInit {
  life: any;
  life_show = true;
  show_life: boolean;
  fill_life = false;
  u_fill_life: boolean
  icons: boolean
  not_mention_life: any;
  get_life: any
  lifes = 'lifeEvents';
  id = this.activatedRoute.parent.parent.params['value']['id'];
  data_id: any;
  friendid: string;
  myDate: any = new Date();
  emojiForm: any;
  constructor(
    public router: Router,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    public toastr: ToastrService,
    public cookieService: CookieService
  ) {
    const id = this.activatedRoute.parent.parent.params['value']['id'];
    if (this.cookieService.get('friendId')) {
      // this.friendid = localStorage.getItem('friendId')
      this.friendid = this.cookieService.get('friendId')
      this.icons = false
        this.authService.getAllData(this.friendid).subscribe(res => {
          if (!res['success']) {
            this.not_mention_life = "Event Life"
            this.life_show = false
          } else if (res.userData[0].lifeEvents.length > 0) {
            this.get_life = res.userData[0].lifeEvents
            this.show_life = true
            this.life_show = false
            this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
          } else {
            this.life_show = false
            this.not_mention_life = "Event Life"
          }
        })
    } else {
      this.cookieService.delete('friendId')
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      localStorage.removeItem('friendId')
      if (currentUser.data._id !== id) {
        this.icons = false
        this.authService.getAllData(id).subscribe(res => {
          if (!res['success']) {
            this.life_show = false
            this.not_mention_life = "Life Event"
          } else if (res.userData[0].lifeEvents.length > 0) {
            this.get_life = res.userData[0].lifeEvents
            this.show_life = true
            this.life_show = false
            this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
          } else {
            this.life_show = false
            this.not_mention_life = "Life Event"
          }
        })
      } else {
        this.authService.getAllData(id).subscribe(res => {
          this.icons = true
          if(res.success){
            if (res.userData[0].lifeEvents !== undefined && res.userData[0] !== null) {
              this.get_life = res.userData[0].lifeEvents
              this.show_life = true
              this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
            }
          }
        })
      }
    }
    
   }

  ngOnInit(): void {
  }
  message = '';
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'twitter';
  toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    const { life } = this;
    const text = `${life}${event.emoji.native}`;
    this.life = text;
  }

  onFocus() {
    this.showEmojiPicker = false;
  }
  onBlur() {
  }

  
  save_add_life(life: any) {
    if (life !== undefined) {
      this.authService.addLifeEvent(this.id, life, this.lifes).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your life event is added successfully")
          this.life = life
          this.show_life = true
          this.fill_life = false
          this.authService.getAllData(this.id).subscribe(res => {
            if (res.userData[0].lifeEvents !== undefined) {
              this.get_life = res.userData[0].lifeEvents
            }
          })
          this.life = ''
        }
      })
    } else {
      this.toastr.error("Please enter your life event properly")
    }
  }

  editLife(life: any) {
    if (life !== undefined && life !== '') {
      this.authService.updateLifeEvent(this.id , life, this.data_id, this.lifes).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your life event is updated successfully")
          this.show_life = true
          this.u_fill_life = false
          this.authService.getAllData(this.id).subscribe(res => {
            if (res.userData[0].lifeEvents !== undefined) {
              this.get_life = res.userData[0].lifeEvents
            }
          })
          this.life = ''
        }
      })
    } else {
      this.toastr.error("Please enter your life event properly")
    }
  }

  updateLife(dataId: any, life: any) {
    this.life = life;
    this.show_life = false;
    this.u_fill_life = true;
    this.data_id = dataId
    this.authService.updateLifeEvent(this.id , life, dataId, this.lifes).subscribe(res => { })
  }

  delLife(dataId: any) {
    this.authService.deleteLifeEvent(this.id, dataId, this.lifes).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Your life event is deleted successfully")
        this.fill_life = false;
        this.show_life = false;
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0].lifeEvents !== undefined && res.userData[0] !== null) {
            this.get_life = res.userData[0].lifeEvents
            this.show_life = true
          }
        })
      } else {
        this.toastr.error("Oops some error occur. Please try again later")
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
