import { Component, OnInit, HostListener, ViewChild, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ThemeService } from '../theme/theme.service';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { ConnectionService } from 'ng-connection-service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Social Share'
  // display: any;
  id: any;
  duration: number;
  timer: number;
  minutes: number;
  seconds: number;
  sessionUser = false;
  show: boolean = false;
  isConnected = true;  
  noInternetConnection: boolean; 
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  public modalRef: BsModalRef;

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  constructor( private titleService: Title, private authService: AuthService, private router: Router, private themeService: ThemeService, private bnIdle: BnNgIdleService, private connectionService: ConnectionService, private idle: Idle, private keepalive: Keepalive, private modalService: BsModalService) {
    // this.bnIdle.startWatching(600).subscribe((res) => {
    //   if(res) {
    //       const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //       this.id = currentUser.data._id
    //       let status = 0;
          
    //       this.titleService.setTitle('session expiring...');  
    //       setTimeout(()=>{        
    //         this.titleService.setTitle('Session Expired');
    //         this.authService.updateStatus(this.id, status).subscribe(res => {
    //         if (res['success']) {
    //           console.log("res", res);
    //           }
    //         })
    //         localStorage.removeItem('currentUser');
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('friendId');
    //         window.location.replace('');
    //       }, 180000);
    //   } else {
    //     this.titleService.setTitle('Social Share');
    //   }
    // })
    // this.connectionService.monitor().subscribe(isConnected => {  
    //   this.isConnected = isConnected;  
    //   if (this.isConnected) {  
    //     this.noInternetConnection=false;  
        
    //   }  
    //   else {  
    //     this.noInternetConnection=true;  
    //   }  
    //   console.log("isConnected", isConnected);    })  
    if (this.authService.isLoggedIn() == true) {
      // sets an idle timeout of 5 seconds, for testing purposes.
      idle.setIdle(600);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      idle.setTimeout(300);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.onIdleEnd.subscribe(() => {
        this.idleState = 'No longer idle.'
        this.reset();
      });
    
      idle.onTimeout.subscribe(() => {
        this.childModal.hide();
        this.idleState = 'Timed out!';
        this.timedOut = true;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('friendId');
        window.location.replace('');
      });
    
      idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        this.childModal.show();
      });
    
      idle.onTimeoutWarning.subscribe((countdown) => {
        this.idleState = 'You will time out in ' + countdown + ' seconds!'
      });

      // sets the ping interval to 15 seconds
      keepalive.interval(150);

      keepalive.onPing.subscribe(() => this.lastPing = new Date());

      if (this.authService.isLoggedIn() !== true) {
        idle.watch()
        this.timedOut = false;
      } else {
        idle.stop();
      }

      this.reset();
    }

  }

  ngOnInit() {
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  reset() {
    this.idle.watch();
    // this.idleState = 'Started.';
    this.timedOut = false;
  }
  get isLoggedIn() { return this.authService.isLoggedIn(); }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }

  logout(){
    this.childModal.hide();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('friendId');
    window.location.replace('');
  }
  

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    location.reload();
  }
}
