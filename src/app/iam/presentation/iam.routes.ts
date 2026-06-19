import { Routes } from '@angular/router';

const signIn         = () => import('./views/sign-in/sign-in.component').then(m => m.SignInComponent);
const signUp         = () => import('./views/sign-up/sign-up.component').then(m => m.SignUpComponent);
const recoverPw      = () => import('./views/recover-password/recover-password.component').then(m => m.RecoverPasswordComponent);
const selectAccount  = () => import('./views/select-account/select-account.component').then(m => m.SelectAccountComponent);

export const iamRoutes: Routes = [
  { path: 'sign-in',          loadComponent: signIn         },
  { path: 'sign-up',          loadComponent: signUp         },
  { path: 'recover-password', loadComponent: recoverPw      },
  { path: 'select-account',   loadComponent: selectAccount  },
  { path: '',                 redirectTo: 'sign-in', pathMatch: 'full' },
];
