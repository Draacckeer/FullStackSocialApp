import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {UserResponse} from "../../models/userResponse";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {faUserMinus} from "@fortawesome/free-solid-svg-icons";

interface UserResponseExtends extends Omit<UserResponse, 'userFriends'> {
  userFriends: {
    id: number;
    username: string;
    email: string;
    avatar: string;
    likes: number;
    isLiked: boolean;
  }[]
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, AfterViewInit{
  faHeart = faHeart;
  faUserMinus = faUserMinus;
  userMe: UserResponseExtends = {} as UserResponseExtends;
  userServiceLoaded: boolean = false;
  constructor(private usersService: UsersService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.usersService.getUserByToken().subscribe({
      next: (response: UserResponse) => {
        this.userMe = Object.assign(this.userMe, response);
        for(let friend of this.userMe.userFriends) {
          friend.isLiked = !!this.userMe.userLikes.find(like => like.id === friend.id);
        }
        this.userServiceLoaded = true;
      }
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#f0f2f5';
  }

  likeUser(id: number, user: any) {
    if (!user.isLiked) {
      this.usersService.likeUserIdByToken(id).subscribe({
        next: () => {
          document.getElementById("faHeartIcon" + id)!.children[0].classList.add("fa-beat");
          user.isLiked = true;
          user.likes++;
        }
      })
    }
    else if(user.isLiked) {
      this.usersService.unlikeUserIdByToken(id).subscribe({
        next: () => {
          document.getElementById("faHeartIcon" + id)!.children[0].classList.remove("fa-beat");
          user.isLiked = false;
          user.likes--;
        }
      })
    }
  }

  removeFriend(id: number, user: any) {
    this.usersService.unfriendByToken(id).subscribe({
      next: () => {
        this.userMe.userFriends = this.userMe.userFriends.filter(friend => friend.id !== id);
      }
    })
  }
}
