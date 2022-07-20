import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {NgModule} from "@angular/core";
import {NavbarModule} from "../navbar/navbar.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatListModule} from "@angular/material/list";

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
        MatTabsModule,
        MatCardModule,
        CommonModule,
        MatGridListModule,
        FontAwesomeModule,
        MatButtonModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatListModule,
    ]
})

export class ProfileModule
{
}
