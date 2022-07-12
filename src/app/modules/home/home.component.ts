import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { ToastrService } from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent{
  userFormGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });
  constructor(private userService: UsersService, private toastr: ToastrService,
              private route: Router) {
  }

  login(){
    if(this.userFormGroup.valid) {
      this.userService.authenticateUser({
        username: this.userFormGroup.get('username')?.value,
        password: this.userFormGroup.get('password')?.value
      }).subscribe({
        next: (response: any) => {
          localStorage.setItem('token',response.token);
          this.toastr.success('You have successfully logged in', 'Success');
          this.route.navigate(['/publications']);
        },
        error: () => {
          this.toastr.error('Bad credentials', 'Error');
        }
      })
    }
    else{
      this.toastr.error('Please fill all the fields', 'Error');
    }
  }
}
