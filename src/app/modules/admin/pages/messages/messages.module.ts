import {RouterModule, Routes} from "@angular/router";
import {MessagesComponent} from "./messages.component";
import {NgModule} from "@angular/core";
import {NavbarModule} from "../navbar/navbar.module";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {TextFieldModule} from "@angular/cdk/text-field";
import {FormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";

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
        MatListModule,
        TextFieldModule,
        FormsModule,
        MatProgressBarModule,
    ]
})

export class MessagesModule
{
}
