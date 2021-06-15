import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog} from  '@angular/material/dialog';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { AuthService } from '../auth.service';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit {
  id = '';
  postImage: any = '';
  images = [];
  postProfileimg: any = null;
  u_name = '';
  u_designation = '';
  u_email = '';
  description = '';
  urls = [];
  profileImg = '';
  posts: any = '';
  token = '';
  current_user_profile = true
  notfound = 0;
  likePost = false;
  checkloginUser = '';
  likepostUserId = '';
  hideme=[];
  likes = [];
  removelike = 0;
  objVal = [];
  totalDisplayed: any;
  show_load_more: boolean = true;

  postlikeId = [];
  commentsForm: FormGroup;
  showbasicProfile = [];
  showbasicProfile2 = [];
  showbasicProfile3 = [];

  viewImgdatas = [];
  allUsers = [];
  viewImg = [];
  count = 1;
  public slideIndex = 1;

  postImageData = {}

  @ViewChild('textmsgPost') postMesssgeElement: any;
  @ViewChild('nav') slider: NgImageSliderComponent;

  public datas: any[];
  u_country: any;
  u_state: any;
  u_city: any;
  image_all = [];
  postId: any;
  url_id: string;
  shares: any;
  tool = [];
  totalDisplay: number;
  bodyHeight: number;

  @HostListener("window:scroll")
  onScroll(e: Event): void {
    if (this.bottomReached()) {
      this.totalDisplay += 1;
      this.bodyHeight += 600;
    }
  }

  constructor(
    public  dialog:  MatDialog,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public router: Router,
    public formBuilder: FormBuilder,
    public toastr: ToastrService
  ) {
    // $(".right_sidebar").css("display", "block");
    
    // this.totalDisplayed = 10;
    this.bodyHeight = 2000;
    this.totalDisplay = 3;
    $(document).ready(function(){
      setTimeout(function(){
         $(".load_more").show();
       }, 5000);
   });
   
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.url_id = user.data._id
    this.token = localStorage.getItem('token')
    this.id = this.activatedRoute.parent.params['value']['id'];
    
    this.authService.getUserProfile(this.id).subscribe(res => { 
      this.profileImg =  res.data.profileImgURl
      this.u_name =  res.data.name
      this.u_designation =  res.data.designation
      this.u_email = res.data.emailId
      this.u_state =  res.data.state
      this.u_city =  res.data.city
    })

    this.authService.getFriends(this.id).subscribe(res => {
      this.allUsers = res.userInfo
    })

    this.authService.getProfilePost(this.id).subscribe(res => {
      if(res.length > 0){
        this.datas = res        
        if (this.datas.length < 10) {
          this.show_load_more = false
        }
        const { image, thumbImage, alt, title, name, description } = res;
        for(let i = 0; i < this.datas.length; i++){
          this.description = this.datas[i].description;
          this.urls.push(this.datas[i].imageUrl)
          this.likes = this.datas[i].like
          for (let j = 0; j < this.datas[i].comment.length; j++){
            this.authService.getHomePostProfile(this.datas[i].comment[j].userId).subscribe(res => {
              this.datas[i].post_profileImg = res.data.profileImgURl
              this.datas[i].post_user = res.data.name
              this.datas[i].post_user_designation = res.data.designation
              this.datas[i].post_user_email = res.data.emailId
            })
          }
          if(this.likes.length > 0){
            this.postlikeId.push(this.datas[i]._id)
          }
          if (this.datas[i].comment.length > 4) {
            $('.comments_container').css('height', '40vh');
            $('.comments_container').css('overflow-y', 'scroll');
          }
        }
        return this.datas
      }else{
        this.notfound = res.code
      }
    })


    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser.data._id == this.id){
      this.current_user_profile = true
    }else{
      this.current_user_profile = false
    }

    this.commentsForm= this.formBuilder.group({
      newcomment: ['']
    })

  }

  get formControls() { return this.commentsForm.controls }

  ngOnInit(): void {
  }

  

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY * 1.1) >= this.bodyHeight;
  }

  ngOnChanges(): void {
    var trying = document.getElementById('tooltiptexts');
    let index: any = trying.getAttribute('data-index');
    document.getElementById('like_' + this.postId + '_' + index).innerHTML = this.u_name ? document.getElementById('like_' + this.postId + '_' + index).innerHTML = '-' : document.getElementById('like_' + this.postId + '_' + index).innerHTML = this.u_name;
  }

  open_comments(postId){
    $(`.comments_container_${postId}`).toggle();
  }
  view_more(postId) {
    $(`#view_more_${postId}`).css('display', 'none');
    $(`#view_${postId}`).css('display', 'block');
    $(`#sview_${postId}`).css('display', 'none');
  }
  trackByFn(i) {
    return i;
  }

  loadMore() {
    this.totalDisplayed += 10;  
    if (this.totalDisplayed >= this.datas.length) {
      this.show_load_more = false
    }
  };

  share(postId) { 
    $(`.sharing_container_${postId}`).toggle();
  }

  sharing(postId, post_user) { 
    if (confirm("You are sharing "+ `${post_user}` +" post with your timeline!")) {
      this.authService.sharingPosts(this.token, postId, this.id).subscribe(res => { 
        this.toastr.success("You are successfully shared the post!");
        window.location.reload();
      })
    } else {
      this.toastr.error("Oops some error occur please try again later")
    }
  }

  DeletePost(postId) {
    if (confirm("Are you sure you want to delete this post?")) {
      this.authService.DeletePost(postId).subscribe(res => {
        this.toastr.success("Post is deleted successfully");
        window.location.reload()
      })
    } else {
      this.toastr.error("Deleting post is failed.");      
    }
  }

  openTextDialog(event: any){
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
      data: { id: this.id, images: this.images, file: this.files_data }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.images = [];
      this.files_data = [];
    });
  }

  fileData: File = null;
  previewUrl: any = null;
  previewallUrl: any[] = [];
  fileToReturn: File = null;
  files_data: any = [];
  openDialog(event: any): void {
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

  temCmnt = [];
  tryCmnt: any = [];
  checkTem =  false
  tempPostId = '';

  temLike = 0;
  tempLikePostId = ''
  temCntLike: any = []
  like_name: any = [];
  like_length: any;
  data: any = []
  likeIt(postId: string, likeCount: number){

    var trying = document.getElementById('tooltiptexts');
    // let index: any = trying.getAttribute('data-index');

    this.authService.sendLikePost(postId).subscribe(res => {
      if(res['success'])
      {
        this.data = res['data']
        this.like_length = this.data.length
        // document.getElementById('like_' + postId).style.display = "none";
        this.checkTem = true
        if(document.getElementById(postId).classList[2] === 'fa-thumbs-up' || document.getElementById(postId).classList[1] === 'fa-thumbs-up')
        {
          document.getElementById(postId).classList.remove('fa-thumbs-up')
          document.getElementById(postId).classList.add('fa-thumbs-o-up')
          // this.temLike = likeCount - 1
          // this.temLike <= 0 ? document.getElementById('count_' + postId).innerHTML = '' : document.getElementById('count_' + postId).innerHTML = String(this.temLike);
          // document.getElementById('like_' + postId + '_' + index).innerHTML = this.u_name ? document.getElementById('like_' + postId + '_' + index).innerHTML = '' : document.getElementById('like_' + postId + '_' + index).innerHTML = this.u_name;
          // // if (this.datas.map((id) => id._id).includes(postId)) {
          // //   this.tempLikePostId = postId
          // //   this.temCntLike--;
          // // }
          // document.getElementById('like_' + postId + '_' + index).innerHTML = this.u_name ? document.getElementById('like_' + postId + '_' + index).innerHTML = '' : document.getElementById('like_' + postId + '_' + index).innerHTML = this.u_name;
          // $('like_' + postId + '_' + index).html(this.u_name ? document.getElementById('like_' + postId + '_' + index).innerHTML = '' : document.getElementById('like_' + postId + '_' + index).innerHTML = this.u_name);
          if (this.datas.map((id) => id._id).includes(postId)) {
              this.tempLikePostId = postId
              this.temCntLike--;
              document.getElementById('like_' + postId).innerHTML = "";
              for(let i = 0; i < this.data.length; i++){
                this.like_name = this.data[i].name
              document.getElementById('like_' + postId).innerHTML += "<p>" + this.like_name + "</p>"
              
              }
            }
        }else {
          document.getElementById(postId).classList.add('fa-thumbs-up')
          // this.temLike = likeCount + 1
          // if(likeCount < 1){
          //   this.temLike = this.temLike - 1
          // }
          // if(this.temLike >= 2){
          //   this.temLike = this.temLike - 1
          // }else{
          //   this.temLike = this.temLike + 1
          // }
          // this.temLike <= 0 ? document.getElementById('count_' + postId).innerHTML = '' : document.getElementById('count_' + postId).innerHTML = String(this.temLike);
          //   // document.getElementById('like_' + postId + '_' + index).innerHTML = this.u_name
          //   // if (this.datas.map((id) => id._id).includes(postId)) {
          //   //   this.tempLikePostId = postId
          //   //   this.temCntLike++;
          //   // }
          //   document.getElementById('like_' + postId + '_' + index).innerText = this.u_name
          // $('like_' + postId + '_' + index).html(this.u_name)
          if (this.datas.map((id) => id._id).includes(postId)) {
              this.tempLikePostId = postId
              this.temCntLike++;
              this.like_name = []
              document.getElementById('like_' + postId).innerHTML = "";
              for(let i = 0; i < this.data.length; i++){

              this.like_name = this.data[i].name
              document.getElementById('like_' + postId).innerHTML += "<p>" + this.like_name + "</p>"
            }
            }
        }
      }
    })
  }

  totalImg = 0;
  modalProfopen = true;
  next_img = false;

  addComments(postId, userName, profilePic){
    this.objVal = Object.keys(this.commentsForm.value).map(key => ({type: key, value: this.commentsForm.value[key]}))
    this.authService.sendPostComment(postId, this.objVal[0].value).subscribe(res => {
      if(res['success']){
        $(`.comments_container_${postId}`).css('display','block');
        if(this.datas.map((id) => id._id).includes(postId)){
          //this.tempPostId = postId
          //this.checkTem = true
          //this.temCmnt.push(this.objVal[0].value)
       this.tempPostId = postId
          this.checkTem = true
          var data = this.objVal[0].value
          this.tryCmnt = { postId, userName, profilePic, data }
          this.temCmnt.push(this.tryCmnt)
        }
      }
    })
    this.commentsForm.reset()
  }

  showProfile(){
    this.router.navigate([`profile/${this.id}`])
  }

}
