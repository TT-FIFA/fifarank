import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayersPageRoutingModule } from './players-routing.module';
import { PlayersPage } from './players.page';
import { PlayerListPage } from './player-list/player-list.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PlayersPageRoutingModule],
  declarations: [PlayersPage, PlayerListPage]
})
export class PlayersPageModule {}
