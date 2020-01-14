import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayerDetailsPageRoutingModule } from './player-details-routing.module';
import { PlayerDetailsPage } from './player-details.page';
import { MatchesPageModule } from '../../matches/matches.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PlayerDetailsPageRoutingModule, MatchesPageModule],
  declarations: [PlayerDetailsPage]
})
export class PlayerDetailsPageModule {}
