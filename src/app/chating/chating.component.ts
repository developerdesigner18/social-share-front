import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { SocketioService } from '../socketio.service';
import {io} from 'socket.io-client';
 import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { environment } from 'src/environments/environment.prod';

// const SOCKET_ENDPOINT = 'localhost:8000';
@Component({
  selector: 'app-chating',
  templateUrl: './chating.component.html',
  styleUrls: ['./chating.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatingComponent implements OnInit {
  
  socket;
  message: string;
  type: string;
  id: any;
  datas: any;
  name: any;
  showView: boolean = true;
  recieverId: any;
  mergeId: any;
  chat_messages: any = [];
  frdDetails = [];

  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;
  constructor(private socketService: SocketioService, public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router) { 
    this.socket = io(environment.apiUrl);
    
    this.socket.on("notifyTyping", data => {
      if (data) {
        const typing = document.getElementById("typing");
        typing.innerText = data.user + " " + data.message;
        this.type = data.user + " " + data.message;
      }
    });
    const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
    this.id = current_login_User.data._id
      this.authService.getProfileforAbout(this.id).subscribe(res => {
        this.datas = res.data;
        this.name = res.data.name
      })

    this.authService.getFriends(this.id).subscribe(res => {
      if(res.success)
      {
        for(let i = 0; i < res.userInfo.length; i++){
          this.frdDetails.push(res.userInfo[i])
        }
      }
    })

    //show message
    
  }

  ngOnInit(): void {
    this.setupSocketConnection();
    
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

  setupSocketConnection() {
    this.socket.emit('login', {userId: this.id})
      let messageInput = document.getElementById("message");
      let typing = document.getElementById("typing");
      this.socket.on('my broadcast', (data: string) => {
       let value = [this.id, this.recieverId]
       value.sort((a, b) => b.localeCompare(a))
       this.mergeId = value.join()
        this.authService.showMsg(this.mergeId).subscribe(res => {
          
          if (res['success']) {
            this.chat_messages = res.userData
          }
        })
      });
    
    this.socket.on('Online', (data: Object) => {
    })

    if (messageInput) {
      messageInput.addEventListener('keypress', () => {
        this.socket.emit("typing", { user: this.name, message: "is typing..." });
      });
    }
      this.socket.on("notifyTyping", data => {
        typing.innerText = data.user + " " + data.message;
        this.type = data.user + " " + data.message;
      });
      
      //stop typing
    if (messageInput) {
      messageInput.addEventListener("keyup", () => {
        this.socket.emit("stopTyping", "");
      });
    }
      this.socket.on("notifyStopTyping", () => {
        typing.innerText = "";
      });
    }

  SendMessage() {
    this.socket.emit('my message', this.message);
    const element = document.createElement('li');
    let value = [this.id, this.recieverId]
    value.sort((a, b) => b.localeCompare(a))
    this.mergeId = value.join()
    
    if (this.message !== undefined) {
        this.authService.insertMsg(this.message, this.name, this.id, this.recieverId, this.mergeId).subscribe(res => {
          if (res['success']) {
          }
        })
      } else {
    }
    
    this.authService.showMsg(this.mergeId).subscribe(res => {
      if (res['success']) {
        this.chat_messages = res.userData
      }
    })
    
      this.message = '';
 }
  openChat(id) {
    this.recieverId = id
    this.showView = false;
    let value = [this.id, this.recieverId]
    value.sort((a, b) => b.localeCompare(a))
    this.mergeId = value.join()
    this.authService.showMsg(this.mergeId).subscribe(res => {
      if (res['success']) {
        this.chat_messages = res.userData
      }
    })
 }

 
}
