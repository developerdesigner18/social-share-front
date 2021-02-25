import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog} from  '@angular/material/dialog';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { AlbumsComponent } from '../albums/albums.component';
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  slideIndex = 1
  token = '';
  urls = [];
  album_urls = [];
  totalImg = 0;
  id = '';
  user = '';
  album_id: any;
  album_name: String;
  album_show: boolean;
  div_shows: boolean = false;
  shows: boolean = true
  public frd_datas: any = [];

  public datas;
 
  constructor(
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public  dialog:  MatDialog,
  ) {
    $(".right_sidebar").css("display", "block");
    this.token = localStorage.getItem('currentUser')
    this.id = this.activatedRoute.parent.params['value']['id'];
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = currentUser.data._id
    
    if (this.router.url === '/friends/' + this.activatedRoute.parent.params['value']['id'] + '/photos') {
      this.album_show = false
      this.authService.getAllPhotos(localStorage.getItem('friendId')).subscribe(res => {
        if (res.data.length === 0) {          
          this.shows = false
        } else {
        for (let i = 0; i < res.data.length; i++){ 
            if (res.data[i].image.split('.').pop() !== 'mp4' && 'mkv') { 
              this.urls.push(res.data[i])
            }
          }
        }
      })
      this.authService.getAllAlbumsPhotos(localStorage.getItem('friendId')).subscribe(res => {
        if (res['success']) {
          this.div_shows = false
          for (let i = 0; i < res.data.length; i++){        
            this.album_urls.push(res.data[i])
          }
        } else {
          this.div_shows = true
        }
    })      
    }else{
      localStorage.removeItem('friendId')
      this.album_show = true
      this.authService.getAllPhotos(this.id).subscribe(res => {
        for (let i = 0; i < res.data.length; i++){ 
          if (res.data[i].image.split('.').pop() !== 'mp4') { 
            this.urls.push(res.data[i])
          }
        }
      })
      this.authService.getAllAlbumsPhotos(this.id).subscribe(res => {
        if (res['success']) {
          this.div_shows = false
          for (let i = 0; i < res.data.length; i++){        
            this.album_urls.push(res.data[i])
          }
        } 
      })
    }
  }
  
  delAlbum(album_id, album_name) {
    if (confirm(`Are you sure you want to delete this ${album_name} album ?`)) {
      this.authService.DeletePost(album_id).subscribe(res => {
        location.reload();
      }) 
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

    const dialogRef = this.dialog.open(AlbumsComponent, {
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
  images = [];
  files_data: any = [];
  openDialog(event: any): void{

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

  ngOnInit(): void {
    // this.showSlides(this.slideIndex = 1);
  }

}
