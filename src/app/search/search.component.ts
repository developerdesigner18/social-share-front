import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var jQuery: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  name = '';
  id = '';
  search_id = '';
  profileImg = '';
  user_profile = '';
  allUsers = [];
  search_by_name = false;
  search_data: Array<any> = [];
  frd_request_count = 0;
  // cancel_request = false;
  hideme=[]
  user_post = 0;
  count_frd = 0;
  accept_hideme=[]
  noRecord = '';
  countSuggest = 0

  keyword = 'name';

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

    this.authService.getAllFriends(localStorage.getItem("token")).subscribe(res => {
      this.allUsers = res.AllUser[0]
    })

    this.authService.getFriendData(this.id).subscribe(res => {
      this.frd_request_count = res.list.length
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
      this.countSuggest = res['data'].length
    })
  }

  ngOnInit(): void {
  }

  searchFrd(){
    if(this.searchTextElement.nativeElement.value === ''){
      this.search_by_name = false
    }else{
      this.search_by_name = true

      this.authService.getSearchUser(this.searchTextElement.nativeElement.value).subscribe(res => {
        if(res['success'] == true){
          this.search_data = res.data;
        }else{
          this.noRecord = res.data;
        }
      })
    }
  }

  sendRequest(requestId){
    // let userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.sendFriendRequest(this.id, requestId).subscribe(res => {})
  }

  reject_request(reject_id){
    // let userId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("-=-=-=-=-=- user id", this.id);
    console.log("-=-=-=-=-- id", reject_id);
    
    this.authService.rejectFriendRequest(reject_id, this.id).subscribe(res => {})
  }
}
