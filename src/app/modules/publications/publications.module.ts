import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {PublicationsComponent} from "./publications.component";
import {NavbarModule} from "../navbar/navbar.module";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";


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
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ]
})

export class PublicationsModule
{
}
