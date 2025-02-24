import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8000');
  }

  sendMessage(event: string, message: string): void {
    this.socket.emit(event, message);
  }

  onMessage(event: string, callback: (message: string) => void): void {
    this.socket.on(event, callback);
  }
}
