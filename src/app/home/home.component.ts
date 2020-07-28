import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  name = '';
  id = '';
  profileImg = '';
  param = '';

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getUserHome(id).subscribe(res => {
      this.id = res.data._id
      this.name =  res.data.name
      this.profileImg = res.data.profileImgURl
    })
  }

  ngOnInit(): void {
    $(document).ready(function(){
      $('.owl-carousel').owlCarousel({
    		nav:true,
    		items:1,
        autoWidth: true
    	});

      $('.comment_sec').on('click',function(){
  			$('.comments_container').toggle();
  		});
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.replace('');
  }
}
