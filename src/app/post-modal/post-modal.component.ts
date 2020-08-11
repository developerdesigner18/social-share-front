import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent implements OnInit {
  name = '';
  parentRouteId: any = '';
  smallProfile = '';
  userId = '';
  token = '';
  fileData: File = null;
  fileCovToReturn: File = null;

  @ViewChild('postMsg') postMesssgeElement: any;
  @ViewChild('postImage') postImageElement: any;

  constructor(
    private  dialogRef:  MatDialogRef<PostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: any,
    public authService: AuthService
  ) {
    this.authService.getProfileforAbout(data.id).subscribe(res => {
      // this.userId = data.id
      this.name =  res.data.name
      this.smallProfile = res.data.profileImgURl
    })

    this.fileData = data.file
    // this.fileData = data.image
  }

  ngOnInit(): void {
  }

  public Close() {
      this.dialogRef.close();
  }

  postSave(){
    this.token = localStorage.getItem('token')
    if(this.postImageElement){
      this.fileCovToReturn = this.base64ToFile(
        this.postImageElement.nativeElement.src,
        this.fileData.name,
      )

      var mimeType = this.fileCovToReturn.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(this.fileCovToReturn);
      reader.onload = (_event) => {
        this.authService.newPost(this.token, this.postMesssgeElement.nativeElement.value, this.fileCovToReturn).subscribe((res) => {
          if(window.location.href.split('/')[3] == "home"){
            window.location.replace('home/' + window.location.href.split('/')[4]);
          }else{
            window.location.replace('profile/' + window.location.href.split('/')[4]);
          }
        })
      }
    }else{
      if(this.postMesssgeElement.nativeElement.value == ''){
        console.log("You are not set description")
      }else if(this.postMesssgeElement.nativeElement.value.valid !== ''){
        this.authService.newtextPost(this.token, this.postMesssgeElement.nativeElement.value).subscribe((res) => {
          if(window.location.href.split('/')[3] == "home"){
            window.location.replace('home/' + window.location.href.split('/')[4]);
          }else{
            window.location.replace('profile/' + window.location.href.split('/')[4]);
          }
        })
      }
    }
  }

  base64ToFile(data, filename) {
     const arr = data.split(',');
     const mime = arr[0].match(/:(.*?);/)[1];
     const bstr = atob(arr[1]);
     let n = bstr.length;
     let u8arr = new Uint8Array(n);

     while(n--){
         u8arr[n] = bstr.charCodeAt(n);
     }

     return new File([u8arr], filename, { type: mime });
  }
}
