import { Routes } from '@angular/router';

export const iamRoutes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./views/welcome/welcome.component').then((m) => m.WelcomeComponent),
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./views/sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./views/sign-up/sign-up.component').then((m) => m.SignUpComponent),
  },
  {
    path: 'recover-password',
    loadComponent: () =>
      import('./views/recover-password/recover-password.component').then(
        (m) => m.RecoverPasswordComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
];
