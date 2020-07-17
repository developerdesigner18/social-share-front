import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  slideIndex = 1

  constructor() { }

  ngOnInit(): void {
    this.showSlides(this.slideIndex);
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
        // console.log(dots)
        // console.log(this.slideIndex - 1)
        // console.log("-=-=-=-=-=-=-Class")
  			// dots[this.slideIndex-1].className += " active";
  			// captionText.innerHTML = dots[this.slideIndex-1].alt;
  }
}
