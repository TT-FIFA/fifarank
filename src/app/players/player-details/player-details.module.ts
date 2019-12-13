import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayerDetailsPageRoutingModule } from './player-details-routing.module';
import { PlayerDetailsPage } from './player-details.page';
import { ComponentsModule } from '../../shared/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PlayerDetailsPageRoutingModule, ComponentsModule],
  declarations: [PlayerDetailsPage]
})
export class PlayerDetailsPageModule {}
