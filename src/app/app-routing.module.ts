import {Route} from '@angular/router';
import {NoAuthGuard} from "./auth/guards/no-auth.guard";
import {AuthGuard} from "./auth/guards/auth.guard";

export const appRoutes: Route[] = [

  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    children:[
      { path: '', loadChildren: () => import('./modules/auth/home/home.module').then(m => m.HomeModule)},
      { path: 'register', loadChildren: () => import('./modules/auth/register/register.module').then(m => m.RegisterModule)},
    ]
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children:[
      { path: '', redirectTo: 'publications', pathMatch: 'full'},
      { path: 'publications', loadChildren: () => import('./modules/admin/pages/publications/publications.module').then(m => m.PublicationsModule)},
      { path: 'profile', loadChildren: () => import('./modules/admin/pages/profile/profile.module').then(m => m.ProfileModule)},
      { path: 'meet', loadChildren: () => import('./modules/admin/pages/meet/meet.module').then(m => m.MeetModule)},
      { path: 'messages', loadChildren: () => import('./modules/admin/pages/messages/messages.module').then(m => m.MessagesModule)},
    ]
  }
];
