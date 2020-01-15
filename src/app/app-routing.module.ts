import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
  },
  {
    path: 'players',
    loadChildren: () =>
      import('./players/players.module').then(m => m.PlayersPageModule),
  },
  {
    path: 'matches',
    loadChildren: () =>
      import('./matches/matches.module').then(m => m.MatchesPageModule),
  },
  {
    path: 'match-report',
    loadChildren: () =>
      import('./matches/match-report/match-report.module').then(
        m => m.MatchReportPageModule
      ),
  },
  {
    path: 'clubs',
    loadChildren: () =>
      import('./clubs/clubs.module').then(m => m.ClubsPageModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        m => m.PageNotFoundPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
