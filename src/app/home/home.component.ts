import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  name = '';
  id = '';

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getUserHome(id).subscribe(res => {
      this.id =  res.data[0]._id
      this.name =  res.data[0].name
    })
  }

  ngOnInit(): void {
    (function ($) {
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
    })(jQuery);
  }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.replace('');
  }
}
