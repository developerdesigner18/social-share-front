import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecurityComponent implements OnInit {
  id: any;
  data: any = [];
  user_data: any = [];

  constructor(public authService: AuthService,
    private activatedRoute: ActivatedRoute) { 
    this.id = this.activatedRoute.parent.params['value']['id'];
    this.authService.getAllData(this.id).subscribe(res => {
      this.data = res.userData[0]
    });

    this.authService.getUserProfile(this.id).subscribe(res => { 
      this.user_data = res.data
    })
  }

  ngOnInit(): void {
  }

}
