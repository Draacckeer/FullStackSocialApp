import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import {Message} from "../../models/message";
import {UserResponse} from "../../models/userResponse";
import {UsersService} from "../../services/users.service";
import {MessagesService} from "../../services/messages.service";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit, AfterViewInit {
  userSelected: number = 0;
  userMe: UserResponse = {} as UserResponse;
  messages: Message[] = [] as Message[];

  constructor(private elementRef: ElementRef,
              private usersService: UsersService,
              private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.retrieveData();
  }

  retrieveData(){
    this.usersService.getUserByToken().subscribe({
      next: (userMe: UserResponse) => {
        this.userMe = userMe;
      }
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#c0deed';
  }

  test(){
    console.log(this.messages);
  }

  selectUser(id: number){
    this.userSelected = id;
    this.messagesService.getByUserSenderIdAndUserReceiverId(this.userMe.id, id).subscribe({
      next: (messages: Message[]) => {
        this.messages = (messages.sort((a, b) => {
          return a.id - b.id;
        }));
      }
    });
  }

}
