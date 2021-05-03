import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SocketioService } from '../socketio.service';
import {io} from 'socket.io-client';
// import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

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
  constructor(private socketService: SocketioService, public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router) { 
    this.socket = io(environment.apiUrl);
    
    this.socket.on("notifyTyping", data => {
      if(data){
        const typing = document.getElementById("typing");
        typing.innerText = data.user + " " + data.message;
        this.type = data.user + " " + data.message;
      }
    });
    // this.socket.on("notifyStopTyping", () => {
    //     this.type = "";
    // });
    const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
    // this.id = this.activatedRoute.parent.params['value']['id'];
    this.id = current_login_User.data._id
      this.authService.getProfileforAbout(this.id).subscribe(res => {
        this.datas = res.data;
        this.name = res.data.name
      })
  }

  ngOnInit(): void {
    this.socketService.setupSocketConnection();
    this.setupSocketConnection();
  }

    setupSocketConnection(){
      // this.socket = io.io(SOCKET_ENDPOINT);
      let messageInput = document.getElementById("message");
      let typing = document.getElementById("typing");
      this.socket.on('my broadcast', (data: string) => {
        console.log('data', data);
        if (data) {
         const element = document.createElement('li');
         element.innerHTML = data;
         element.style.background = 'white';
         element.style.padding =  '15px 30px';
         element.style.margin = '10px';
         document.getElementById('message-list').appendChild(element);
         }
       });

       messageInput.addEventListener("keypress", () => {
        this.socket.emit("typing", { user: this.name, message: "is typing..." });
      });
      
      this.socket.on("notifyTyping", data => {
        typing.innerText = data.user + " " + data.message;
        this.type = data.user + " " + data.message;
        console.log(data.user + data.message);
      });
      
      //stop typing
      messageInput.addEventListener("keyup", () => {
        this.socket.emit("stopTyping", "");
      });
      
      this.socket.on("notifyStopTyping", () => {
        typing.innerText = "";
      });
    }

  SendMessage() {
    this.socket.emit('my message', this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list').appendChild(element);
    
    if (this.message !== undefined) {
        this.authService.insertMsg(this.message, this.name, this.id, this.id).subscribe(res => {
          if (res['success']) {
            console.log("success", res)
          }
        })
      } else {
        console.log("error")
      }
      this.message = '';
 }

 
}
