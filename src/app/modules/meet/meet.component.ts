import {Component, OnInit} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user";
import {UserPublication} from "../../models/userPublication";

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})

export class MeetComponent implements OnInit {
  users: User[] = [] as User[];
  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe({
      next: (response: User[]) => {
        this.usersService.getUserPublicationByToken().subscribe({
          next: (response2: UserPublication) => {
            this.users = response.filter(user => user.id !== response2.id);
          }
        })
      }
    })
  }

}
