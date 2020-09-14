import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
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

  @ViewChild('like_font') likeFontElement: any;
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
    this.authService.getAllFriendPost(this.token).subscribe(res => {
      // console.log("=-=-=-=-=-=-=-=-res", res)
      if(res.message == "You are not any friend")
      {
        console.log("-=-=-=-=-Welcome to social share")
      }else{
        // console.log("=-=-=-=-=-=-=-=-posts ", res.posts[0].like[0].userId)
        this.datas = res.posts
        for(let i = 0; i < this.datas.length; i++){
          this.description = this.datas[i].description;
          // console.log("-=--=-=-=-=-=-like datas", this.datas[i])
          // console.log("-=--=-=-=-=-=-like ", this.datas[i].like)
          this.likes = this.datas[i].like
          this.comments = this.datas[i].comment.length
          // console.log("=-=-=-=-=-=-=comment length", this.datas[i].comment.length)
          // this.url = this.datas[i].imageUrl;
          this.url.push(this.datas[i].imageUrl)
          // console.log("-=-=-=-=-=-=-=-=-=-", this.datas[i].userId)
          // console.log("-=-=-=-=-=-=-=-=-=-datas", this.datas)
          this.authService.getHomePostProfile(this.datas[i].userId).subscribe(res => {
            // console.log("-=-=-=-=-=-=-=-=-res", res.data.profileImgURl)
            // console.log("-=-=-=-=-=-=-=-=-userid", this.datas[i].userId)
            // console.log("-=-=-=-=-=-=-=-=-res", res.data._id)
            // this.id = res.data._id
            this.datas[i].post_profileImg = res.data.profileImgURl
            // this.post_profileImg = res.data.profileImgURl
             this.datas[i].post_user = res.data.name
            // this.name =  res.data.name
          })

          if(this.likes.length > 0){
            for(let j = 0; j < this.datas[i].like.length; j++){
            // console.log("-=-=-=-=-=-=-=datas j", this.datas[i].like.length)
              // console.log("-=-=-=-=-=--=-=-this.datas[i].likes", this.datas[i].like[j]['userId'])
              // this.postlikeId.push(this.datas[i].like[j]['userId'])
              this.postlikeuserId.push(this.datas[i].like[j]['userId'])
              // console.log("-=-=--=-=psost like", this.postlikeuserId)
              // console.log("-=-=--=-=psost like check id", this.postlikeuserId.includes(id))
              if(this.postlikeuserId.includes(id)){
                this.postlikeId.push(this.datas[i]._id)
              }
              // if(this.postlikeuserId){
              //   this.oneByonePosts = this.datas[i]._id
              // }
              // this.authService.getAllFriendPost(this.token).subscribe(res => {})
            }
            // console.log("-=-=-=-=-=-=-=final post like", this.postlikeId)
            // console.log("-=-=-=-=-=-=-=final post like", Array.from(new Set(this.postlikeId)))
            this.postlikeuserId = Array.from(new Set(this.postlikeuserId)) //For Uniquee fecth

            // console.log("-=-=-=-=-=--=-=-this.datas[i].likes", this.datas[i].like[i]['userId'])
              // this.postlikeId.push(this.datas[i]._id)
          }

        }
        this.ngOnInit()
        return this.datas
      }
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


  likeIt(postId){

    this.authService.sendLikePost(postId).subscribe(res => {
      if(res['success'])
      {
        if(this.likeFontElement.nativeElement.classList[2] == 'fa-thumbs-up' || this.likeFontElement.nativeElement.classList[1] == 'fa-thumbs-up')
        {
          this.likeFontElement.nativeElement.classList.remove('fa-thumbs-up')
          this.likeFontElement.nativeElement.classList.add('fa-thumbs-o-up')
        }else {
          this.likeFontElement.nativeElement.classList.add('fa-thumbs-up')
        }
      }
    })
  }

  temCmnt = [];
  checkTem =  false
  tempPostId = '';
  // functionCall = this.datas.map((cmnt) => cmnt.comment.length)
  count = 0

  addComments(postId, userName, profilePic){
    // console.log("==-=-=-=-=-=-=-=functionCall", this.functionCall[0])
    // console.log("=-=-=-=-=-=-=-=-",this.checkTem)
    this.objVal = Object.keys(this.commentsForm.value).map(key => ({type: key, value: this.commentsForm.value[key]}))
    this.authService.sendPostComment(postId, this.objVal[0].value).subscribe(res => {
      if(res['success']){
        $(`.comments_container_${postId}`).css('display','block');
        if(this.datas.map((id) => id._id).includes(postId)){
          // this.count += 1
          // this.datas.push(this.objVal[0].value)
          // let temp = [];
          // console.log("=-=-=-==-=-=-=-ciunt comments", this.datas.map((cmnt) => cmnt._id).includes(postId))
          // this.authService.getAllFriendPost(this.token).subscribe(res => {
          //   this.temp = res.posts
          //   for(let i = 0; i < this.datas.length; i++){
          //     console.log("=-=-=-=-=-=-comment length", this.datas[i].comment.length)
          //   }
          // })
          // console.log("=-=-=-=-temp", this.temp)
          // console.log("=-=-=-=-comment posts length", this.temp.find((cmnt) => cmnt._id === postId))
          // const selectedPost = this.temp.find((cmnt) => cmnt._id === postId)
          // console.log("=-=-=-=-select post", selectedPost)

          // console.log("=-=-=-=-=-=-=-", this.comments)
          // this.router.navigate([`home/${this.activatedRoute.snapshot.paramMap.get('id')}`])
          // console.log("=-=--=-=--=-=--=-=-count", this.count)
          // if(this.count > 1){
          //     this.checkTem = true
          // }
          this.tempPostId = postId
          this.checkTem = true
          this.temCmnt.push(this.objVal[0].value)
        }
      }
    })

    console.log("=-=-=-=-=-=-comment length end loop", this.datas.map((cmnt) => cmnt.comment.length))
    this.commentsForm.reset()
  }
}
