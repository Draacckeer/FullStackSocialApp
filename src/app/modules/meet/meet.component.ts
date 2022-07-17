import {Component, OnInit} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user";
import {UserPublication} from "../../models/userPublication";
import {UserResponse} from "../../models/userResponse";

interface UserResponseExtends extends UserResponse {
  isLiked: boolean;
}

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})

export class MeetComponent implements OnInit {
  userMe: UserResponse = {} as UserResponse;
  users: UserResponseExtends[] = [] as UserResponseExtends[];
  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUserByToken().subscribe({
      next: (response: UserResponse) => {
        this.userMe = response;
        this.usersService.getAllUsers().subscribe({
          next: (response2: UserResponse[]) => {
            this.usersService.getUserByToken().subscribe({
              next: (response3: UserResponse) => {
                response2 = response2.filter(user => user.id !== response3.id);
                Object.assign(this.users, response2);
                this.users.forEach(user => {
                  user.isLiked = !!this.userMe.userLikes.find(like => like.id === user.id);
                });
              }
            })
          }
        })
      }
    })

  }

  likeUser(id: number) {
    this.usersService.likeUserIdByToken(id).subscribe({
      next: (response: any) => {
        console.log(response);

      }
    })
  }

}
