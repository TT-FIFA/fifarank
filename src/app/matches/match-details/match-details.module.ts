import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatchDetailsPageRoutingModule } from './match-details-routing.module';
import { MatchDetailsPage } from './match-details.page';
import { ComponentsModule } from '../../shared/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MatchDetailsPageRoutingModule, ComponentsModule],
  declarations: [MatchDetailsPage]
})
export class MatchDetailsPageModule {}
