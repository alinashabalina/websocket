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
  rub_message: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.sendMessage('initial_message','socket connected to the client')
    this.socketService.onMessage('ratesEUR', (msg: string) => {
      this.eur_message = msg;
    });
    this.socketService.onMessage('ratesRUB', (msg: string) => {
      this.rub_message = msg;
    });
  }

}
