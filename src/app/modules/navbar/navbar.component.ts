import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent{
  constructor(private route: Router) {
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }
}
