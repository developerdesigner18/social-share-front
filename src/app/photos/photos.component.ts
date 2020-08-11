import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  slideIndex = 1
  token = '';
  urls = [];
  totalImg = 0;
  public frd_datas: any = [];

  public datas;
  constructor(
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.token = localStorage.getItem('token')

    if(this.router.url === '/friends/' + this.activatedRoute.parent.params['value']['id'] + '/photos'){
      this.authService.getFriendPost(localStorage.getItem('friendId')).subscribe(res => {
        this.datas = res
        this.totalImg = this.datas.length
        for(let i = 0; i < this.datas.length; i++){
          if(this.datas[i].imageUrl != undefined){
            this.urls.push(this.datas[i].imageUrl);
          }
        }
        return this.datas
      })
    }else{
      localStorage.removeItem('friendId')
      this.authService.getProfilePost(this.token).subscribe(res => {
        this.datas = res
        this.totalImg = this.datas.length
        for(let i = 0; i < this.datas.length; i++){
          if(this.datas[i].imageUrl != undefined){
            this.urls.push(this.datas[i].imageUrl);
          }
        }
        return this.datas
      })
    }
  }

  ngOnInit(): void {
    // this.showSlides(this.slideIndex = 1);
  }

  // Close the Modal
  openModal(){
    document.getElementById("myModal").style.display = "block";
  }

  // Close the Modal
	closeModal() {
		document.getElementById("myModal").style.display = "none";
	}

  // Next/previous controls
	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	// Thumbnail image controls
	currentSlide(n) {
		this.showSlides(this.slideIndex = n);
	}

  showSlides(n) {
  	var i;
  	var slides = document.getElementsByClassName("mySlides");
  	var dots = document.getElementsByClassName("demo");
  	var captionText = document.getElementById("caption");
  	if (n > slides.length) {this.slideIndex = 1}
  		if (n < 1) {this.slideIndex = slides.length}
  			for (i = 0; i < slides.length; i++) {
  				slides[i].style.display = "none";
  			}
  			for (i = 0; i < dots.length; i++) {
  				dots[i].className = dots[i].className.replace(" active", "");
  			}
  			slides[this.slideIndex-1].style.display = "block";
  			// dots[this.slideIndex-1].className += " active";
  			// captionText.innerHTML = dots[this.slideIndex-1].alt;
  }
}
