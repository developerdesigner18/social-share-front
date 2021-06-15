import { Component, OnInit, Inject, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  fileCovToReturn: Array<File> = [];
  images = [];
  last_images = '';
  add_files = [];
  sec_img_width = '';
  arrayfile: any = [];
  total = false;
  sum = 0;
  twowidth = '100%';
  height = '';
  firstwidth = '';
  twoimg = false;
  threeimg = false;
  fourimg = false;
  fiveimg = false;
  closeDialog = false;
  shows: boolean = false;

  @ViewChild('postMsg') postMesssgeElement: any;
  @ViewChildren('postImage') postImageElement: QueryList<ElementRef>;
  textOnlylength: number;
  frienId: any;

  constructor(
    private  dialogRef:  MatDialogRef<PostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: any,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService
  ) {
    this.authService.getProfileforAbout(data.id).subscribe(res => {
      this.name =  res.data.name
      this.smallProfile = res.data.profileImgURl
    })

    this.fileData.push(data.file)
    this.images = data.images

    if (data.images && data.files != '') {
      // this.shows = true
      if(Object.keys(this.fileData[0]).length === 2)
      {
        this.twoimg = true
        this.threeimg = false
        this.fourimg = false
        this.fiveimg = false
        this.shows = true
      }else if(Object.keys(this.fileData[0]).length == 3){
        this.threeimg = true
        this.twoimg = false
        this.fourimg = false
        this.fiveimg = false
        this.shows = true
      }else if(Object.keys(this.fileData[0]).length == 4){
        this.threeimg = false
        this.twoimg = false
        this.fourimg = true
        this.fiveimg = false
        this.shows = true
      }else if(Object.keys(this.fileData[0]).length > 4){
        this.threeimg = false
        this.twoimg = false
        this.fourimg = false
        this.fiveimg = true
        this.shows = true
      }
    }
  }

  ngOnInit(): void {
  }

  public Close() {
    this.dialogRef.close();
  }
  cancel() {
    while(this.images.length > 0) {
      this.images.pop();
  }
    while(this.data.file.length > 0) {
      this.data.file.pop();
    }
    $(".set_view_more").css('display', 'none');
    this.shows = false
    this.toastr.info("All images are removed. Please select new ones")
  }

  postSave(){
    this.token = localStorage.getItem('token')
    this.frienId = localStorage.getItem('friendId')
    if (this.postImageElement.length !== 0) {        
      if(this.fileData[0] !== undefined)
      {
        this.arrayfile = this.fileData[0]
      }else{
        this.arrayfile = this.fileData
        }
      
      let arrayRemoveNull = this.arrayfile.filter(e => e)
      if (arrayRemoveNull[0].name.split('.').pop() !== 'png') {
          for (let i = 0; i < arrayRemoveNull.length; i++){
            this.fileCovToReturn.push(this.base64ToFile(
              this.images[i],
              arrayRemoveNull[i].name,
            ))
            var reader = new FileReader();
            reader.readAsDataURL(this.fileCovToReturn[i]);
          }
        } else {
          this.toastr.info("png format is not supported used other format like jpg or jpeg")
        }
        reader.onload = (_event) => {
          this.authService.newPost(this.token, this.postMesssgeElement.nativeElement.value, this.fileCovToReturn).subscribe((res) => {
            if(window.location.href.split('/')[3] == "home"){
              window.location.replace('home/' + window.location.href.split('/')[4]);
            } else {
              window.location.replace('profile/' + window.location.href.split('/')[4]);
            }
          })
        }
    } else {
      this.toastr.info("Please add images to post")
      if(this.postMesssgeElement.nativeElement.value == ''){
        this.toastr.info("You are not set description!");
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
    for (var i = 0; i < event.target.files.length; i++) {
      if (i === event.target.files.length - 1)
      {
        this.textOnlylength = i
      }
    }
    // this.shows = true

    if(this.images.length === 1 || this.textOnlylength === 1)
    {
      this.shows = true
      this.twoimg = true
      this.threeimg = false
      this.fourimg = false
      this.fiveimg = false
    } else if (this.images.length === 2 || this.textOnlylength === 2) {
      this.shows = true
      this.threeimg = true
      this.twoimg = false
      this.fourimg = false
      this.fiveimg = false
    } else if (this.images.length === 3 || this.textOnlylength === 3) {
      this.shows = true
      this.fourimg = true
      this.threeimg = false
      this.twoimg = false
      this.fiveimg = false
    } else if (this.images.length >= 4 || this.textOnlylength >= 4) {
      this.shows = true
      this.fourimg = false
      this.threeimg = false
      this.twoimg = false
      this.fiveimg = true
    }
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
          this.arrayfile.splice(Object.keys(this.fileData[0]).length, 0, event.target.files[i])
        }
      }
    }
  }

  trackByFn(index, item) { 
    return item.id; 
  }
}
