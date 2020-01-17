import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClubsPageRoutingModule } from './clubs-routing.module';
import { ClubsPage } from './clubs.page';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubDetailsComponent } from './club-details/club-details.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ClubsPageRoutingModule],
  declarations: [ClubsPage, ClubListComponent, ClubDetailsComponent],
})
export class ClubsPageModule {}
