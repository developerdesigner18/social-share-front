import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-request-friends',
  templateUrl: './request-friends.component.html',
  styleUrls: ['./request-friends.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RequestFriendsComponent implements OnInit {
  login_id = '';
  profileImg = '';
  u_name = '';
  description = '';
  url = '';
  showView = false;
  hideme=[]
  accept_hideme=[]
  prf_friend = [];

  // For friends profile view varible
  name = '';
  u_designation = '';
  u_state = '';
  u_country = '';
  u_city = '';
  u_hobbies = '';
  newDate: Date = null;
  fileDataVal: File = null;
  previewUrl:any = null;
  imageCov:any = 'assets/images/bg.jpg';
  token = '';
  checkclick = 0;
  timeline_hide = true

  clicked = true
  friend_req_hidden = true

  frd_req_get_count = 0

  public datas: any = [];
  public frd_datas: any = [];
  public frd_profile_datas: any = [];
  public check_datas;
  check_id_frd_list = [];
  remove_datas = '';

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.login_id = currentUser.data._id
  }

  ngOnInit(): void {
    let current_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getAllFriends(localStorage.getItem('token')).subscribe(res => {
      this.datas = res.AllUser[0]
    })

    this.authService.setRequestSend(localStorage.getItem('token')).subscribe(res => {
      for(let i = 0; i < res.list.length; i++){
        for(let j = 0; j < this.datas.length; j++){
          if(this.datas[j]._id == res.list[i].friendId){
            this.datas[j].match = true
          }
        }
      }
    })

    this.authService.getFriendRequest(current_id).subscribe(res => {
      if(res.message == "Not any friend request avilable")
      {
        this.friend_req_hidden = false
      }else{
        if(res.list.length == 0){
          this.friend_req_hidden = false
        }
        this.authService.getFriendData(current_id).subscribe(res => {
          this.frd_profile_datas = res.list
          for(let i = 0; i < this.frd_profile_datas.length; i++){
            this.frd_req_get_count += 1
            this.datas = this.datas.filter(({ _id }) => _id !== this.frd_profile_datas[i]._id)
          }
        })
      }
    })
  }

  openProfile(id){
    this.checkclick += 1
    this.showView = true

    this.authService.getProfileForFriend(id).subscribe(res => {
      this.name = res.data.name
      this.u_designation =  res.data.designation
      this.u_country =  res.data.country
      this.u_state =  res.data.state
      this.u_city =  res.data.city
      this.u_hobbies =  res.data.hobbies
      this.profileImg =  res.data.profileImgURl
      this.u_name =  res.data.name

      this.newDate= new Date(res.data.createdAt);
      this.previewUrl = res.data.profileImgURl
      this.imageCov = res.data.coverImgURl

      if(this.imageCov == undefined){
        this.imageCov = 'assets/images/bg.jpg'
      }
    })

    localStorage.setItem('friendId', id)

    this.authService.getFriendPost(localStorage.getItem('friendId')).subscribe(res => {
      this.frd_datas = res
      this.owlcarouselSet()
    })

    this.timeline_hide = true
    this.router.navigate([`friends/${this.login_id}`])
  }

  sendRequest(requestId){
    let userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.sendFriendRequest(userId, requestId).subscribe(res => {})
  }

  confirm_request(confirm_id){
    let userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.acceptFriendRequest(userId, confirm_id).subscribe(res => {})
  }

  reject_request(reject_id){
    let userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.rejectFriendRequest(userId, reject_id).subscribe(res => {})
  }


  owlcarouselSet(){
    jQuery(document).ready(function(){
      $('.owl-carousel').owlCarousel({
        nav:true,
        items:1,
        autoWidth: true
      })
    })
  }
}
