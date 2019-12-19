import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatchViewPageRoutingModule } from './match-view-routing.module';
import { MatchViewPage } from './match-view.page';
import { ComponentsModule } from '../../shared/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatchViewPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MatchViewPage]
})
export class MatchViewPageModule {}
