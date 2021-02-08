import { Component, OnInit, Inject, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  @ViewChild('postMsg') postMesssgeElement: any;
  @ViewChild('postName') postNameElement: any;
  @ViewChildren('postImage') postImageElement: QueryList<ElementRef>;
  textOnlylength: number;

  constructor(
    private  dialogRef:  MatDialogRef<AlbumsComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: any,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) { 

      // let id = this.activatedRoute.snapshot.paramMap.get('id');
      this.authService.getProfileforAbout(data.id).subscribe(res => {
        // this.userId = data.id
        this.name =  res.data.name
        this.smallProfile = res.data.profileImgURl
      })
      this.fileData.push(data.file)
      this.images = data.images
  
      if(data.images && data.files != ''){
        if(Object.keys(this.fileData[0]).length === 2)
        {
          this.twoimg = true
          this.threeimg = false
          this.fourimg = false
          this.fiveimg = false
        }else if(Object.keys(this.fileData[0]).length == 3){
          this.threeimg = true
          this.twoimg = false
          this.fourimg = false
          this.fiveimg = false
        }else if(Object.keys(this.fileData[0]).length == 4){
          this.threeimg = false
          this.twoimg = false
          this.fourimg = true
          this.fiveimg = false
        }else if(Object.keys(this.fileData[0]).length > 4){
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
  
          var reader = new FileReader();
          reader.readAsDataURL(this.fileCovToReturn[i]);
        }
        
        if (this.postNameElement.nativeElement.value === '') {
          this.toastr.error('Please Fill the Album Name');
        } else {
          reader.onload = (_event) => {
            this.authService.newAlbumPost(this.token, this.postNameElement.nativeElement.value ,this.postMesssgeElement.nativeElement.value, this.fileCovToReturn).subscribe((res) => {              
              if(window.location.href.split('/')[3] == "home"){
                window.location.replace('home/' + window.location.href.split('/')[4]);
              }else{
                window.location.replace('profile/' + window.location.href.split('/')[4]);
              }
            })
          }
        }
  
      }else{
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
        this.twoimg = true
        this.threeimg = false
        this.fourimg = false
        this.fiveimg = false
      }else if(this.images.length === 2 || this.textOnlylength === 2){
        this.threeimg = true
        this.twoimg = false
        this.fourimg = false
        this.fiveimg = false
      }else if(this.images.length === 3 || this.textOnlylength === 3){
        this.fourimg = true
        this.threeimg = false
        this.twoimg = false
        this.fiveimg = false
      }else if(this.images.length >= 4 || this.textOnlylength >= 4){
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
            this.arrayfile.splice(Object.keys(this.fileData[0]).length, 0, event.target.files[0])
          }
        }
      }
    }
}