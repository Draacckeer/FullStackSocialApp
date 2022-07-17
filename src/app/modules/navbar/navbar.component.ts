import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {UserPublication} from "../../models/userPublication";
import {UserResponse} from "../../models/userResponse";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  user: UserResponse = {} as UserResponse;

  constructor(private route: Router , private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUserByToken().subscribe({
      next: (response: UserResponse) => {
        this.user = response;
      }
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }
}
