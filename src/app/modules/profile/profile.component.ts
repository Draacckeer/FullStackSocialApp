import {Component, OnInit} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {UserResponse} from "../../models/userResponse";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  user: UserResponse = {} as UserResponse;
  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUserByToken().subscribe({
      next: (response: UserResponse) => {
        this.user = response;
      }
    })
  }
}
