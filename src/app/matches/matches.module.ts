import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatchesPageRoutingModule } from './matches-routing.module';
import { MatchesPage } from './matches.page';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchListItemComponent } from './match-list/match-list-item/match-list-item.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MatchesPageRoutingModule],
  declarations: [MatchesPage, MatchListComponent, MatchListItemComponent],
  exports: [MatchListComponent],
})
export class MatchesPageModule {}
