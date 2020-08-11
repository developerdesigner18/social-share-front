import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  url = '';
  public datas;
  token = '';

  constructor(
    public authService: AuthService,
    public  dialog:  MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getUserHome(id).subscribe(res => {
      this.id = res.data._id
      this.name =  res.data.name
      this.profileImg = res.data.profileImgURl
    })

    this.token = localStorage.getItem('token')
    this.authService.getAllFriendPost(this.token).subscribe(res => {
      if(res.message == "You are not any friend")
      {
        console.log("-=-=-=-=-Welcome to social share")
      }else{
        this.datas = res.posts
        for(let i = 0; i < this.datas.length; i++){
          this.description = this.datas[i].description;
          this.url = this.datas[i].imageUrl;
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
        }
        // console.log('-=-=-=-=-=-=-= final datas', this.datas)
        this.ngOnInit()
        return this.datas
      }
    })

    this.authService.getFriendData(id).subscribe(res => {
      console.log("==-=-----=res count", res.list.length)
      this.frd_request_count = res.list.length
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
    localStorage.removeItem('token');
    localStorage.removeItem('friendId');
    window.location.replace('');
  }

  openTextDialog(){
    console.log("-=-=-=-=-=-text box open", this.id)
    this.dialog.open(PostModalComponent, {
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: { id: this.id }
    });
  }

  fileData: File = null;
  previewUrl: any = null;
  openDialog(event: any): void{
    console.log("-=-=-=-=-=-photos open")
    this.fileData = <File>event.target.files[0]

    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);

    reader.onload = (_event) => {
      this.previewUrl = reader.result; //based64 image
      this.dialog.open(PostModalComponent, {
        width: '550px',
        panelClass: 'custom-dialog-container',
        data: { id: this.id, postImg: this.previewUrl, file: this.fileData }
      });
    }
  }
}
