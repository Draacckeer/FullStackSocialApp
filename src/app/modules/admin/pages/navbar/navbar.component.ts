import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UsersService} from "../../../../services/users.service";
import {UserResponse} from "../../../../models/userResponse";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faMessage} from "@fortawesome/free-solid-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {BreakpointObserver} from "@angular/cdk/layout";
import io from "socket.io-client";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})

export class NavbarComponent implements OnInit {
  socket: any;
  userNotifications: number = -1;
  initialDataLoaded: boolean = false;
  isScreenSmall: boolean = false;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faHouse = faHouse;
  faUsers = faUsers;
  faBell = faBell;
  faUser = faUser;
  faMessage = faMessage;
  faBars = faBars;
  user: UserResponse = {} as UserResponse;
  userRequests: UserResponse[] = [] as UserResponse[];
  routeString: string = '';

  constructor(private router: Router , private usersService: UsersService,
              private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      '(max-width: 576px)'
    ]).subscribe(result => {
      this.isScreenSmall = result.matches;
    });
    this.routeString = this.router.url;
  }

  ngOnInit() {
    this.retrieveData();
    this.socket = io('https://fullstacksocialappsocket-nodejs.onrender.com/');
    this.socket.on('notification', (data: any) => {
      if(this.user.id === data){
        this.retrieveData();
      }
    });
  }

  retrieveData(){
    this.usersService.getUserByToken().subscribe({
      next: (response: UserResponse) => {
        this.user = response;
        this.initialDataLoaded = true;
        this.userNotifications = this.user.userRequestOfFriends.length;
      },
      error: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    })
  }

  acceptFriendRequest(id: number){
    this.usersService.acceptFriendByToken(id).subscribe({
      next: () => {
        this.user.userRequestOfFriends = this.user.userRequestOfFriends.filter(user => user.id !== id);
        this.userNotifications = this.user.userRequestOfFriends.length;
      }
    })
  }

  rejectFriendRequest(id: number){
    this.usersService.rejectFriendByToken(id).subscribe({
      next: () => {
        this.user.userRequestOfFriends = this.user.userRequestOfFriends.filter(user => user.id !== id);
        this.userNotifications = this.user.userRequestOfFriends.length;
      }
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
