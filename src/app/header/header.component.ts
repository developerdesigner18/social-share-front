import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  id= '';

  constructor() { }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = currentUser.data._id
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    window.location.replace('');
  }
}
