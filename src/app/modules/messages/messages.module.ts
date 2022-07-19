import {RouterModule, Routes} from "@angular/router";
import {MessagesComponent} from "./messages.component";
import {NgModule} from "@angular/core";
import {NavbarModule} from "../navbar/navbar.module";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

const messagesRoutes: Routes = [
  {
    path: '',
    component: MessagesComponent
  }
]

@NgModule({
  declarations: [
    MessagesComponent,
  ],
  imports: [
    RouterModule.forChild(messagesRoutes),
    NavbarModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
  ]
})

export class MessagesModule
{
}
