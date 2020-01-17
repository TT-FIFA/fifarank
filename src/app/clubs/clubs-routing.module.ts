import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubsPage } from './clubs.page';
import { ClubDetailsComponent } from './club-details/club-details.component';

const routes: Routes = [
  {
    path: '',
    component: ClubsPage,
  },
  {
    path: ':/:clubId',
    component: ClubDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubsPageRoutingModule {}
