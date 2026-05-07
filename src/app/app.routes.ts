import { Routes } from '@angular/router';
import { Home } from './features/dashboard/pages/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-routing-module').then((r) => r.AuthRoutingModule),
  },

  {
    path: 'dashboard',

    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((r) => r.DASHBOARD_ROUTES),
  },
];
