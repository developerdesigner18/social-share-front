import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Social Share'
  constructor( private titleService: Title, private authService: AuthService) { }

  ngOnInit() {
  }

  get isLoggedIn() { return this.authService.isLoggedIn(); }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
