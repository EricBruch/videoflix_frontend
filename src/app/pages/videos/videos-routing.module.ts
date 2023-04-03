import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent as DetailsPageComponent } from './details';
import { PageComponent as ListPageComponent } from './liste/page.component';

const routes: Routes = [
  { path: '', component: ListPageComponent },
  { path: 'liste', component: ListPageComponent },
  { path: ':id', component: DetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosRoutingModule {}
