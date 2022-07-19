import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {UserResponse} from "../../models/userResponse";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {faUserGroup} from "@fortawesome/free-solid-svg-icons";

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
  faHeart = faHeart;
  faUserPlus = faUserPlus;
  faUserGroup = faUserGroup;
  userMe: UserResponse = {} as UserResponse;
  users: UserResponseExtends[] = [] as UserResponseExtends[];
  constructor(private usersService: UsersService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.retrieveAll();
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
    if (!user.hasRequested) {
      this.usersService.requestFriendByToken(id).subscribe({
        next: () => {
          user.hasRequested = true;
          document.getElementById("faUserIcon" + id)!.children[0].classList.add("fa-beat");
          document.getElementById("faUserIcon" + id)!.children[0].classList.remove("fa-bounce");
        }
      })
    }
    else if(user.hasRequested) {
      this.usersService.unrequestFriendByToken(id).subscribe({
        next: () => {
          user.hasRequested = false;
          document.getElementById("faUserIcon" + id)!.children[0].classList.remove("fa-beat");
          document.getElementById("faUserIcon" + id)!.children[0].classList.add("fa-bounce");
        }
      })
    }
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#c0deed';
  }

}
