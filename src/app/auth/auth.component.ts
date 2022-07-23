import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {    
    if (this.authService.isLoggedIn()) {      
      if (this.authService.isAuthenticated()) this.router.navigate([`home/${JSON.parse(localStorage.getItem('currentUser')).data._id}`])
    }
  }

}
