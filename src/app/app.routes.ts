import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'landing',
    loadComponent: () => import('../app/landing/pages/landing.component'),
    children: [
      {
        title: 'Grid All Books',
        path: 'gridAllBooks',
        loadComponent: () =>
          import('../app/landing/pages/gridAllBooks/gridAllBooks.component'),
      },
      {
        path: '',
        redirectTo: 'gridAllBooks',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
];
