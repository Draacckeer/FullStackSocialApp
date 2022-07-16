import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {UserPublication} from "../../models/userPublication";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  user: UserPublication = {} as UserPublication;

  constructor(private route: Router , private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUserPublicationByToken().subscribe({
      next: (response: UserPublication) => {
        this.user = response;
      }
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }
}
