import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchesPage } from './matches.page';

const routes: Routes = [
  {
    path: '',
    component: MatchesPage,
  },
  {
    path: ':matchId',
    loadChildren: () =>
      import('./match-details/match-details.module').then(
        m => m.MatchDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesPageRoutingModule {}
