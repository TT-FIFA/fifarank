import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersPage } from './players.page';

const routes: Routes = [
  {
    path: '',
    component: PlayersPage,
  },
  {
    path: ':playerId',
    loadChildren: () =>
      import('./player-details/player-details.module').then(
        m => m.PlayerDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersPageRoutingModule {}
