import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog} from  '@angular/material/dialog';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { AuthService } from '../auth.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
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

  postlikeId = [];
  commentsForm: FormGroup;
  showbasicProfile = [];

  @ViewChild('textmsgPost') postMesssgeElement: any;

  public datas;
  constructor(
    public  dialog:  MatDialog,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public router: Router,
    public formBuilder: FormBuilder
  ) {
    this.id = this.activatedRoute.parent.params['value']['id'];
    this.authService.getUserProfile(this.id).subscribe(res => {
      this.profileImg =  res.data.profileImgURl
      this.u_name =  res.data.name
      this.u_designation =  res.data.designation
      this.u_email =  res.data.emailId
    })

    this.authService.getProfilePost(this.id).subscribe(res => {
      if(res.length > 0){
        this.datas = res
        for(let i = 0; i < this.datas.length; i++){
          this.description = this.datas[i].description;
          this.urls.push(this.datas[i].imageUrl)
          this.likes = this.datas[i].like
          for(let j = 0; j < this.datas[i].comment.length; j++){
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
    jQuery(document).ready(function(){
      jQuery('.owl-carousel').owlCarousel({
        nav:true,
        items:1,
        autoWidth: true,
        video:true
      })
    });
    $(window).on('load', function(){
      $('.owl-carousel').owlCarousel({
    		nav:true,
    		items:1,
        autoWidth: true,
        video:true
    	})
    });
    this.changeslider();
  }

  open_comments(postId){
    $(`.comments_container_${postId}`).toggle();
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
    this.dialog.open(PostModalComponent, {
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: { id: this.id, images: this.images, file: this.files_data  }
    });
  }

  changeslider(){
    $(document).ready(function(){
      $('.owl-carousel').owlCarousel({
        nav:true,
        items:1,
        autoWidth: true,
        video:true,
        lazyLoad: true
      })
    })
    $(window).on('load', function(){
      $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
      		nav:true,
      		items:1,
          autoWidth: true,
          video:true,
          lazyLoad: true
      	})
      });
    })
  }

  temCmnt = [];
  checkTem =  false
  tempPostId = '';

  temLike = 0;
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

  addComments(postId, userName, profilePic){
    this.objVal = Object.keys(this.commentsForm.value).map(key => ({type: key, value: this.commentsForm.value[key]}))
    this.authService.sendPostComment(postId, this.objVal[0].value).subscribe(res => {
      if(res['success']){
        $(`.comments_container_${postId}`).css('display','block');
        if(this.datas.map((id) => id._id).includes(postId)){
          this.tempPostId = postId
          this.checkTem = true
          this.temCmnt.push(this.objVal[0].value)
        }
      }
    })
    this.commentsForm.reset()
  }
}
