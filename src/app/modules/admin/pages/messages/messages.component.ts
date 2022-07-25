import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import {Message} from "../../../../models/message";
import {UserResponse} from "../../../../models/userResponse";
import {UsersService} from "../../../../services/users.service";
import {MessagesService} from "../../../../services/messages.service";
import io from "socket.io-client";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit, AfterViewInit {
  usersLoaded: boolean = false;
  socket: any;
  userSelected: number = -1;
  userMe: UserResponse = {} as UserResponse;
  messages: Message[] = [] as Message[];
  message: string = "";
  messageCreate: Message = {} as Message;

  constructor(private elementRef: ElementRef,
              private usersService: UsersService,
              private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.retrieveData();
    this.socket = io('https://full-stack-social-app-socket.herokuapp.com/');
    this.socket.on('addNewMessage', (data: any)=>{
      if(this.userSelected !=-1 && (data.userSenderid == this.userMe.id || data.userReceiverid == this.userMe.id)){
        this.selectUser(this.userSelected);
      }
    });
  }

  retrieveData(){
    this.usersService.getUserByToken().subscribe({
      next: (userMe: UserResponse) => {
        this.userMe = userMe;
        this.usersLoaded = true;
      }
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#e0ecf4';

    document.getElementById("input")!
      .addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.key == "Enter" && !e.shiftKey) {
          document.getElementById("button")!.click();
        }
      });
    document.getElementById("input")!.addEventListener("keydown", (e)=>{
      if(e.key == "Enter" && !e.shiftKey){
        e.preventDefault();
      }
    });
  }

  selectUser(id: number){
    this.userSelected = id;
    this.messagesService.getByUserSenderIdAndUserReceiverId(this.userMe.id, id).subscribe({
      next: (messages: Message[]) => {
        this.messages = (messages.sort((a, b) => {
          return a.id - b.id;
        }));
        for(let message of this.messages){
          message.createdAt = formatDate(message.createdAt, "MMMM d, 'at' h:mm a", 'en-US');
        }
      }
    });
  }

  sendMessage(){
    if(this.message.length <= 0){
      return;
    }
    if(this.userSelected === -1){
      return;
    }
    this.messageCreate.userSenderid = this.userMe.id;
    this.messageCreate.userReceiverid = this.userSelected;
    this.messageCreate.content = this.message;
    this.messagesService.create(this.messageCreate).subscribe({
      next: (response: Message) => {
        this.message = "";
        response.createdAt = formatDate(response.createdAt, "MMMM d, 'at' h:mm a", 'en-US');
        this.messages.push(response);
        this.socket.emit('addNewMessage', {
          userSenderid: this.userMe.id,
          userReceiverid: this.userSelected,
        });
      }
    });

  }

}
