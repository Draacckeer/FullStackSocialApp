import {Route} from '@angular/router';

export const appRoutes: Route[] = [

  { path: '', loadChildren: () => import('./modules/auth/home/home.module').then(m => m.HomeModule)},
  { path: 'register', loadChildren: () => import('./modules/auth/register/register.module').then(m => m.RegisterModule)},
  { path: 'publications', loadChildren: () => import('./modules/admin/pages/publications/publications.module').then(m => m.PublicationsModule)},
  { path: 'profile', loadChildren: () => import('./modules/admin/pages/profile/profile.module').then(m => m.ProfileModule)},
  { path: 'meet', loadChildren: () => import('./modules/admin/pages/meet/meet.module').then(m => m.MeetModule)},
  { path: 'messages', loadChildren: () => import('./modules/admin/pages/messages/messages.module').then(m => m.MessagesModule)},

];
