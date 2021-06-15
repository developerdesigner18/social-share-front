import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  work: boolean;
  working = true;
  university: any;
  school: any;
  current_user_profile = true;
  works = 'work';
  University = 'university'
  School = 'highSchool'
  id: string;
  get_works = [];
  get_university = [];
  get_school = [];
  event: string;
  fill_work = false;
  show_work: boolean
  u_fill_work: boolean
  icons = false;
  not_mention_work: any;
  dataId: any;
  data_id: any;
  fill_university = false;
  show_university: boolean
  u_fill_university: boolean
  not_mention_university: any;
  university_id: any;
  fill_school = false;
  show_school: boolean
  u_fill_school: boolean
  not_mention_school: any;
  school_id: any;
  university_show = true;
  school_show = true;
  friendid: string;

  constructor(
    public router: Router,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public toastr: ToastrService
  ) {
    if (localStorage.getItem('friendId')) {
      this.friendid = localStorage.getItem('friendId')
      this.authService.getFriendData(this.friendid).subscribe(res => {
        this.current_user_profile = false
        this.icons = false
        this.authService.getAllData(this.friendid).subscribe(res => { 
          if (!res['success']) {
            this.not_mention_work = "Work"
            this.working = false
          } else if (res.userData[0].work.length > 0) {   
            this.get_works = res.userData[0].work
            this.show_work = true 
            this.working = false
          } else {
            this.working = false
            this.not_mention_work = "Work"
          }

          if (!res['success']) {
            this.university_show = false
            this.not_mention_university = "University"
          } else if (res.userData[0].university.length > 0) {   
            this.get_university = res.userData[0].university
            this.show_university = true 
            this.university_show = false
          } else {
            this.university_show = false
            this.not_mention_university = "University"
          }

          if (!res['success']) {
            this.school_show = false
            this.not_mention_school = "School"
          } else if (res.userData[0].highSchool.length > 0) {   
            this.get_school = res.userData[0].highSchool
            this.show_school = true 
            this.school_show = false
          } else {
            this.school_show = false
            this.not_mention_school = "School"
          }
        })
      })
    } else {
    const id = this.activatedRoute.parent.parent.params['value']['id'];
      
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      localStorage.removeItem('friendId')
      if (currentUser.data._id !== id) {
        this.current_user_profile = false
        this.icons = false
        this.authService.getAllData(id).subscribe(res => { 
          if (!res['success']) {
            this.working = false
            this.not_mention_work = "Work"
          } else if (res.userData[0].work.length > 0) {   
            this.get_works = res.userData[0].work
            this.show_work = true 
            this.working = false
          } else {
            this.working = false
            this.not_mention_work = "Work"
          }

          if (!res['success']) {
            this.university_show = false
            this.not_mention_university = "University"
          } else if (res.userData[0].university.length > 0) {   
            this.get_university = res.userData[0].university
            this.show_university = true 
            this.university_show = false
          } else {
            this.university_show = false
            this.not_mention_university = "University"
          }

          if (!res['success']) {
            this.school_show = false
            this.not_mention_school = "School"
          } else if (res.userData[0].highSchool.length > 0) {   
            this.get_school = res.userData[0].highSchool
            this.show_school = true 
            this.school_show = false
          } else {
            this.school_show = false
            this.not_mention_school = "School"
          }
        })
      } else {

        this.authService.getAllData(id).subscribe(res => {

          this.icons = true
          if(res['success']){
          if (res.userData[0].work !== undefined && res.userData[0] !== null) {
            this.get_works = res.userData[0].work
            this.dataId = res.userData[0].work.map((_id) => _id._id[0])
            this.show_work = true
            this.work = true
          } else {
            this.work = false
          }
          
          if (res.userData[0].university !== undefined && res.userData[0] !== null) {
            this.get_university = res.userData[0].university
            this.dataId = res.userData[0].university.map((_id) => _id._id[0])
            this.show_university = true
          } else {
            this.work = false
          }
          
          if (res.userData[0].highSchool !== undefined && res.userData[0] !== null) {
            this.get_school = res.userData[0].highSchool
            this.dataId = res.userData[0].highSchool.map((_id) => _id._id[0])
            this.show_school = true
          } else {
            this.work = false
          }
        } else {
          console.log("res", res)
        }
        })
      }
    }
    this.id = this.activatedRoute.parent.parent.params['value']['id'];
  }

  ngOnInit(): void {
  }

  newWork(){
    this.fill_work = true
    this.work = false
  }

  newUniversity(){
    this.fill_university = true
  }

  newSchool(){
    this.fill_school = true
  }
  
  save_add_work(event: any) {
    if (event !== undefined) {
      this.authService.addWork(this.id, event, this.works).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Work place is added successfully")
          this.event = event
          this.show_work = true
          this.work = true;
          this.fill_work = false
          this.authService.getAllData(this.id).subscribe(res => {
            if (res.userData[0].work !== undefined) {
              this.get_works = res.userData[0].work
            }
           })
        }
      })
    } else {
      this.toastr.error("Please enter work place properly")
    }
  }

  editWork(event: any) {
    if (event !== undefined) {
      this.authService.updateWork(this.id , event, this.data_id, this.works).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Work place is updated successfully")
          this.show_work = true
          this.u_fill_work = false
          this.authService.getAllData(this.id).subscribe(res => {
            if (res.userData[0].work !== undefined) {
              this.get_works = res.userData[0].work
            }
           })
        }
      })
    } else {
      this.toastr.error("Please enter work place properly")
    }
  }

  updateWork(dataId: any, event: any) {
    this.event = event;
    this.show_work = false;
    this.u_fill_work = true;
    this.data_id = dataId
    this.authService.updateWork(this.id , event, dataId, this.works).subscribe(res => {
      
    })
  }

  delWork(dataId: any) {
    this.authService.deleteWork(this.id, dataId, this.works).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Work place is deleted successfully")
        this.work = false;
        this.fill_work = false;
        this.show_work = false;
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0] === null) {
          }
          else if (res.userData[0].work !== undefined) {
            this.get_works = res.userData[0].work
            this.show_work = true
            this.work = true
          } else {
            this.work = false
          }
        })
      } else {
        this.toastr.error("Oops some error occur. Please try again later")
      }
    })

  }
  save_add_university(university: any) {
    if (university !== undefined) {
      this.authService.addUniversity(this.id, university, this.University).subscribe(res => {
        if (res['success']) {
          this.toastr.success("University is added successfully")
          this.university = university
          this.show_university = true
          this.fill_university = false
          this.authService.getAllData(this.id).subscribe(res => {
            if (res.userData[0].university !== undefined) {
              this.get_university = res.userData[0].university
            }
           })
        }
      })
    } else {
      this.toastr.error("Please enter university properly")
    }
  }

  editUniversity(university: any) {
    if (university !== undefined) {
      this.authService.updateUniversity(this.id , university, this.university_id, this.University).subscribe(res => {
        if (res['success']) {
          this.toastr.success("University is updated successfully")
          this.show_university = true
          this.u_fill_university = false
          this.authService.getAllData(this.id).subscribe(res => {
            if (res.userData[0].university !== undefined) {
              this.get_university = res.userData[0].university
            }
           })
        }
      })
    } else {
      this.toastr.error("Please enter university properly")
    }
  }

  updateUniversity(dataId: any, university: any) {
    this.university = university;
    this.show_university = false;
    this.u_fill_university = true;
    this.university_id = dataId
    this.authService.updateUniversity(this.id , university, dataId, this.University).subscribe(res => {
      
    })
  }

  delUniversity(dataId: any) {
    this.authService.deleteUniversity(this.id, dataId, this.University).subscribe(res => {
      if (res['success']) {
        this.toastr.success("University is deleted successfully")
        this.fill_university = false;
        this.show_university = false;
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0].university !== undefined && res.userData[0] !== null) {
            this.get_university = res.userData[0].university
            this.show_university = true
          } else {
            this.work = false
          }
        })
      } else {
        this.toastr.error("Oops some error occur. Please try again later")
      }
    })

  }

  save_add_school(school: any) {
    if (school !== undefined) {
      this.authService.addSchool(this.id, school, this.School).subscribe(res => {
        if (res['success']) {
          this.toastr.success("High School is added successfully")
          this.school = school
          this.show_school = true
          this.fill_school = false
          this.authService.getAllData(this.id).subscribe(res => {
            if (res.userData[0].highSchool !== undefined) {
              this.get_school = res.userData[0].highSchool
            }
           })
        }
      })
    } else {
      this.toastr.error("Please enter your detail properly")
    }
  }

  editSchool(school: any) {
    if (school !== undefined) {
      this.authService.updateSchool(this.id , school, this.school_id, this.School).subscribe(res => {
        if (res['success']) {
          this.toastr.success("High School is updated successfully")
          this.show_school = true
          this.u_fill_school = false
          this.authService.getAllData(this.id).subscribe(res => {
            if (res.userData[0].highSchool !== undefined) {
              this.get_school = res.userData[0].highSchool
            }
           })
        }
      })
    } else {
      this.toastr.error("Please enter your detail properly")
    }
  }

  updateSchool(dataId: any, school: any) {
    this.school = school;
    this.show_school = false;
    this.u_fill_school = true;
    this.school_id = dataId
    this.authService.updateSchool(this.id , school, dataId, this.School).subscribe(res => {
      
    })
  }

  delSchool(dataId: any) {
    this.authService.deleteSchool(this.id, dataId, this.School).subscribe(res => {
      if (res['success']) {
        this.toastr.success("High School is deleted successfully")
        this.fill_school = false;
        this.show_school = false;
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0].highSchool !== undefined && res.userData[0] !== null) {
            this.get_school = res.userData[0].highSchool
            this.show_school = true
          } else {
            this.work = false
          }
        })
      } else {
        this.toastr.error("Oops some error occur. Please try again later")
      } 
    })
  }
 
  work_Cancel(){
    this.fill_work = false;
  }

  Uni_Cancel(){
    this.fill_university = false;
  }

  School_Cancel() { 
    this.fill_school = false
  }

  w_cancel() {
    this.show_work = true
    this.u_fill_work = false
  }

  u_cancel() {
    this.show_university = true
    this.u_fill_university = false
  }

  s_cancel() {
    this.show_school = true
    this.u_fill_school = false
  }

}
