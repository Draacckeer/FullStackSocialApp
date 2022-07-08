import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {PublicationsComponent} from "./publications.component";
import {NavbarModule} from "../navbar/navbar.module";


const publicationsRoutes: Route[] = [
  {
    path: '',
    component: PublicationsComponent
  }
]

@NgModule({
  declarations: [
    PublicationsComponent,
  ],
  imports: [
    RouterModule.forChild(publicationsRoutes),
    NavbarModule,
  ]
})

export class PublicationsModule
{
}
