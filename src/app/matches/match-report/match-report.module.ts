import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatchReportPageRoutingModule } from './match-report-routing.module';
import { MatchReportPage } from './match-report.page';
import { ComponentsModule } from '../../shared/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatchReportPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [MatchReportPage],
})
export class MatchReportPageModule {}
