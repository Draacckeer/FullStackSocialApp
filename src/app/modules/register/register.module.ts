import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {RegisterComponent} from "./register.component";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

const registerRoutes: Route[] = [
  {
    path: '',
    component: RegisterComponent
  }
]

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    RouterModule.forChild(registerRoutes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})

export class RegisterModule
{
}
