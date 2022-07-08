import {Route} from '@angular/router';

export const appRoutes: Route[] = [

  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  { path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)},
  { path: 'publications', loadChildren: () => import('./modules/publications/publications.module').then(m => m.PublicationsModule)},

];
