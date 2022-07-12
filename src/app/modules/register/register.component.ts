import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})

export class RegisterComponent{
  userFormGroup = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    email: new FormControl('',[Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(20)]),
  });

  constructor(private usersService: UsersService, private toastr: ToastrService,
              private route: Router) {
  }

  register(){
    this.usersService.registerUser({
      next: () => {

      }
    })
    if(this.userFormGroup.valid) {
      let role: string[] = ["ROLE_USER"];
      this.usersService.registerUser({
        username: this.userFormGroup.get('username')?.value,
        email: this.userFormGroup.get('email')?.value,
        password: this.userFormGroup.get('password')?.value,
        roles: role
      }).subscribe( {
        next: () => {
          this.usersService.authenticateUser({
            username: this.userFormGroup.get('username')?.value,
            password: this.userFormGroup.get('password')?.value
            }).subscribe({
              next: (response: any) => {
                localStorage.setItem('token',response.token);
                this.toastr.success('You have successfully registered');
                this.route.navigate(['/publications']);
              },
              error: () => {
                this.toastr.error('Something went wrong');
              }
          })
          console.log("User registered");
        },
        error: () => {
          this.toastr.error('Error while registering');
        }
      });
    }
    else{
      this.toastr.error('Please fill all the fields');
    }

  }
}
