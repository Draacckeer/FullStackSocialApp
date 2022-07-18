import {Route} from '@angular/router';

export const appRoutes: Route[] = [

  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  { path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)},
  { path: 'publications', loadChildren: () => import('./modules/publications/publications.module').then(m => m.PublicationsModule)},
  { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)},
  { path: 'meet', loadChildren: () => import('./modules/meet/meet.module').then(m => m.MeetModule)},
  { path: 'messages', loadChildren: () => import('./modules/messages/messages.module').then(m => m.MessagesModule)},

];
