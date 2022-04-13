import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupChatDTO } from 'src/app/models/group-chat-DTO';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {

  constructor(public webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }


  sendMessage(sendForm: NgForm){
    const groupChatDto = new GroupChatDTO(sendForm.value.user, sendForm.value.message);
    this.webSocketService.sendMessage(groupChatDto);
    sendForm.controls.message.reset();
  }
}
