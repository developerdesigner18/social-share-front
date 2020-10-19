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
  // postCmtId = '';

  public datas;
  public temp;
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

        }
        this.ngOnInit()
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
    this.dialog.open(PostModalComponent, {
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: { id: this.id, images: this.images, file: this.files_data  }
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
}
