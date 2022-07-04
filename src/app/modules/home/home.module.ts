import {Route, RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {NgModule} from "@angular/core";

const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    RouterModule.forChild(homeRoutes),
  ]
})

export class HomeModule
{
}
