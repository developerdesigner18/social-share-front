import { Component, OnInit, Inject, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from 'rxjs/operators';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
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
  temp_images:any = []
  status: any;

  @ViewChild('postMsg') postMesssgeElement: any;
  @ViewChild('postName') postNameElement: any;
  @ViewChildren('postImage') postImageElement: QueryList<ElementRef>;
  textOnlylength: number;

  constructor(
    private  dialogRef:  MatDialogRef<AlbumsComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: any = [],
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { 
      this.authService.getProfileforAbout(data.id).subscribe(res => {
        this.name =  res.data.name
        this.smallProfile = res.data.profileImgURl
      })
      this.fileData.push(data.file)
      this.images = data.images
  
    if (data.images && data.files != '') {
        if(Object.keys(this.fileData[0]).length === 2)
        {
          this.shows = true
          this.twoimg = true
          this.threeimg = false
          this.fourimg = false
          this.fiveimg = false
        } else if (Object.keys(this.fileData[0]).length == 3) {
          this.shows = true
          this.threeimg = true
          this.twoimg = false
          this.fourimg = false
          this.fiveimg = false
        } else if (Object.keys(this.fileData[0]).length == 4) {
          this.shows = true
          this.threeimg = false
          this.twoimg = false
          this.fourimg = true
          this.fiveimg = false
        } else if (Object.keys(this.fileData[0]).length > 4) {
          this.shows = true
          this.threeimg = false
          this.twoimg = false
          this.fourimg = false
          this.fiveimg = true
        }
      }
    }
  
    ngOnInit(): void {
    }
  
    public Close() {
      this.dialogRef.close();
    }
  
    cancel() {
      while(this.temp_images.length > 0) {
        this.temp_images.pop();
    }
      while(this.data.file.length > 0) {
        this.data.file.pop();
      }
      while(this.images.length > 0) {
        this.images.pop();
      }
      while(this.arrayfile.length > 0) {
        this.arrayfile.pop();
      }
      this.shows = false
      $(".set_view_more").css('display', 'none');
      this.toastr.info("All images are removed. Please select new ones")
    }
  
    postSave(){
      this.token = localStorage.getItem('token')
      if (this.postImageElement.length !== 0) {
        if(this.fileData[0] !== undefined)
        {
          this.arrayfile = this.fileData[0]
        } else {
          this.arrayfile = this.fileData
        }
        let arrayRemoveNull = this.arrayfile.filter(e => e)
        if (arrayRemoveNull[0 ] === '') {
          this.toastr.error("Please select one or more images")
        }
        if (arrayRemoveNull[0].name.split('.').pop() !== 'png') {
        
          for (let i = 0; i < arrayRemoveNull.length; i++){
            this.fileCovToReturn.push(this.base64ToFile(
              this.images[i],
              arrayRemoveNull[i].name,
            ))
            var reader = new FileReader();
            reader.readAsDataURL(this.fileCovToReturn[i]);
          }
          if (this.postNameElement.nativeElement.value === '') {
            this.fileCovToReturn = []
            this.toastr.info('Please Fill the Album Name');
          } else {
            this.spinner.show()
            reader.onload = (_event) => {
              this.authService.newAlbumPost(this.token, this.postNameElement.nativeElement.value, this.postMesssgeElement.nativeElement.value, this.fileCovToReturn, this.status ? this.status : 0).pipe(finalize(() => this.spinner.hide())).subscribe((res) => {
                var data = 'profile/' + window.location.href.split('/')[4]
                if (res.success == true) {
                  window.location.replace('profile/' + window.location.href.split('/')[4] + '/photos');
                }
              
              })
            }
          }
        } else {
        this.toastr.info("png format is not supported use other format like jpg or jpeg")
        }
      } else {
        this.toastr.info("Please select one or more images to add in album.")
        if(this.postMesssgeElement.nativeElement.value == ''){
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
      // Multiple Image upload
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        if(this.fileData[0] == undefined || this.fileData[0] == null){
          for (let i = 0; i < filesAmount; i++) {
            this.fileData.push(event.target.files[0])
            let reader = new FileReader();
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
            reader.onload = (event: any) => {
              if (event.target.result.split(';')[0] == 'data:video/mp4') {
                this.temp_images.push({data: 'video', src: event.target.result})
              } else {
                this.temp_images.push({data: 'img', src: event.target.result})
              }
              this.images.push(event.target.result);
              this.images.sort((img1, img2) => img1.length > img2.length ? 1 : -1)
            }
            reader.readAsDataURL(event.target.files[i]);
            this.arrayfile.splice(Object.keys(this.fileData[0]).length, 0, event.target.files[i])
            this.arrayfile.sort((fileA, fileB) => fileA.size > fileB.size ? 1 : -1)
          }
        }
      }
    }
}
