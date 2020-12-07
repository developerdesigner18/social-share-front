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
  email: any;
  website: any;
  number: any;
  address: any
  display1: any;
  display2: any;
  shows: any;
  shows1: any;
  shows2: any;
  display3: any;
  shows3: any;
  display4: any;
  u_mobile: any
  u_address: any
  u_website: any
  u_religious: any
  shows4: any
  genders: any
  display5: any
  u_gender: any
  birth: boolean
  fill_birth = false

  //Required
  Required = false
  Required1 = false
  Required2 = false
  Required3 = false
  Required4 = false
  fill_mobile_no = false;
  show_mobile: boolean
  mobile_number: string
  u_fill_mobile_no: boolean
  show_email: boolean
  email_address: string
  fill_email = false;
  u_fill_email: boolean
  location: any
  link: any
  show_link: boolean
  website_link: any
  fill_link = false;
  u_fill_link: boolean
  religious: any;
  caste: any;
  show_caste: boolean
  fil_caste = false
  u_fill_caste: boolean
  religious_value: any;
  gender_value: any
  value: any
  show_gender: boolean
  fill_gender = false
  u_fill_gender: boolean
  current_user_profile = true;
  icons: boolean;
  birth_value: any
  not_mention_number = false;
  not_mention_address = false;
  not_mention_website = false;
  not_mention_religious = false;
  not_mention_gender = false;
  not_mention_birth = false;
  show_birth: boolean;
  u_fill_birth: boolean;
  

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
      const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
      if (current_login_User.data._id !== id) {
        this.icons = false
        this.authService.getProfileforAbout(id).subscribe(res => {
          if (res.data == null) {
        
          }
          else if (res.data.mobileNumber !== undefined) {
            this.mobile_number = res.data.mobileNumber
            this.show_mobile = true
            this.mobile = true
          } else {
            this.not_mention_number = true
          }

          if (res.data == null) {
          }
          else if (res.data.address !== undefined) {
            this.email_address = res.data.address
            this.show_email = true
            this.email = true
          } else {
            this.not_mention_address = true
          }

          if (res.data == null) {
          
          }
          else if (res.data.website !== undefined) {
            this.website_link = res.data.website
            this.show_link = true
            this.link = true
          } else {
            this.not_mention_website = true
          }

          if (res.data == null) {
            
          }
          else if (res.data.basicInfo !== undefined) {
            this.religious_value = res.data.basicInfo
            this.show_caste = true
            this.religious = true
          } else {
            this.not_mention_religious = true
          }

          if (res.data == null) {
            
          }
          else if (res.data.gender !== undefined) {
            this.gender_value = res.data.gender
            this.show_gender = true
            this.genders = true
          } else {
            this.not_mention_gender = true
          }

          if (res.data == null) {
            
          }
          else if (res.data.birthDate !== undefined) {
            this.birth_value = res.data.birthDate
            this.show_birth = true
            this.birth = true
          } else {
            this.not_mention_birth = true
          }
        })
          this.authService.getAllData(id).subscribe(res => {

            if (res.userData[0] == null) {
    
            }
            else if (res.userData[0].mobileNumber !== undefined) {
              this.mobile_number = res.userData[0].mobileNumber
              this.show_mobile = true
              this.mobile = true
            } else {
            this.not_mention_number = true
            }
  
            if (res.userData[0] == null) {
              
            }
            else if (res.userData[0].address !== undefined) {
              this.email_address = res.userData[0].address
              this.show_email = true
              this.email = true
            } else {
              this.not_mention_address = true
            }
  
            if (res.userData[0] == null) {
              
            }
            else if (res.userData[0].website !== undefined) {
              this.website_link = res.userData[0].website
              this.show_link = true
              this.link = true
            } else {
              this.not_mention_website = true
            }
  
            if (res.userData[0] == null) {
             
            }
            else if (res.userData[0].basicInfo !== undefined) {
              this.religious_value = res.userData[0].basicInfo
              this.show_caste = true
              this.religious = true
            } else {
              this.not_mention_religious = true
            }
  
            if (res.userData[0] == null) {
              
            }
            else if (res.userData[0].gender !== undefined) {
              this.gender_value = res.userData[0].gender
              this.show_gender = true
              this.genders = true
            } else {
              this.not_mention_gender = true
            }

            if (res.userData[0] == null) {
            
            }
            else if (res.userData[0].birthDate !== undefined) {
              this.birth_value = res.userData[0].birthDate
              this.show_birth = true
              this.birth = true
            } else {
              this.not_mention_birth = true
            }
         
        })
      } else {
        this.authService.getAllData(id).subscribe(res => {
        this.icons = true
          if (res.userData[0] == null) {
            this.mobile = false
          }
          else if (res.userData[0].mobileNumber !== undefined) {
            this.mobile_number = res.userData[0].mobileNumber
            this.show_mobile = true
            this.mobile = true
          } else {
            this.mobile = false
          }

          if (res.userData[0] == null) {
            this.email = false
          }
          else if (res.userData[0].address !== undefined) {
            this.email_address = res.userData[0].address
            this.show_email = true
            this.email = true
          } else {
            this.email = false
          }

          if (res.userData[0] == null) {
            this.link = false
          }
          else if (res.userData[0].website !== undefined) {
            this.website_link = res.userData[0].website
            this.show_link = true
            this.link = true
          } else {
            this.link = false
          }

          if (res.userData[0] == null) {
            this.religious = false
          }
          else if (res.userData[0].basicInfo !== undefined) {
            this.religious_value = res.userData[0].basicInfo
            this.show_caste = true
            this.religious = true
          } else {
            this.religious = false
          }

          if (res.userData[0] == null) {
            this.genders = false
          }
          else if (res.userData[0].gender !== undefined) {
            this.gender_value = res.userData[0].gender
            this.show_gender = true
            this.genders = true
          } else {
            this.genders = false
          }
        
          if (res.userData[0] == null) {
            this.birth = false
          }
          else if (res.userData[0].birthDate !== undefined) {
            this.birth_value = res.userData[0].birthDate
            this.show_birth = true
            this.birth = true
          } else {
            this.birth = false
          }

        })
      }
      
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(currentUser.data._id == id){
        this.current_user_profile = true
      }else{
        this.current_user_profile = false
      }
    }
  }
  
  addNumber(number: any) {
    this.authService.addNewNumber(number).subscribe(res => {
      if (res['success']) {
        this.mobile_number = number
        this.show_mobile = true
        this.mobile = true;
        this.fill_mobile_no = false
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
        this.email_address = location
        this.show_email = true
        this.email = true
        this.fill_email = false
      }
    })
  }

  editAddress(location: any) {
    this.authService.addNewAddress(location).subscribe(res => {
      if (res['success']) {
        this.show_email = true
        this.u_fill_email = false
      }
    })
  }

  updateAddress(location: any) {
    this.email_address = location
    this.show_email = false
    this.u_fill_email = true
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
    this.email = false
    this.fill_email = false
    this.show_email = false
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
  addWebsite(website: any) {
    this.authService.addNewWebsite(website).subscribe(res => {
      if (res['success']) {
        this.website_link = website
        this.show_link = true
        this.link = true
        this.fill_link = false
      }
    })
  }

  editWebsite(website: any){
    this.authService.addNewWebsite(website).subscribe(res => {
      if (res['success']) {
        this.show_link = true
        this.u_fill_link = false
      }
    })
  }

  updateWebsite(website: any) {
    this.website_link = website
    this.show_link = false
    this.u_fill_link = true
    this.authService.addNewWebsite(website).subscribe(res => {
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

  delWebsite(website: any) {
    this.link = false
    this.fill_link = false
    this.show_link = false
    this.authService.deleteWebsite(website).subscribe(res => {
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
        this.religious_value = caste
        this.show_caste = true
        this.religious = true
        this.fil_caste = false
      }
    })
  }

  editBasicInfo(caste: any) {
    this.authService.addBasicInfo(caste).subscribe(res => {
      if (res['success']) {
        this.show_caste = true
        this.u_fill_caste = false
      }
    })
  }

  updateBasicInfo(caste: any) {
    this.religious_value = caste
    this.show_caste = false
    this.u_fill_caste = true
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
    this.religious = false
    this.fil_caste = false
    this.show_caste = false
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
      if (res['success']) {
        this.gender_value = value
        this.show_gender = true
        this.genders = true
        this.fill_gender = false
      }
    })
  }

  editGender(value: any) {
    this.authService.addGender(value).subscribe(res => {
      if (res['success']) {
        this.show_gender = true
        this.u_fill_gender = false
      }
    })
  }

  updateGender(value: any) {
    this.gender_value = value
    this.show_gender = false
    this.u_fill_gender = true
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
    this.genders = false
    this.fill_gender = false
    this.show_gender = false
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

  //Birthdate
  addBirthDate(birth_value: any) {
    this.authService.addBirthDate(birth_value).subscribe(res => {
      if (res['success']) {
        this.birth_value = birth_value
        this.show_birth = true
        this.birth = true
        this.fill_birth = false
      }
    })
  }

  editBirth(birth_value: any){
    this.authService.addBirthDate(birth_value).subscribe(res => {
      if (res['success']) {
        this.show_birth = true
        this.u_fill_birth = false
      }
    })
  }

  updateBirth(birth_value: any) {
    this.birth_value = birth_value
    this.show_birth = false
    this.u_fill_birth = true
    this.authService.addBirthDate(birth_value).subscribe(res => {
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

  delBirth(birth_value: any) {
    this.birth = false
    this.fill_birth = false
    this.show_birth = false
    this.authService.deleteBirthdate(birth_value).subscribe(res => {
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

  ngOnInit(): void {
  }

  newMobile() {
    this.fill_mobile_no = true
    this.mobile = false
  }

  newAddress() {
    this.fill_email = true
    this.address = false
  }

  newWebsites() {
    this.fill_link = true
    this.website = false
  }

  newReligious() {
    this.fil_caste = true
    this.religious = false
  }

  newGender() {
    this.fill_gender = true
    this.genders = false
  }

  newBirthDate() {
    this.fill_birth = true
    this.birth = false
  }

  Cancel() {
    this.mobile = false;
    this.fill_mobile_no = false;
    this.Required = false
  }

  A_Cancel() {
    this.address = false
    this.Required1 = false
    this.fill_email = false
  }

  W_Cancel() {
    this.website = false
    this.Required2 = false
    this.fill_link = false
  }

  R_Cancel() {
    this.religious = false
    this.Required3 = false
    this.fil_caste = false
  }

  G_Cancel() {
    this.genders = false
    this.Required4 = false
    this.fill_gender =false
  }

  B_Cancel() {
    this.birth = false
    this.fill_birth = false
  }

  u_cancel() {
    this.show_mobile = true;
    this.u_fill_mobile_no = false;
  }

  u_cancel1() {
    this.show_email = true
    this.u_fill_email = false
  }

  u_cancel2() {
    this.show_link = true
    this.u_fill_link = false
  }

  u_cancel3() {
    this.show_caste = true
    this.u_fill_caste = false
  }

  u_cancel4() {
    this.show_gender = true
    this.u_fill_gender = false
  }

  u_cancel5() {
    this.show_birth = true
    this.u_fill_birth = false
  }

}
