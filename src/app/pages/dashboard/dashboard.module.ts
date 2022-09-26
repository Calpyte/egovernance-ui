import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';
import { CommonSharedModule } from '../../common-shared/common-shared.module';
import { UserChartsComponent } from './user-charts/user-charts.component';
import { DashboardComponent } from './dashboard.component';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutes,
    CommonSharedModule,
    NbCardModule
  ],
  declarations: [UserChartsComponent,DashboardComponent]
})
export class DashboardModule { }
