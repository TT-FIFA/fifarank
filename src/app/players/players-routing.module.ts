import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListPage } from './player-list/player-list.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerListPage
  },
  {
    path: ':playerId',
    loadChildren: () => import('./player-details/player-details.module').then(m => m.PlayerDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersPageRoutingModule {}
