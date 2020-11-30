import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute} from '@angular/router';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  u_email = '';
  u_number = '';
  u_website = 'http://159.203.67.155/'
  mobile: any;
  // address: boolean;
  website: any;
  religious: any;
  number: any;
  address: any
  display1: any;
  display2: any;
  shows: any;
  shows1: any;
  location: any;
  link: any;
  shows2: any;
  display3: any;
  caste: any;
  shows3: any;
  display4: any;

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];
    if(localStorage.getItem('friendId')){
      this.authService.getProfileForFriend(localStorage.getItem('friendId')).subscribe(res => {
        this.u_email =  res.data.emailId
      })
    }else{
      this.authService.getProfileforAbout(id).subscribe(res => {
        this.u_email =  res.data.emailId
      })
      this.authService.getAllData(id).subscribe(res => {


        if(res.userData[0] == null ){
          this.shows = true
          this.shows1 = true
          this.shows2 = true
          this.shows3 = true
        // this.display1 = true
          // this.number = res.userData[0].mobileNumber;
        } else if(res.userData[0].mobileNumber == null){
          this.shows = true
          this.shows1 = true
          this.shows2 = true
          this.shows3 = true
        } else if(res.userData[0].address == null){
          this.shows1 = true
          this.shows2 = true
          this.shows3 = true
          this.number = res.userData[0].mobileNumber;
          this.display1 = true
        } else if(res.userData[0].website == null) {
          this.shows2 = true
          this.shows3 = true
          this.number = res.userData[0].mobileNumber;
          this.display1 = true
          this.location = res.userData[0].address;
          this.display2 = true
        } else if(res.userData[0].basicInfo == null){
          this.shows3 = true
          this.number = res.userData[0].mobileNumber;
          this.display1 = true
          this.location = res.userData[0].address;
          this.display2 = true
          this.link = res.userData[0].website;
          this.display3 = true
        }else{
          this.number = res.userData[0].mobileNumber;
        this.shows = false
        this.display1 = true
        this.location = res.userData[0].address;
        // console.log("-=-=-=-=-=-=-==-address", res.userData[0])
        this.shows1 = false
        this.display2 = true
        // Website
        this.link = res.userData[0].website;
        this.shows2 = false
        this.display3 = true
        //Religious
        this.caste = res.userData[0].basicInfo;
        this.shows3 = false
        this.display4 = true
        }
      })
    }


   }
   addNumber(number: number){
    this.authService.addNewNumber(number).subscribe(res => {
      if(res['success']){
        this.mobile = false
        $(`.mobile`).css('display','none');
        this.display1 = true
      }
      else{
        console.log("error");
        this.display1 = false;
      }
    })

   }

   updateNumber(number: number){
    this.authService.addNewNumber(number).subscribe(res => {
      if(res['success']){
        this.mobile = true
        this.display1 = false
      }
      else{
        console.log("error");
        this.display1 = false;
      }
    })
   }

   addAddress(location: any){
    this.authService.addNewAddress(location).subscribe(res => {
      if (res['success']) {
        this.address = false
        $(`.address`).css('display','none');
        this.display2 = true
      }
    })
   }

   updateAddress(location: any){
    this.authService.addNewAddress(location).subscribe(res => {
      if(res['success']){
        this.address = true
        this.display2 = false
      }
      else{
        console.log("error");
        this.display2 = false;
      }
    })
   }

  //  Website
  addWebsite(link: any){
    this.authService.addNewWebsite(link).subscribe(res => {
      if (res['success']) {
        this.website = false
        $(`.website`).css('display','none');
        this.display3 = true
      }
    })
   }

   updateWebsite(link: any){
    this.authService.addNewWebsite(link).subscribe(res => {
      if(res['success']){
        this.website = true
        this.display3 = false
      }
      else{
        console.log("error");
        this.display3 = false;
      }
    })
   }

  //  Religious
  addBasicInfo(caste: any){
    this.authService.addBasicInfo(caste).subscribe(res => {
      if (res['success']) {
        this.religious = false
        $(`.religious`).css('display','none');
        this.display4 = true
      }
    })
   }

   updateBasicInfo(caste: any){
    this.authService.addBasicInfo(caste).subscribe(res => {
      if(res['success']){
        this.religious = true
        this.display4 = false
      }
      else{
        console.log("error");
        this.display4 = false;
      }
    })
   }
  ngOnInit(): void {
  }

  newMobile(){
    this.mobile = true
  }

  newAddress(){
    this.address = true
  }

  newWebsites(){
    this.website = true
  }

  newReligious(){
    this.religious = true
  }

  Cancel(){
    this.mobile = false
    this.address = false
    this.website = false
    this.religious = false
    this.display1 = true
    this.display2 = true
    this.display3 = true
    this.display4 = true
  }

}
