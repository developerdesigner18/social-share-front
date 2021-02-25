import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../theme/theme.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css', './theme.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeComponent implements OnInit {
  expiredDate: Date;
  cookieValue: string;
  value: any = ['light'];
  active: import("d:/Client Works/workspace/Social-share/src/theme/symbols").Theme;

  constructor(private themeService: ThemeService, private cookieService: CookieService) {
    // this.value = 'light'
    
    // this.cookieService.set( 'Theme', this.value);
    // this.cookieValue = this.cookieService.get('Theme');

    // this.active = this.themeService.getActiveTheme();
    // if (this.active.name === 'light') {
    //   this.themeService.setTheme('light');
      // this.value.pop()
      // this.value.push('dark');
      // localStorage.setItem("theme", "dark");
    // } else {
      // this.themeService.setTheme('dark');
      // localStorage.setItem("theme", "light");
      // this.value.pop();
      // this.value.push('light')
    // }
    // this.cookieService.set('Theme', this.value);
    
    this.cookieValue = localStorage.getItem('theme');
    // console.log("this.cookieValue", this.cookieValue);
    // console.log(this.value)
    this.themeService.setTheme(this.cookieValue);
  }
  
   toggle() {
    // const active = this.themeService.getActiveTheme() ;
    //  console.log("=-=-=-=-=-toogle name", active.name);
     
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
      localStorage.setItem("theme", "dark");
    } else {
      this.themeService.setTheme('light');
      localStorage.setItem("theme", "light");
    }
     console.log("active.name", active.name)
    // if (active.name === 'light') {
      // this.value.pop()
      // this.value.push('dark');
      // localStorage.setItem("theme", "light");
    // } else {
      // this.themeService.setTheme('light');
      // this.value.pop();
      // localStorage.setItem("theme", "dark");
      // this.value.push('light')
    // }
    // this.cookieService.set( 'Theme', this.value);
  }

  ngOnInit(): void {
  }

}
