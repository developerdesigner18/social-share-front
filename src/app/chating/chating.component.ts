import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { SocketioService } from '../socketio.service';
import {io} from 'socket.io-client';
 import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Pusher from 'pusher-js'
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
  usersOnline: any
  ids: any
  users = []
  sessionDesc: any
  currentcaller: any
  room: any
  caller: any
  localUserMedia;
  channel: any;
  check_user: any;
  temp_name: any;
  current_user_id: any;

  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;
  private pusherClient: Pusher;
  constructor(private socketService: SocketioService, public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router) {
      Pusher.logToConsole = true;
    this.pusherClient = new Pusher('36f6c0c04f1beb073837',
      {
        cluster: 'ap2',
        authEndpoint: `${environment.apiUrl}/pusher/auth`
      })
    // var channel = this.pusherClient.subscribe('my-channel');
    // channel.bind('my-event', function(data) {
    //   alert(JSON.stringify(data));
    //   console.log("data", JSON.stringify(data))
    // });

    // video calling
    this.channel = this.pusherClient.subscribe("presence-videocall");

    this.channel.bind("pusher:subscription_succeeded", members => {
      //set the member count
      this.usersOnline = members.count;
      this.id = members.me.id;
      document.getElementById("myid").innerHTML = ` My caller id is : ` + this.id;
      members.each(member => {
        if (member.id != members.me.id) {
          this.users.push(member.id);
        }
      });
      this.render();
    });

    this.channel.bind("pusher:member_added", member => {
      this.users.push(member.id);
      this.render();
    });

    this.channel.bind("pusher:member_removed", member => {
      // for remove member from list:
      var index = this.users.indexOf(member.id);
      this.users.splice(index, 1);
      if (member.id == this.room) {
        this.endCall();
      }
      this.render();
    });

    this.channel.bind("client-candidate", function(msg) {
      if(msg.room==this.room){
          console.log("candidate received");
          this.caller.addIceCandidate(new RTCIceCandidate(msg.candidate));
      }
    });
    
    this.channel.bind("client-sdp", function(msg) {
      if(msg.room == this.id){
          var answer = confirm("You have a call from: "+ msg.from + "Would you like to answer?");
          if(!answer){
              return this.channel.trigger("client-reject", {"room": msg.room, "rejected":this.id});
          }
          this.room = msg.room;
          this.getCam()
          .then(stream => {
              this.localUserMedia = stream;
            this.toggleEndCallButton();
            var myImgsrc3: any = document.getElementById("selfview") as HTMLImageElement;
              if (window.URL) {
                myImgsrc3.src = window.URL.createObjectURL(stream);
              } else {
                myImgsrc3.src = stream;
              }
              this.caller.addStream(stream);
              var sessionDesc = new RTCSessionDescription(msg.sdp);
              this.caller.setRemoteDescription(sessionDesc);
              this.caller.createAnswer().then(function(sdp) {
                  this.caller.setLocalDescription(new RTCSessionDescription(sdp));
                  this.channel.trigger("client-answer", {
                      "sdp": sdp,
                      "room": this.room
                  });
              });
          })
          .catch(error => {
              console.log('an error occured', error);
          })
      }
  });
  this.channel.bind("client-answer", function(answer) {
    if (answer.room == this.room) {
      console.log("answer received");
      this.caller.setRemoteDescription(new RTCSessionDescription(answer.sdp));
    }
  });
  
  this.channel.bind("client-reject", function(answer) {
    if (answer.room == this.room) {
      console.log("Call declined");
      alert("call to " + answer.rejected + "was politely declined");
      this.endCall();
    }
  });

    //To iron over browser implementation anomalies like prefixes
  this.GetRTCPeerConnection();
  this.GetRTCSessionDescription();
  this.GetRTCIceCandidate();
  //prepare the caller to use peerconnection
  this.prepareCaller();


    
    this.socket = io(environment.apiUrl);
    
    this.socket.on("notifyTyping", data => {
      if (data) {
        const typing = document.getElementById("typing");
        typing.innerText = data.user + " " + data.message;
        this.type = data.user + " " + data.message;
      }
    });
    const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
    this.current_user_id = current_login_User.data._id
      this.authService.getProfileforAbout(this.current_user_id).subscribe(res => {
        this.datas = res.data;
        this.name = res.data.name
      })

    this.authService.getFriends(this.current_user_id).subscribe(res => {
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

  // video calling

  render() {
    var list = "";
    console.log("users", this.users[0])
    this.check_user = this.users[0]
    // this.users.forEach(function(user) {
    //   list +=
    //     `<li>` +
    //     user +
    //     ` <input type="button" style="float:right;"  value="Call" (click)="callUser('` +
    //     user +
    //     `')" id="makeCall" /></li>`;
    // });
    // document.getElementById("users").innerHTML = list;
  }

  
  GetRTCIceCandidate() {
    window.RTCIceCandidate =
      window.RTCIceCandidate
  
    return window.RTCIceCandidate;
  }
  
  GetRTCPeerConnection() {
    window.RTCPeerConnection =
      window.RTCPeerConnection 
    return window.RTCPeerConnection;
  }
  
  GetRTCSessionDescription() {
    window.RTCSessionDescription =
      window.RTCSessionDescription 
    return window.RTCSessionDescription;
  }
  prepareCaller() {
    //Initializing a peer connection
    this.caller = new window.RTCPeerConnection();
    //Listen for ICE Candidates and send them to remote peers
    this.caller.onicecandidate = function(evt) {
      if (!evt.candidate) return;
      console.log("onicecandidate called");
      this.onIceCandidate(this.caller, evt);
    };
    //onaddstream handler to receive remote feed and show in remoteview video element
    this.caller.onaddstream = function(evt) {
      console.log("onaddstream called");
      var myImgsrc = document.getElementById("remoteview") as HTMLImageElement;
      if (window.URL) {
        myImgsrc.src = window.URL.createObjectURL(
          evt.stream
        );
      } else {
        myImgsrc.src = evt.stream;
      }
    };
  }

  onIceCandidate(peer, evt) {
    if (evt.candidate) {
        this.channel.trigger("client-candidate", {
            "candidate": evt.candidate,
            "room": this.room
        });
    }
  }
  
  getCam() {
    //Get local audio/video feed and show it in selfview video element
    return navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
  }

  //Create and send offer to remote peer on button click
  callUser(user) {
    console.log("call")
    this.getCam()
      .then(stream => {
        var myImgsrc2: any = document.getElementById("selfview") as HTMLImageElement;
        if (window.URL) {
          myImgsrc2.src = window.URL.createObjectURL(
            stream
          );
        } else {
          myImgsrc2.src = stream;
        }
        this.toggleEndCallButton();
        this.caller.addStream(stream);
        this.localUserMedia = stream;
        this.caller.createOffer().then(function(desc) {
          this.caller.setLocalDescription(new RTCSessionDescription(desc));
          this.channel.trigger("client-sdp", {
            sdp: desc,
            room: user,
            from: this.id
          });
          this.room = user;
        });
      })
      .catch(error => {
        console.log("an error occured", error);
      });
  }
  toggleEndCallButton() {
    if (document.getElementById("endCall").style.display == "block") {
      document.getElementById("endCall").style.display = "none";
    } else {
      document.getElementById("endCall").style.display = "block";
    }
  }
  endCall() {
    this.room = undefined;
    this.caller.close();
    for (let track of this.localUserMedia.getTracks()) {
      track.stop();
    }
    this.prepareCaller();
    this.toggleEndCallButton();
  }

  endCurrentCall() {
    this.channel.trigger("client-endcall", {
      room: this.room
    });
    this.endCall();
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

  setupSocketConnection() {
    this.socket.emit('login', {userId: this.current_user_id})
      let messageInput = document.getElementById("message");
      let typing = document.getElementById("typing");
      this.socket.on('my broadcast', (data: string) => {
       let value = [this.current_user_id, this.recieverId]
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
    let value = [this.current_user_id, this.recieverId]
    value.sort((a, b) => b.localeCompare(a))
    this.mergeId = value.join()
    
    if (this.message !== undefined) {
        this.authService.insertMsg(this.message, this.name, this.current_user_id, this.recieverId, this.mergeId).subscribe(res => {
          if (res['success']) {
          }
        })
      }
    
    this.authService.showMsg(this.mergeId).subscribe(res => {
      if (res['success']) {
        this.chat_messages = res.userData
      }
    })
    
      this.message = '';
 }
  openChat(id, name) {
    this.temp_name = name
    this.recieverId = id
    this.showView = false;
    let value = [this.current_user_id, this.recieverId]
    value.sort((a, b) => b.localeCompare(a))
    this.mergeId = value.join()
    this.authService.showMsg(this.mergeId).subscribe(res => {
      if (res['success']) {
        this.chat_messages = res.userData
      }
    })
 }

 
}
