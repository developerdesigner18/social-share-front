import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  u_email = '';
  mobile: any;
  email: any;
  website: any;
  number: any;
  address: any
  shows: any;
  shows1: any;
  shows2: any;
  shows3: any;
  u_mobile: any
  u_address: any
  u_website: any
  u_religious: any
  shows4: any
  genders: any
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
  not_mention_langugae = false;
  show_birth: boolean;
  u_fill_birth: boolean;
  show_langugae: boolean;
  fill_langugae = false;
  u_fill_language: boolean;
  language: any
  get_langugae: any
  Language = 'language';
  data_id: any;

  dataid = this.activatedRoute.parent.parent.params['value']['id'];
  languages = true;
  text_language = false;
  id: string;
  friendid: string;
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public toastr: ToastrService
  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];
    if (localStorage.getItem('friendId')) {
      this.friendid = localStorage.getItem('friendId')
      this.icons = false
      this.authService.getProfileForFriend(this.friendid).subscribe(res => {
        this.authService.getAllData(this.friendid).subscribe(res => {

          if (res.userData[0] == null) { 
            this.not_mention_number = true
          }else if (res.userData[0].mobileNumber !== undefined ) {
            this.mobile_number = res.userData[0].mobileNumber
            this.show_mobile = true
            this.mobile = true
          } else {
          this.not_mention_number = true
          }

          if (res.userData[0] == null) {
            this.not_mention_address = true
          } else if (res.userData[0].address !== undefined && res.userData[0] !== null) {
            this.email_address = res.userData[0].address
            this.show_email = true
            this.email = true
          } else {
            this.not_mention_address = true
          }

          if (res.userData[0] == null) {
            this.not_mention_website = true
          } else if (res.userData[0].website !== undefined && res.userData[0] !== null) {
            this.website_link = res.userData[0].website
            this.show_link = true
            this.link = true
          } else {
            this.not_mention_website = true
          }

          if (res.userData[0] == null) {
            this.not_mention_religious = true
          } else if (res.userData[0].basicInfo !== undefined && res.userData[0] !== null) {
            this.religious_value = res.userData[0].basicInfo
            this.show_caste = true
            this.religious = true
          } else {
            this.not_mention_religious = true
          }

          if (res.userData[0] == null) {
            this.not_mention_gender = true
          } else if (res.userData[0].gender !== undefined && res.userData[0] !== null) {
            this.gender_value = res.userData[0].gender
            this.show_gender = true
            this.genders = true
          } else {
            this.not_mention_gender = true
          }

          if (res.userData[0] == null) {
            this.not_mention_birth = true
          } else if (res.userData[0].birthDate !== undefined && res.userData[0] !== null) {
            this.birth_value = res.userData[0].birthDate
            this.show_birth = true
            this.birth = true
          } else {
            this.not_mention_birth = true
          }

          if (res.userData[0] == null) {
            this.not_mention_langugae = true
            this.languages = false
            this.text_language = false
          } else if (res.userData[0].language.length > 0) {   
            this.get_langugae = res.userData[0].language
            this.show_langugae = true 
            this.languages = false
            this.text_language = true
          } else {
            this.languages = false
            this.text_language = false
            this.not_mention_langugae = true
          }
       
      })
      })
    } else {
      const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
      if (current_login_User.data._id !== id) {
        this.icons = false
          this.authService.getAllData(id).subscribe(res => {
            if (res.userData[0] == null) {
              this.not_mention_number = true
            } else if (res.userData[0].mobileNumber !== undefined) {
              this.mobile_number = res.userData[0].mobileNumber
              this.show_mobile = true
              this.mobile = true
            } else {
            this.not_mention_number = true
            }
  
            if (res.userData[0] == null) {
              this.not_mention_address = true
            } else if (res.userData[0].address !== undefined) {
              this.email_address = res.userData[0].address
              this.show_email = true
              this.email = true
            } else {
              this.not_mention_address = true
            }
  
            if (res.userData[0] == null) {
              this.not_mention_website = true
            } else if (res.userData[0].website !== undefined) {
              this.website_link = res.userData[0].website
              this.show_link = true
              this.link = true
            } else {
              this.not_mention_website = true
            }
  
            if (res.userData[0] == null) {
              this.not_mention_religious = true
            } else if (res.userData[0].basicInfo !== undefined) {
              this.religious_value = res.userData[0].basicInfo
              this.show_caste = true
              this.religious = true
            } else {
              this.not_mention_religious = true
            }
  
            if (res.userData[0] == null) {
              this.not_mention_gender = true
            } else if (res.userData[0].gender !== undefined) {
              this.gender_value = res.userData[0].gender
              this.show_gender = true
              this.genders = true
            } else {
              this.not_mention_gender = true
            }

            if (res.userData[0] == null) {
              this.not_mention_birth = true
            } else if (res.userData[0].birthDate !== undefined) {
              this.birth_value = res.userData[0].birthDate
              this.show_birth = true
              this.birth = true
            } else {
              this.not_mention_birth = true
            }

            if (res.userData[0] == null) {
              this.not_mention_langugae = true
              this.languages = false
              this.text_language = false
            } else if (res.userData[0].language.length > 0) {   
              this.get_langugae = res.userData[0].language
              this.show_langugae = true 
              this.languages = false
              this.text_language = true
            } else {
              this.languages = false
              this.text_language = false
              this.not_mention_langugae = true
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

          if (res.userData[0] == null) {
            
          }
          else if (res.userData[0].language !== undefined) {   
            this.get_langugae = res.userData[0].language
            this.show_langugae = true 
          } else {
            
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
    if (number !== undefined) {
      this.authService.addNewNumber(number).subscribe(res => {
        if (res['success']) {
          this.mobile_number = number
          this.show_mobile = true
          this.mobile = true;
          this.fill_mobile_no = false
          this.toastr.success("Your number is saved successfully");
        }
      })
    } else {
      this.toastr.error("Please enter your number");
    }
  }

  editNumber(number: any) {
    if (number !== undefined || number != this.mobile_number) {
      this.authService.addNewNumber(number).subscribe(res => {
        if (res['success']) {
          this.show_mobile = true
          this.u_fill_mobile_no = false
          this.toastr.success("Your number is updated successfully")
        }
      }) 
    } else if(number === this.mobile_number){
      this.toastr.info("Please enter your updated number")
    } else {
      this.toastr.error("Please enter your number");
    }
  }

  updateNumber(number: any) {
    this.mobile_number = number;
    this.show_mobile = false;
    this.u_fill_mobile_no = true;
    this.authService.addNewNumber(number).subscribe(res => {
      if (res['success']) {
        this.u_mobile = true
      }
    })
  }

  delNumber(number: any) {
    this.mobile = false;
    this.fill_mobile_no = false;
    this.show_mobile = false;
    this.authService.deleteNumber(number).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Your number is deleted successfully");
        this.shows = true
        $(`.mobile`).css('display', 'block');
        this.u_mobile = false
      } else {
        this.toastr.error("Oops some error occur. Please try again later")
      }
    })
  }

  addAddress(location: any) {
    if (location !== undefined) {
      this.authService.addNewAddress(location).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your email is added successfully")
          this.email_address = location
          this.show_email = true
          this.email = true
          this.fill_email = false
        }
      })
    } else {
      this.toastr.error("Please enter your email properly")
    }
  }

  editAddress(location: any) {
    if (location !== undefined) {
      this.authService.addNewAddress(location).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your email is updated successfully")
          this.show_email = true
          this.u_fill_email = false
        }
      })
    } else {
      this.toastr.error("Your email is not updated")
    }
  }

  updateAddress(location: any) {
    this.email_address = location
    this.show_email = false
    this.u_fill_email = true
    this.authService.addNewAddress(location).subscribe(res => {
      if (res['success']) {
        this.u_address = true
      }
    })
  }

  delAddress(location: any) {
    this.email = false
    this.fill_email = false
    this.show_email = false
    this.authService.deleteAddress(location).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Your email is deleted successfully")
        this.shows1 = true
        $(`.address`).css('display', 'block');
        this.u_address = false
      } else {
        this.toastr.error("Oops some error occured. Please try again later")
      }
    })
  }

  //  Website
  addWebsite(website: any) {
    if (website !== undefined) {
      this.authService.addNewWebsite(website).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your website is added successfully");
          this.website_link = website
          this.show_link = true
          this.link = true
          this.fill_link = false
        }
      })
    } else {
      this.toastr.error("Please enter your website properly")
    }
  }

  editWebsite(website: any) {
    if (website !== undefined) {
      this.authService.addNewWebsite(website).subscribe(res => {
        this.toastr.success("Your website is updated successfully")
        if (res['success']) {
          this.show_link = true
          this.u_fill_link = false
        }
      })
    } else {
      this.toastr.error("Your website is not updated");
    }
  }

  updateWebsite(website: any) {
    this.website_link = website
    this.show_link = false
    this.u_fill_link = true
    this.authService.addNewWebsite(website).subscribe(res => {
      if (res['success']) {
        this.u_website = true
      }
    })
  }

  delWebsite(website: any) {
    this.link = false
    this.fill_link = false
    this.show_link = false
    this.authService.deleteWebsite(website).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Your website is deleted successfully")
        this.shows2 = true
        $(`.website`).css('display', 'block');
        this.u_website = false
      } else {
        this.toastr.error("Oops some error occur. Please try again later.")
      }
    })
  }

  //  Religious
  addBasicInfo(caste: any) {
    if (caste !== undefined) {
      this.authService.addBasicInfo(caste).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your religious is added successfully")
          this.religious_value = caste
          this.show_caste = true
          this.religious = true
          this.fil_caste = false
        }
      })
    }
    else {
      this.toastr.error("Please enter your religious properly");
    }
  }

  editBasicInfo(caste: any) {
    if (caste !== undefined) {
      this.authService.addBasicInfo(caste).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your religious is updated successfully")
          this.show_caste = true
          this.u_fill_caste = false
        }
      })
    } else {
      this.toastr.error("Please enter your religious properly")
    }
  }

  updateBasicInfo(caste: any) {
    this.religious_value = caste
    this.show_caste = false
    this.u_fill_caste = true
    this.authService.addBasicInfo(caste).subscribe(res => {
      if (res['success']) {
        this.u_religious = true      }
    })
  }

  delBasicInfo(caste: any) {
    this.religious = false
    this.fil_caste = false
    this.show_caste = false
    this.authService.deleteBasicInfo(caste).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Your religious is deleted successfully")
        this.shows3 = true
        $(`.religious`).css('display', 'block');
        this.u_religious = false
      } else {
        this.toastr.error("Oops some error occur. Please try again later")
      }
    })
  }

  //Gender
  addGender(value: any) {
    if (value !== undefined) {
      this.authService.addGender(value).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your gender is added successfully");
          this.gender_value = value
          this.show_gender = true
          this.genders = true
          this.fill_gender = false
        }
      })
    } else {
      this.toastr.error("Please select your gender");
    }
  }

  editGender(value: any) {
    if (value !== undefined) {
      this.authService.addGender(value).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your gender is updated successfully")
          this.show_gender = true
          this.u_fill_gender = false
        }
      })
    } else {
      this.toastr.error("Please select your gender");
    }
  }

  updateGender(value: any) {
    this.gender_value = value
    this.show_gender = false
    this.u_fill_gender = true
    this.authService.addGender(value).subscribe(res => {
      if (res['success']) {
        this.u_gender = true
      }
    })
  }

  delGender(value: any) {
    this.genders = false
    this.fill_gender = false
    this.show_gender = false
    this.authService.deleteGender(value).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Your gender is deleted successfully")
        this.shows4 = true
        $(`.gender`).css('display', 'block');
        this.u_gender = false
      } else {
        this.toastr.error("Oops some error occur. Please try again later")
      }
    })
  }

  //Birthdate
  addBirthDate(birth_value: any) {
    if (birth_value !== undefined) {
      this.authService.addBirthDate(birth_value).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your birth date is added successfully")
          this.birth_value = birth_value
          this.show_birth = true
          this.birth = true
          this.fill_birth = false
        }
      })
    } else {
      this.toastr.error("Please enter your birthdate");
    }
  }

  editBirth(birth_value: any) {
    if (birth_value !== undefined) {
      this.authService.addBirthDate(birth_value).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your birthdate is updated successfully")
          this.show_birth = true
          this.u_fill_birth = false
        }
      })
    } else {
      this.toastr.error("Please enter your birthdate")
    }
  }

  updateBirth(birth_value: any) {
    this.birth_value = birth_value
    this.show_birth = false
    this.u_fill_birth = true
    this.authService.addBirthDate(birth_value).subscribe(res => {
      if (res['success']) {
        this.u_website = true

      }
    })
  }

  delBirth(birth_value: any) {
    this.birth = false
    this.fill_birth = false
    this.show_birth = false
    this.authService.deleteBirthdate(birth_value).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Your birth date is deleted successfully");
        this.shows2 = true
        $(`.website`).css('display', 'block');
        this.u_website = false
      } else {
        this.toastr.error("Oops some error occur. Please try again later")
      }
    })
  }

  // Language
  save_add_langugae(language: any) {
    if (language !== undefined) {
      this.authService.addLanguage(this.dataid, language, this.Language).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your language is added successfully")
          this.language = language
          this.show_langugae = true
          this.fill_langugae = false
          this.authService.getAllData(this.dataid).subscribe(res => {
            if (res.userData[0].language !== undefined) {
              this.get_langugae = res.userData[0].language
            }
           })
        }
      })
    } else {
      this.toastr.error("Please enter your language")
    }
  }

  delLangugae(dataId: any) { 
    this.authService.deleteLanguage(this.dataid, dataId, this.Language).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Your language is deleted successfully")
        this.fill_langugae = false;
        this.show_langugae = false;
        this.authService.getAllData(this.dataid).subscribe(res => {
          if (res.userData[0] == null) {
          }
          else if (res.userData[0].language !== undefined) {
            this.get_langugae = res.userData[0].language
            this.show_langugae = true
          }
        })
      } else {
        this.toastr.error("Oops some error occured");
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

  newLanguage() { 
    this.fill_langugae = true
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

  language_Cancel() {
    this.fill_langugae = false
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

