import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { AuthService } from '../auth.service';
declare var jQuery: any;
declare var $: any;

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
  fileData: Array<File> = [];
  // fileData = [];
  fileCovToReturn: Array<File> = [];
  // fileCovToReturn: File = null;
  images = [];
  last_images = '';
  add_files = [];
  sec_img_width = '';
  arrayfile: any = [];
  // arrayfile: Array<File> = [];

  @ViewChild('postMsg') postMesssgeElement: any;
  // @ViewChild('postImage') postImageElement: any;
  @ViewChild('postImage') postImageElement: ElementRef;

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
    // this.fileData = data.file
    // console.log("=-=-=-=-=-=-=-=-this.arrayfile", this.arrayfile)
    // console.log("=-=-=-=-=-=-=-=-data.file", data.file)
    // console.log("=-=-=-=-=-=-=-=-data.images", data.images)
    this.fileData.push(data.file)
    this.images = data.images

    // console.log("-=-=-=-=-=-=-image count", this.images)
    // console.log("-=-=-=-=-=-=-image count 1", Object.keys(this.fileData[0]).length)

    // $(".image_set_size").css({"width": "50% !important", "float": "left"})


    // if(Object.keys(this.fileData[0]).length > 1)
    // {
      // this.fileData[0][0].width = "50%"
      // console.log("=-=-=-=-=- fileData", this.fileData[0][0].width)
      // this.sec_img_width = this.fileData[0][0].width
      // for(let i = 0; i < Object.keys(this.fileData[0]).length; i++ ){
      //
      // }
      // this.images[0].width = "50%"
      // var width = {}
      // console.log("=-=-=-=-=-=-=-=-=- grater then 1", Object(this.fileData[0].push({width: "50%"}))
      // for(let i=0; i < Object.keys(this.fileData[0]).length; i++){
        // for(let j=0; j < )
        // console.log("-=-=-=-=-=-=-this.fileData[i] loop", this.fileData[0][i].width = "50%")
        // this.fileData[i][i].width = "50%"
      // }
      // console.log("=-=-=-=-=-=-=-=-=- grater then 1", this.fileData[0][0].width = "50%")
      // jQuery(document).ready(function(){
      // console.log("-=-=-=-=-=-=-0= this omage", this.fileData)
        // $("#image_set_size").css({"width": "50% !important", "float": "left !important"})
      // })
    // }else{
      // jQuery(document).ready(function(){
        // $("#image_set_size").css({"width": "100%", "height": "290px"})
      // })
    // }

  }

  ngOnInit(): void {
  }

  public Close() {
      this.dialogRef.close();
  }

  // fileArray = []
  postSave(){
    this.token = localStorage.getItem('token')
    if(this.postImageElement){
      if(this.fileData[0] !== undefined)
      {
        this.arrayfile = this.fileData[0]
      }else{
        this.arrayfile = this.fileData
      }
      let arrayRemoveNull = this.arrayfile.filter(e => e)
      for(let i = 0; i < arrayRemoveNull.length; i++){
        this.fileCovToReturn.push(this.base64ToFile(
          this.images[i],
          arrayRemoveNull[i].name,
        ))

        // var mimeType = this.fileCovToReturn[i].type;
        // if (mimeType.match(/image\/*/) == null) {
        //   return;
        // }

        var reader = new FileReader();
        reader.readAsDataURL(this.fileCovToReturn[i]);
      }

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


  openNewDialog(event: any): void {
    if(this.images !== undefined){
      this.images
    }else{
      this.images = []
    }
    // Multipul Image upload
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      if(this.fileData[0] == undefined || this.fileData[0] == null){
        for (let i = 0; i < filesAmount; i++) {
          this.fileData.push(event.target.files[0])
          var reader = new FileReader();
          reader.onload = (event:any) => {
              this.images.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[i]);
        }
        this.arrayfile = this.fileData.filter(item => item)
      }else{
        this.arrayfile = this.fileData[0]
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();

          reader.onload = (event:any) => {
             this.images.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[i]);
          this.arrayfile.splice(Object.keys(this.fileData[0]).length, 0, event.target.files[0])
        }
      }
    }
  }
}
