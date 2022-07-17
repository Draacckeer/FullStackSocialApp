import {RouterModule, Routes} from "@angular/router";
import {MeetComponent} from "./meet.component";
import {NgModule} from "@angular/core";
import {NavbarModule} from "../navbar/navbar.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const meetRoutes: Routes = [
  {
    path: '',
    component: MeetComponent
  }
]

@NgModule({
  declarations: [
    MeetComponent,
  ],
  imports: [
    RouterModule.forChild(meetRoutes),
    NavbarModule,
    MatGridListModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
  ]
})

export class MeetModule
{
}
