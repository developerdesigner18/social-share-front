import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog} from  '@angular/material/dialog';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { AlbumsComponent } from '../albums/albums.component';



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
  id = '';
  shows: boolean = true
  public frd_datas: any = [];

  public datas;
 
  constructor(
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public  dialog:  MatDialog,
  ) {
    this.token = localStorage.getItem('token')
    this.id = this.activatedRoute.parent.params['value']['id'];
    if(this.router.url === '/friends/' + this.activatedRoute.parent.params['value']['id'] + '/photos'){
      this.authService.getAllPhotos(localStorage.getItem('friendId')).subscribe(res => {
        if (res.data.length === 0) {
          console.log(res.data.length);
          console.log("-=-=-=-=",res.data);
          
          this.shows = false
        } else {
          console.log(res.data.length);
        
        
        for (let i = 0; i < res.data.length; i++){ 
            if (res.data[i].image.split('.').pop() !== 'mp4' && 'mkv') { 
              this.urls.push(res.data[i])
            }
          }
        }
        })
      
    }else{
      localStorage.removeItem('friendId')
      this.authService.getAllPhotos(this.id).subscribe(res => {
        if (res.data.length === 0) {
          console.log(res.data.length);
          this.shows = false
        }
        
        for (let i = 0; i < res.data.length; i++){ 
          if (res.data[i].image.split('.').pop() !== 'mp4') { 
            this.urls.push(res.data[i])
          }
        }

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
