import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  @ViewChild('searchText') searchTextElement: any;

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("=-=-=-=-=-=- id", this.id)
    this.authService.getProfileforAbout(this.id).subscribe(res => {
      this.name = res.data.name
      this.user_profile = res.data.profileImgURl
    })

    this.authService.getAllFriends(localStorage.getItem("token")).subscribe(res => {
      // this.name = res.data.name
      this.allUsers = res.AllUser[0]
    })
  }

  ngOnInit(): void {
  }

  searchFrd(){
    this.search_by_name = true

    this.authService.getSearchUser(this.searchTextElement.nativeElement.value).subscribe(res => {
      this.search_data = res.data;
    })
  }

  // mySortingFunction = (a, b) => {
  //   return a.key > b.key ? -1 : 1;
  // }
}
