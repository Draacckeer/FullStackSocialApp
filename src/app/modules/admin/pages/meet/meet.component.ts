import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {UsersService} from "../../../../services/users.service";
import {UserResponse} from "../../../../models/userResponse";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {ToastrService} from "ngx-toastr";
import io from "socket.io-client";

interface UserResponseExtends extends UserResponse {
  isLiked: boolean;
  hasRequested: boolean;
  isFriend: boolean;
}

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})

export class MeetComponent implements OnInit {
  usersLoaded: boolean = false;
  socket: any;
  faHeart = faHeart;
  faUserPlus = faUserPlus;
  faUserGroup = faUserGroup;
  userMe: UserResponse = {} as UserResponse;
  users: UserResponseExtends[] = [] as UserResponseExtends[];
  constructor(private usersService: UsersService,
              private elementRef: ElementRef,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.retrieveAll();
    this.socket = io('https://fullstacksocialappsocket-nodejs.onrender.com/');
  }

  onError(event: Event) {
  (event.target as HTMLImageElement).src = '/FullStackSocialApp/assets/img/avatar.png';
 }

  retrieveAll(){
    this.usersService.getUserByToken().subscribe({
      next: (response: UserResponse) => {
        this.userMe = response;
        this.usersService.getAllUsers().subscribe({
          next: (response2: UserResponse[]) => {
            response2 = response2.filter(user => user.id !== response.id);
            Object.assign(this.users, response2);
            this.users.forEach(user => {
              user.isLiked = !!this.userMe.userLikes.find(like => like.id === user.id);
              user.hasRequested = !!this.userMe.userRequestFriends.find(request => request.id === user.id);
              user.isFriend = !!this.userMe.userFriends.find(friend => friend.id === user.id);
            });
            this.usersLoaded = true;
          }
        })
      }
    })
  }

  likeUser(id: number, user: UserResponseExtends) {
    if (!user.isLiked) {
      this.usersService.likeUserIdByToken(id).subscribe({
        next: () => {
          document.getElementById("faHeartIcon" + id)!.children[0].classList.add("fa-beat");
          document.getElementById("faHeartIcon" + id)!.children[0].classList.remove("fa-bounce");
          user.isLiked = true;
          user.likes++;
        }
      })
    }
    else if(user.isLiked) {
      this.usersService.unlikeUserIdByToken(id).subscribe({
        next: () => {
          document.getElementById("faHeartIcon" + id)!.children[0].classList.remove("fa-beat");
          document.getElementById("faHeartIcon" + id)!.children[0].classList.add("fa-bounce");
          user.isLiked = false;
          user.likes--;
        }
      })
    }
  }

  requestFriend(id: number, user: UserResponseExtends) {
    if(user.isFriend){
      this.toastr.error("You are already friends with this user", "Error");
      return;
    }
    for(let userRequestFriend of user.userRequestFriends){
      if(userRequestFriend.id === this.userMe.id){
        this.toastr.error("This user has already requested to be your friend (go to notifications)", "Error");
        return;
      }
    }
    if (!user.hasRequested) {
      this.usersService.requestFriendByToken(id).subscribe({
        next: () => {
          user.hasRequested = true;
          document.getElementById("faUserIcon" + id)!.children[0].classList.add("fa-beat");
          document.getElementById("faUserIcon" + id)!.children[0].classList.remove("fa-bounce");
          this.socket.emit('notification', id);
        }
      })
    }
    else if(user.hasRequested) {
      this.usersService.unrequestFriendByToken(id).subscribe({
        next: () => {
          user.hasRequested = false;
          document.getElementById("faUserIcon" + id)!.children[0].classList.remove("fa-beat");
          document.getElementById("faUserIcon" + id)!.children[0].classList.add("fa-bounce");
          this.socket.emit('notification', id);
        }
      })
    }
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#e0ecf4';
  }

}
