import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-people-know',
  templateUrl: './people-know.component.html',
  styleUrls: ['./people-know.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PeopleKnowComponent implements OnInit {
  name = '';
  id = '';
  search_id = '';
  profileImg = '';
  user_profile = '';
  allUsers = [];
  search_by_name = false;
  search_data: Array<any> = [];
  frd_request_count = 0;
  hideme=[]
  user_post = 0;
  count_frd = 0;
  accept_hideme=[]
  mutulFrdcount = [];
  mutulFrd = [];

  @ViewChild('searchText') searchTextElement: any;

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getProfileforAbout(this.id).subscribe(res => {
      this.name = res.data.name
      this.user_profile = res.data.profileImgURl
    })

    this.authService.getFriendData(this.id).subscribe(res => {
      this.frd_request_count = res.list.length
      if (this.frd_request_count === 0) {  
        console.log("-=-=-=-=-=-= testing", this.frd_request_count);
      } else {
        console.log("-=-=-=-=-=-= testing", this.frd_request_count);
        $(".badges_for_fr").addClass("show_count");
      }
    })

    this.authService.getProfilePost(this.id).subscribe(res => {
      if(res.code == 404){
        this.user_post = 0
      }else{
        this.user_post = res.length
      }
    })

    this.authService.getFriends(this.id).subscribe(res => {
      if(res['success']){
        this.count_frd = res.userInfo.length
      }
    })

    this.authService.getSuggestUser(this.id).subscribe(res => {
      this.allUsers = res['data']
      for(let i = 0; i < res['data'].length; i++){
        this.authService.getFriends(res['data'][i]._id).subscribe(res => {
          this.mutulFrdcount = res.userInfo.length
          // this.mutulFrd = res.userInfo.map(n => n.name)
        })
      }
    
    })
  }

  ngOnInit(): void {
  }

  sendRequest(requestId){
    this.authService.sendFriendRequest(this.id, requestId).subscribe(res => {})
  }

  reject_request(reject_id){
    this.authService.rejectFriendRequest(reject_id, this.id).subscribe(res => {

    })
  }

}
