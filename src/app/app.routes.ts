import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { noAuthGuard } from './no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canActivate: [noAuthGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup.component').then(
        (c) => c.SignupComponent
      ),
      canActivate: [noAuthGuard],
  },
  {
    path: 'book-list',
    loadComponent: () =>
      import('./components/book-list/book-list.component').then(
        (m) => m.BookListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'books/new',
    loadComponent: () =>
      import('./components/book-new/book-new.component').then(
        (m) => m.BookNewComponent
      ),
    canActivate: [authGuard],
  },
];
