import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'players',
    children: [
      {
        path: '',
        loadChildren: () => import('./players/player-list/player-list.module').then( m => m.PlayerListPageModule),
      },
      {
        path: ':playerId',
        loadChildren: () => import('./players/player-details/player-details.module').then( m => m.PlayerDetailsPageModule)
      }
    ]
  },
  {
    path: 'matches',
    children: [
      {
        path: '',
        loadChildren: () => import('./matches/match-list/match-list.module').then( m => m.MatchListPageModule)
      },
      {
        path: ':matchId',
        loadChildren: () => import('./matches/match-details/match-details.module').then( m => m.MatchDetailsPageModule)
      }
    ]
  },
  { path: 'match-report',
    loadChildren: () => import('./matches/match-report/match-report.module').then( m => m.MatchReportPageModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
