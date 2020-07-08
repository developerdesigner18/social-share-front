import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    window.location.replace('');
  }
}
