import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InformationComponent implements OnInit {
  id: number;
  count_frd: any;
  user_post: number;
  constructor(public authService: AuthService,
    private activatedRoute: ActivatedRoute) {
    // let id = this.activatedRoute.parent.parent.params['value']['id'];
    this.id = this.activatedRoute.parent.params['value']['id'];
    this.authService.getAllData(this.id).subscribe(res => { 
      console.log("res", res)
    })
    this.authService.getFriends(this.id).subscribe(res => {
      if(res['success']){
        this.count_frd = res.userInfo.length
      }
    })
    this.authService.getProfilePost(this.id).subscribe(res => {
      if(res.code == 404){
        this.user_post = 0
      }else{
        this.user_post = res.length
      }
    })
    }

  

  ngOnInit(): void {
  }

}
