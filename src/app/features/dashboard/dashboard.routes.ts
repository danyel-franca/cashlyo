import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { Home } from './pages/home/home';

export const DASHBOARD_ROUTES: Routes = [

  {
    path: '',
    component: MainLayoutComponent,

    children: [

      {
        path: '',
        component: Home
      }

    ]
  }

];
