import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {UserResponse} from "../../models/userResponse";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faMessage} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  faArrowRightFromBracket = faArrowRightFromBracket;
  faHouse = faHouse;
  faUsers = faUsers;
  faBell = faBell;
  faUser = faUser;
  faMessage = faMessage;
  user: UserResponse = {} as UserResponse;
  userRequests: UserResponse[] = [] as UserResponse[];

  constructor(private route: Router , private usersService: UsersService) {
  }

  ngOnInit() {
    this.retrieveData();

  }

  retrieveData(){
    this.usersService.getUserByToken().subscribe({
      next: (response: UserResponse) => {
        this.user = response;
      }
    })
  }

  acceptFriendRequest(id: number){
    this.usersService.acceptFriendByToken(id).subscribe({
      next: () => {
        this.user.userRequestOfFriends = this.user.userRequestOfFriends.filter(user => user.id !== id);
      }
    })
  }

  rejectFriendRequest(id: number){
    this.usersService.rejectFriendByToken(id).subscribe({
      next: () => {
        this.user.userRequestOfFriends = this.user.userRequestOfFriends.filter(user => user.id !== id);
      }
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }
}
