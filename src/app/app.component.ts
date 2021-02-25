import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Social Share'
  sessionUser = false;
  constructor( private titleService: Title, private authService: AuthService, private router: Router, private themeService: ThemeService) {

  }

  ngOnInit() {
  }

  get isLoggedIn() { return this.authService.isLoggedIn(); }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    location.reload();
  }
}
