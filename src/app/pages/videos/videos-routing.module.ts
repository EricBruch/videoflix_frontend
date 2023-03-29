import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details';
import { ListeComponent } from './liste/liste.component';

const routes: Routes = [
  { path: '', component: ListeComponent },
  { path: 'liste', component: ListeComponent },
  { path: ':id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosRoutingModule {}
