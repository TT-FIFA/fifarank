import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClubsPageRoutingModule } from './clubs-routing.module';
import { ClubsPage } from './clubs.page';
import { ClubListComponent } from './club-list/club-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ClubsPageRoutingModule],
  declarations: [ClubsPage, ClubListComponent],
})
export class ClubsPageModule {}
