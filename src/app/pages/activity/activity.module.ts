import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityRoutes } from './activity.routing';
import { CommonSharedModule } from '../../common-shared/common-shared.module';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutes,
    CommonSharedModule
  ],
  declarations: [ActivityComponent,ActivityListComponent,ActivityDetailComponent],
  providers:[ActivityDetailComponent]
})
export class ActivityModule { }
