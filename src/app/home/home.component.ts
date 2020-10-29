import { Component, OnInit, ViewEncapsulation,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog} from  '@angular/material/dialog';
import { PostModalComponent } from '../post-modal/post-modal.component';
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
  post_profileImg = '';
  param = '';
  frd_request_count = 0;

  // posts
  description = '';
  // url = '';
  url = [];
  token = '';
  user_post = 0;
  count_frd = 0;
  countSuggest = 0;
  postlikeId = [];
  likes = [];
  alreadyLike = '';
  postlikeuserId = [];
  objVal = [];
  comments = 0;
  toggle = [];
  current_user = '';
  allUsers = [];

  keyword = 'name';
  showbasicProfile = [];
  showLikes = [];

  // @ViewChild('like_font') likeFontElement: any;
  checkPostsId: any;
  commentsForm: FormGroup;
  twoimg = false;
  // postCmtId = '';
  oneimg = false;
  urls = [];
  viewImgdatas = [];
  postId = [];
  viewImg = [];
  slideIndex = 1;

  public datas;
  public temp;

  @ViewChild("mySlidesImg", {static: true}) mySlidesImg: ElementRef;

  imageObject: Array<object> = [{
        image: 'assets/images/gal_1.jpg',
    }]

  constructor(
    public authService: AuthService,
    public  dialog:  MatDialog,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getUserHome(id).subscribe(res => {
      this.id = res.data._id
      this.name =  res.data.name
      this.profileImg = res.data.profileImgURl
    })

    this.token = localStorage.getItem('token')
    this.current_user = JSON.parse(localStorage.getItem('currentUser'))
    this.authService.getAllFriendPost(this.token).subscribe(res => {
      if(res.message == "You are not any friend")
      {
        console.log("-=-=-=-=-Welcome to social share")
      }else{
        this.datas = res.posts
        for(let i = 0; i < this.datas.length; i++){
          this.description = this.datas[i].description;
          this.likes = this.datas[i].like
          this.comments = this.datas[i].comment.length
          this.url.push(this.datas[i].imageUrl)
          this.authService.getHomePostProfile(this.datas[i].userId).subscribe(res => {
            this.datas[i].post_user_designation = res.data.designation
            this.datas[i].post_user_email = res.data.emailId
            this.datas[i].post_profileImg = res.data.profileImgURl
            this.datas[i].post_user = res.data.name
          })

          if(this.likes.length > 0){
            for(let j = 0; j < this.datas[i].like.length; j++){
              this.postlikeuserId.push(this.datas[i].like[j]['userId'])
              if(this.postlikeuserId.includes(id)){
                this.postlikeId.push(this.datas[i]._id)
              }
            }
            this.postlikeuserId = Array.from(new Set(this.postlikeuserId)) //For Uniquee fecth
          }
          if(this.datas[i].imageUrl.length == 2){
            this.twoimg = true
          }
        }
        // this.ngOnInit()
        return this.datas
      }
    })

    this.authService.getAllFriends(localStorage.getItem("token")).subscribe(res => {
      this.allUsers = res.AllUser[0]
    })

    this.authService.getFriendData(id).subscribe(res => {
      this.frd_request_count = res.list.length
    })

    this.authService.getProfilePost(id).subscribe(res => {
      if(res.code == 404){
        this.user_post = 0
      }else{
        this.user_post = res.length
      }
    })

    this.authService.getFriends(id).subscribe(res => {
      if(res['success']){
        this.count_frd = res.userInfo.length
      }
    })

    this.authService.getSuggestUser(id).subscribe(res => {
      this.countSuggest = res['data'].length
    })

    this.commentsForm= this.formBuilder.group({
      newcomment: ['']
    })
  }

  get formControls() { return this.commentsForm.controls }

  // ngAfterViewInit(): void {
  //   this.showSlides(this.slideIndex)
  // }

  ngOnInit(): void {
    $(document).ready(function(){
      $('.owl-carousel').owlCarousel({
    		nav:true,
    		items: 1,
        autoWidth: true,
        video: true,
        videoHeight: 300,
        videoWidth: 600
    	});
    });
    this.toggle = this.toggle
  }

  open_comments(postId){
    $(`.comments_container_${postId}`).toggle();
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('friendId');
    window.location.replace('');
  }

  openTextDialog(){
    this.dialog.open(PostModalComponent, {
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: { id: this.id }
    });
  }

  fileData: File = null;
  previewUrl: any = null;
  images = [];
  files_data: any = [];
  openDialog(event: any): void{

    // Single image post upload
    // console.log("-=-=-=-=-=-photos open")
    // this.fileData = <File>event.target.files[0]
    //
    // // Show preview
    // var mimeType = this.fileData.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }
    //
    // var reader = new FileReader();
    // reader.readAsDataURL(this.fileData);
    //
    // reader.onload = (_event) => {
    //   this.previewUrl = reader.result; //based64 image
    //   this.dialog.open(PostModalComponent, {
    //     width: '550px',
    //     panelClass: 'custom-dialog-container',
    //     data: { id: this.id, postImg: this.previewUrl, file: this.fileData }
    //   });
    // }

    //Multipul Image upload
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event:any) => {
           this.images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
        this.files_data.push(event.target.files[i]);
      }
    }
    const dialogRef = this.dialog.open(PostModalComponent, {
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: { id: this.id, images: this.images, file: this.files_data  }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.images = [];
      this.files_data = [];
    });
  }

  temLike = 0;
  checkTem =  false


  likeIt(postId, likeCount){
    this.authService.sendLikePost(postId).subscribe(res => {
      if(res['success'])
      {
          this.checkTem = true
          if(document.getElementById(postId).classList[2] === 'fa-thumbs-up' || document.getElementById(postId).classList[1] === 'fa-thumbs-up')
          {
            document.getElementById(postId).classList.remove('fa-thumbs-up')
            document.getElementById(postId).classList.add('fa-thumbs-o-up')
            this.temLike = likeCount - 1
            this.temLike <= 0 ? document.getElementById('count_'+postId).innerHTML = '' : document.getElementById('count_'+postId).innerHTML = String(this.temLike);
          }else {
            document.getElementById(postId).classList.add('fa-thumbs-up')
            this.temLike = likeCount + 1
            if(likeCount < 1){
              this.temLike = this.temLike - 1
            }

            if(this.temLike >= 2){
              this.temLike = this.temLike - 1
            }else{
              this.temLike = this.temLike + 1
            }
            this.temLike <= 0 ? document.getElementById('count_'+postId).innerHTML = '' : document.getElementById('count_'+postId).innerHTML = String(this.temLike);
          }
      }
    })
  }

  DoNotlikeIt(postId, likeCount){
    this.authService.sendLikePost(postId).subscribe(res => {
    })
  }

  temCmnt = [];
  tempPostId = '';
  count = 0
  tempProfile = '';
  tempName = '';
  temCmntCnt = ''

  addComments(postId, userName, profilePic){
    this.objVal = Object.keys(this.commentsForm.value).map(key => ({type: key, value: this.commentsForm.value[key]}))
    this.authService.sendPostComment(postId, this.objVal[0].value).subscribe(res => {
      if(res['success']){
        $(`.comments_container_${postId}`).css('display','block');
        if(this.datas.map((id) => id._id).includes(postId)){
          this.tempName = userName
          this.tempProfile = profilePic
          this.tempPostId = postId
          this.checkTem = true
          this.temCmnt.push(this.objVal[0].value)
        }
      }
    })
    this.commentsForm.reset()
  }

  totalImg = 0;
  // Open the Modal
  openModal(id: any){
    this.authService.getAllFriendPost(this.token).subscribe(res => {
      this.viewImgdatas = res.posts
      let onlyMatch = this.viewImgdatas.find(({_id}) => _id === id)
      this.totalImg = onlyMatch.imageUrl.length
      this.viewImg = onlyMatch.imageUrl
    })
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

  // showSlides(n) {
  //   console.log("=-=-=-=-=-n is", n)
  // 	var slides = $(".mySlides");
  //   console.log("=-=-=-=-jquery slides length", this.totalImg)
  //   // $(document).ready(function() {
  //   //   var parent = document.getElementById("parentId");
  //   //   var nodesSameClass = parent.getElementsByClassName("mySlides");
  //   //   console.log("=-=-=-=--= total length", nodesSameClass.length);
  //   // })
  //   console.log("=-=-=-=-=-=-slides",document.getElementsByClassName('mySlides').length)
  //   console.log("=-=-=-=-=-=-slides n", n)
  // 	// var dots = document.getElementsByClassName("demo");
  // 	// var captionText = document.getElementById("caption");
  // 	if (n > slides.length) {this.slideIndex = 1}
  // 	if (n < 1) {this.slideIndex = slides.length}
	// 	for (var i = 0; i < slides.length; i++) {
	// 		slides[i].style.display = "none";
	// 	}
	// 	// for (i = 0; i < dots.length; i++) {
	// 	// 	dots[i].className = dots[i].className.replace(" active", "");
	// 	// }
  //   console.log("=-=-=-=-=-=slides[this.slideIndex-1]", this.slideIndex)
  //   console.log("=-=-=-=-=-=slides[this.slideIndex-1] slides", slides[this.slideIndex-1])
	//   slides[this.slideIndex-1].style.display = "block";
	//   // slides[this.slideIndex-1].css('style','display: block');
	//   // $(".mySlides").css('style','display: block');
	// 	// dots[this.slideIndex-1].className += " active";
	// 	// captionText.innerHTML = dots[this.slideIndex-1].alt;
  // }

  // showSlides = () => {
  // const slides = document.getElementsByClassName('mySlides');
  // console.log("=-=-=-=-=-slides", slides)
  //   for (let i = 0; i < slides.length; i++) {
  //       const slide = slides[i] as HTMLElement;
  //       slide.style.display = "none";
  //   }
  // };

  showSlides(n: any){
    var i;
    var slides = document.getElementsByClassName("mySlides");
    // var slides = $(".slider_image_3");
    // console.log("=-=-=-=-=-==-=--get class name", document.getElementById("modalContent").getElementsByClassName('mySlides'))
    // document.addEventListener("DOMContentLoaded", function(e) {
    // $('document').ready(function(){
    // (function() {
      // const slides2 = document.getElementById("modalContent").getElementsByClassName('mySlides')
      // console.log("=-=-=-=-=-=-slides2", slides)
      // for (let i = 0; i < slides.length; i++) {
      //   const slide = slides[i];
      //   console.log("=----=----==-slide", slide)
      // }
      // for (let index = 0; index < slides2.length; index++) {
      //   const input = slides.item(index);
      //   console.log("=-=-=-=-=input", input)
      // }
      //
      // const elements: Element[] = Array.from(document.getElementById("modalContent").getElementsByClassName('mySlides'));
      // console.log("=-=-=-=-=-=-elements", elements)
      // elements.forEach((el: Element) => {
      //   console.log("=-=-=-=-=-=-=-=-el elements", el)
      //     // do something
      // })

      // slides2.foreach((slide) => {
      //
      // })
      // var slides2 = document.getElementById("modalContent").getElementsByClassName('mySlides')
      // for (const c of slides2) {

      // for (const item of slides2) {
      //       console.log("=-=-=-=-=-item", item);
      //   }
          // console.log("=-=-=-=-=-=-slides2", slides2.innerHTML)
      // }

    // })
    // $(".slider_image_3").removeClass('.slider_image_3')
    // $(".mySlides").addClass(".slider_image_3")
    // console.log("=-=-=-=-=-=-=-slides length next", slides.length)
    // console.log("=-=-=-=-=-=-=-slides length next", slides)
    // console.log("=-=-=-=-=-=-=-n", n)
    // console.log("=-=-=-=-=-=-=-slide index", this.slideIndex)
    const change = document.getElementById("modalContent").getElementsByClassName('mySlides')
    // console.log("=-=-=-=-=-=-change", change)
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      // console.log("=-=-=-=-=-modal images", document.getElementById("modalContent").getElementsByClassName('mySlides'))
      // console.log("=-=-=-=-=-slides", slides[i])

      slides[i].style.display = "none";
    }
    slides[this.slideIndex-1].style.display = "block";
        // dots[this.slideIndex-1].className += " active";
        // captionText.innerHTML = dots[this.slideIndex-1].alt;
  }
}
