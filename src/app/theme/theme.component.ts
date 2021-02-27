import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../theme/theme.service';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private themeService: ThemeService, private cookieService: CookieService) {
    this.cookieValue = localStorage.getItem('theme');
    this.themeService.setTheme(this.cookieValue);
    
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
     console.log("active.name", active.name)
  }

  ngOnInit(): void {
  }

}
