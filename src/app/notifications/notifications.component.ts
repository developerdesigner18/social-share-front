import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notif_data: any = [];
  id: any = [];


  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
    
    // let id = this.activatedRoute.parent.parent.params['value']['id'];
    const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
    this.id = current_login_User.data._id

    this.authService.getNotifications(this.id).subscribe(res => {
      if (res['message'].length > 0) {
        this.notif_data = res['message']
        
      }

    })

    
   }

  ngOnInit(): void {
  }

}
