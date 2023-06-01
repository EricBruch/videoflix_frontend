import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: 'impressum',
    title: 'impressum',
    loadComponent: () =>
      import('./pages/impressum/impressum.component').then(
        (mod) => mod.ImpressumComponent
      ),
  },
  {
    path: 'data-privacy',
    title: 'data-privacy',
    loadComponent: () =>
      import(
        './pages/datenschutzerklaerung/datenschutzerklaerung.component'
      ).then((mod) => mod.DatenschutzerklaerungComponent),
  },
  {
    path: 'home',
    title: 'home',
    loadComponent: () =>
      import('./pages/home/page.component').then((mod) => mod.PageComponent),
  },
  {
    path: 'login',
    title: 'login',
    loadComponent: () =>
      import('./pages/login/page.component').then((mod) => mod.PageComponent),
  },
  {
    path: 'password',
    title: 'password',
    loadComponent: () =>
      import('./pages/password/page.component').then(
        (mod) => mod.PageComponent
      ),
  },
  {
    path: 'register',
    title: 'register',
    loadComponent: () =>
      import('./pages/register/page.component').then(
        (mod) => mod.PageComponent
      ),
  },
  {
    path: 'videos',
    title: 'videos',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/videos/videos-routing.module').then(
        (mod) => mod.VideosRoutingModule
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/home/page.component').then((mod) => mod.PageComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
