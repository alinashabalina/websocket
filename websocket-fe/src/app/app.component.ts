import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [],
  styleUrls: []
})
export class AppComponent implements OnInit {
  eur_message: string = '';

  constructor(private socketService: SocketService) {}
  sendPing() {
    setTimeout(() => {
      this.socketService.sendMessage('ping','client sends a ping')
    }, 10000);

  }
  ngOnInit(): void {
    this.sendPing()
    this.socketService.onMessage('rates', (msg: string) => {
      this.eur_message = msg;
      this.sendPing()
    });
    this.socketService.onMessage('error', () => {
      this.eur_message = 'soon to be updated'
      this.sendPing()
    });
  }

}
