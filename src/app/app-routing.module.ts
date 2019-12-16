import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule) },
  {
    path: 'players',
    children: [
      {
        path: '',
        loadChildren: () => import('./players/player-list/player-list.module').then(m => m.PlayerListPageModule)
      },
      {
        path: ':playerId',
        loadChildren: () =>
          import('./players/player-details/player-details.module').then(m => m.PlayerDetailsPageModule)
      }
    ]
  },
  {
    path: 'matches',
    children: [
      {
        path: '',
        loadChildren: () => import('./matches/matches.module').then(m => m.MatchesPageModule)
      },
      {
        path: ':matchId',
        loadChildren: () => import('./matches/match-details/match-details.module').then(m => m.MatchDetailsPageModule)
      }
    ]
  },
  {
    path: 'match-report',
    loadChildren: () => import('./matches/match-report/match-report.module').then(m => m.MatchReportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
