import { Injectable } from '@angular/core';

import { GroupChatDTO } from '../models/group-chat-DTO';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket;
  groupChat: GroupChatDTO[] = [];

  constructor(public webSocketService: WebSocketService) { }


  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:4200/chat');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event)
    };
    this.webSocket.onmessage = (event) => {
      const groupChatDto = JSON.parse(event.data);
      this.groupChat.push(groupChatDto);
    };
    this.webSocket.onclose = (event) => {
      console.log('Close: ',event)
    };
  }

  public sendMessage(groupChatDto: GroupChatDTO) {
    this.webSocket.send(JSON.stringify(groupChatDto));
  }

  public closeWebSocket(){
    this.webSocket.close();
  }
}
