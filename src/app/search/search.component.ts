import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  searchText;
  profileImg = '';

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getSearchUser(id).subscribe(res => {
      this.id =  res.data._id
      this.name =  res.data.name
      this.profileImg = res.data.profileImgURl
    })
  }

  ngOnInit(): void {
  }

}
