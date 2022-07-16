import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {NgModule} from "@angular/core";
import {NavbarModule} from "../navbar/navbar.module";

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
]

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    RouterModule.forChild(profileRoutes),
    NavbarModule,
  ]
})

export class ProfileModule
{
}
