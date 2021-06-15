import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
 import { environment } from 'src/environments/environment';
//import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;
  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.apiUrl);

    // this.socket.emit('my message', 'Hello there from Angular.');
    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });
  }
}