import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatchesPageRoutingModule } from './matches-routing.module';
import { MatchesPage } from './matches.page';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchListItemComponent } from './match-list/match-list-item/match-list-item.component';
import { ComponentsModule } from '../shared/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchesPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [MatchesPage, MatchListComponent, MatchListItemComponent],
  exports: [MatchListComponent],
})
export class MatchesPageModule {}
