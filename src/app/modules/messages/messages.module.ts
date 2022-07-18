import {RouterModule, Routes} from "@angular/router";
import {MessagesComponent} from "./messages.component";
import {NgModule} from "@angular/core";
import {NavbarModule} from "../navbar/navbar.module";

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
  ]
})

export class MessagesModule
{
}
