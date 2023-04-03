import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

const routes: Routes = [
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
