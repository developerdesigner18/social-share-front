import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  u_email = '';
  u_website = 'http://159.203.67.155/'

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
    }

   }

  ngOnInit(): void {
  }

}
