import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var jQuery: any;
declare var $: any;

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
    $(".right_sidebar").css("display", "none");
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
