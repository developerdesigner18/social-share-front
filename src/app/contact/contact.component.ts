import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
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
  mobile: any;
  website: any;
  religious: any;
  number: any;
  address: any
  display1: any;
  display2: any;
  shows: any;
  shows1: any;
  email_address: any;
  website_link: any;
  shows2: any;
  display3: any;
  caste: any;
  shows3: any;
  display4: any;
  u_mobile: any
  u_address: any
  u_website: any
  u_religious: any
  shows4: any
  gender_value: any
  genders: any
  display5: any
  u_gender: any


  //Required
  Required = false
  Required1 = false
  Required2 = false
  Required3 = false
  Required4 = false
  fill_mobile_no = false;
  show_mobile: boolean;
  mobile_number: string;
  u_fill_mobile_no: boolean;

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];
    if (localStorage.getItem('friendId')) {
      this.authService.getProfileForFriend(localStorage.getItem('friendId')).subscribe(res => {
        this.u_email = res.data.emailId
      })
    } else {
      this.authService.getProfileforAbout(id).subscribe(res => {
        this.u_email = res.data.emailId
      })
      this.authService.getAllData(id).subscribe(res => {
        // if(res.userData[0] !== undefined){
        if(res.userData[0].mobileNumber !== undefined){
          this.mobile_number = res.userData[0].mobileNumber
          this.show_mobile = true
        }else{
          this.mobile = false
        }
          // this.mobile = (res.userData[0].mobileNumber !== undefined) ? res.userData[0].mobileNumber : false;
          this.email_address = (res.userData[0].address !== undefined) ? res.userData[0].address : false;
          this.website_link = (res.userData[0].website !== undefined) ? res.userData[0].website : false;
          this.religious = (res.userData[0].basicInfo !== undefined) ? res.userData[0].basicInfo : false;
          this.gender_value = (res.userData[0].gender !== undefined) ? res.userData[0].gender : false;
        // }
        // if(this.number == null){
        //     this.shows = true
        //     this.display1 = false
        //     } else {
        //       this.number = res.userData[0].mobileNumber;
        //       this.shows = false
        //       this.display1 = true
        //     }
        //     if(this.location == null){
        //       this.shows1 = true
        //       this.display2 = false
        //       } else {
        //         this.location = res.userData[0].address;
        //         this.shows1 = false
        //         this.display2 = true
        //       }
        //       if(this.link == null){
        //         this.shows2 = true
        //         this.display3 = false
        //         } else {
        //           this.link = res.userData[0].website;
        //           this.shows2 = false
        //           this.display3 = true
        //         }
        //   if(this.gender_value === null && this.gender_value == null){
        //   this.shows4 = true
        //   this.display5 = false
        //   } else {
        //     this.gender_value = res.userData[0].gender;
        //     this.shows4 = false
        //     this.display5 = true
        //   }

      })
    }


  }
  addNumber(number: any) {
    this.authService.addNewNumber(number).subscribe(res => {
      if (res['success']) {
        this.mobile_number = number
        this.show_mobile = true
        this.mobile = true;
        // this.mobile = false
        this.fill_mobile_no = false

        // this.show_mobile = true
        // this.mobile = false
        // $(`.mobile`).css('display', 'none');
        // this.display1 = true
        // this.mobile = true;
        // this.fill_mobile_no = false;
      }
    })
  }


  editNumber(number: any) {
    this.authService.addNewNumber(number).subscribe(res => {
      if (res['success']) {
        this.show_mobile = true
        this.u_fill_mobile_no = false
      }
    })
  }


  updateNumber(number: any) {
    this.mobile_number = number;
    this.show_mobile = false;
    this.u_fill_mobile_no = true;
    this.authService.addNewNumber(number).subscribe(res => {
      if (res['success']) {
        this.u_mobile = true
        this.display1 = false
      } else {
        console.log("error");
        this.display1 = true;
      }
    })
  }
  delNumber(number: any) {
    this.mobile = false;
    this.fill_mobile_no = false;
    this.show_mobile = false;
    this.authService.deleteNumber(number).subscribe(res => {
      if (res['success']) {
        this.shows = true
        $(`.mobile`).css('display', 'block');
        this.u_mobile = false
        this.display1 = false
      } else {
        console.log("error");
        this.display1 = true;
      }
    })
  }

  addAddress(location: any) {
    this.authService.addNewAddress(location).subscribe(res => {
      if (res['success']) {
        this.address = false
        $(`.address`).css('display', 'none');
        this.display2 = true
      }
    })
  }

  updateAddress(location: any) {
    this.authService.addNewAddress(location).subscribe(res => {
      if (res['success']) {
        this.u_address = true
        this.display2 = false
      }
      else {
        console.log("error");
        this.display2 = false;
      }
    })
  }
  delAddress(location: any) {
    this.authService.deleteAddress(location).subscribe(res => {
      if (res['success']) {
        this.shows1 = true
        $(`.address`).css('display', 'block');
        this.u_address = false
        this.display2 = false
      }
      else {
        console.log("error");
        this.display2 = true;
      }
    })
  }

  //  Website
  addWebsite(link: any) {
    this.authService.addNewWebsite(link).subscribe(res => {
      if (res['success']) {
        this.website = false
        $(`.website`).css('display', 'none');
        this.display3 = true
      }
    })
  }

  updateWebsite(link: any) {
    this.authService.addNewWebsite(link).subscribe(res => {
      if (res['success']) {
        this.u_website = true
        this.display3 = false
      }
      else {
        console.log("error");
        this.display3 = false;
      }
    })
  }
  delWebsite(link: any) {
    this.authService.deleteWebsite(link).subscribe(res => {
      if (res['success']) {
        this.shows2 = true
        $(`.website`).css('display', 'block');
        this.u_website = false
        this.display3 = false
      }
      else {
        console.log("error");
        this.display3 = true;
      }
    })
  }

  //  Religious
  addBasicInfo(caste: any) {
    this.authService.addBasicInfo(caste).subscribe(res => {
      if (res['success']) {
        this.religious = false
        $(`.religious`).css('display', 'none');
        this.display4 = true
      }
    })
  }

  updateBasicInfo(caste: any) {
    this.authService.addBasicInfo(caste).subscribe(res => {
      if (res['success']) {
        this.u_religious = true
        this.display4 = false
      }
      else {
        console.log("error");
        this.display4 = false;
      }
    })
  }

  delBasicInfo(caste: any) {
    this.authService.deleteBasicInfo(caste).subscribe(res => {
      if (res['success']) {
        this.shows3 = true
        $(`.religious`).css('display', 'block');
        this.u_religious = false
        this.display4 = false
      }
      else {
        console.log("error");
        this.display4 = true;
      }
    })
  }

  //Gender
  addGender(value: any) {
    this.authService.addGender(value).subscribe(res => {

      // console.log("=-=-=-=-=-=addGender", res)
      if (this.gender_value === null) {
        this.display5 = false
        this.Required4 = true
      } else if (res['success']) {
        this.genders = false
        this.shows4 = false

        $(`.gender`).css('display', 'none');
        this.display5 = true
        this.u_gender = false
      }
    })
  }

  updateGender(value: any) {
    this.authService.addGender(value).subscribe(res => {
      if (res['success']) {
        this.u_gender = true
        this.display5 = false
      }
      else {
        console.log("error");
        this.display5 = false;
      }
    })
  }

  delGender(value: any) {
    this.authService.deleteGender(value).subscribe(res => {
      if (res['success']) {
        this.shows4 = true
        $(`.gender`).css('display', 'block');
        this.u_gender = false
        this.display5 = false
      }
      else {
        console.log("error");
        this.display5 = true;
      }
    })
  }

  ngOnInit(): void {
  }

  newMobile() {
    this.fill_mobile_no = true
    this.mobile = false
  }

  newAddress() {
    this.address = true
  }

  newWebsites() {
    this.website = true
  }

  newReligious() {
    this.religious = true
  }

  newGender() {
    this.genders = true
  }

  Cancel() {
    this.mobile = false;
    this.fill_mobile_no = false;
  }

  A_Cancel() {
    this.address = false
    this.Required1 = false
  }

  W_Cancel() {
    this.website = false
    this.Required2 = false
  }

  R_Cancel() {
    this.religious = false
    this.Required3 = false
  }

  G_Cancel() {
    this.genders = false
    this.Required4 = false
  }

  u_cancel() {
    // this.display1 = true
    // this.u_mobile = false
    this.show_mobile = true;
    this.u_fill_mobile_no = false;
  }

  u_cancel1() {
    this.display2 = true
    this.u_address = false
  }

  u_cancel2() {
    this.display3 = true
    this.u_website = false
  }

  u_cancel3() {
    this.display4 = true
    this.u_religious = false
  }

  u_cancel4() {
    this.display5 = true
    this.u_gender = false
  }

}
