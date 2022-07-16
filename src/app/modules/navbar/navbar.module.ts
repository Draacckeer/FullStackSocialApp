import {NgModule} from "@angular/core";
import {NavbarComponent} from "./navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

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
        CommonModule

    ],
})

export class NavbarModule
{
}
