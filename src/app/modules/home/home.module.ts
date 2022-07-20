import {Route, RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {NgModule} from "@angular/core";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";

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
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        ReactiveFormsModule,
        MatProgressBarModule,
    ]
})

export class HomeModule
{
}
