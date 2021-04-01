import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../theme/theme.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-themes',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css', './theme.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeComponent implements OnInit {
  expiredDate: Date;
  cookieValue: string;
  value: any = ['light'];
  active: import("d:/Client Works/workspace/Social-share/src/theme/symbols").Theme;
  hide: boolean;
  themeChange: any;
  id: any;
  data: any = [];

  constructor(private themeService: ThemeService, private cookieService: CookieService, private toastr: ToastrService) {
    this.cookieValue = localStorage.getItem('theme');
    this.themeService.setTheme(this.cookieValue);
    this.themeChange = localStorage.getItem('theme');
    this.data = localStorage.getItem('currentUser');
    const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
    this.id = current_login_User.data._id;
    console.log("this.data", current_login_User.data._id);
    console.log("this.themeChange", this.themeChange);
  }
  
   toggle() {
    if (this.cookieValue === 'dark') {
      this.hide=!this.hide
    } else {
      this.hide=this.hide
    }
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
      localStorage.setItem("theme", "dark");
    } else {
      this.themeService.setTheme('light');
      localStorage.setItem("theme", "light");
    }
  }

  ngOnInit(): void {
  }

  submit(themeChange) {
    console.log("themeChange", themeChange)
    console.log("Hurray this is running");
    this.toastr.success("Theme is updated successfully");
    this.themeService.setTheme(themeChange);
    localStorage.setItem("theme", themeChange);
  }

}
