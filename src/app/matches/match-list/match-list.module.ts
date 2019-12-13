import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatchListPageRoutingModule } from './match-list-routing.module';
import { MatchListPage } from './match-list.page';
import { MatchItemComponent } from '../match-item/match-item.component';
import { ComponentsModule } from '../../shared/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MatchListPage
      }
    ]),
    MatchListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MatchListPage, MatchItemComponent]
})
export class MatchListPageModule {}
