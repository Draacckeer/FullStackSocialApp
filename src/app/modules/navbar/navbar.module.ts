import {NgModule} from "@angular/core";
import {NavbarComponent} from "./navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    MatMenuModule

  ],
})

export class NavbarModule
{
}
