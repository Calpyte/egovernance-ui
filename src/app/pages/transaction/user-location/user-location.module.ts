import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLocationComponent } from './user-location.component';
import { CommonSharedModule } from '../../../common-shared/common-shared.module';
import { UserLocationRoutes } from './user-location.routing';
import { AgmCoreModule} from '@agm/core'
import { NbCardModule } from '@nebular/theme';


@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    UserLocationRoutes,
    NbCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM',
      language: "en",
    })
  ],
  declarations: [UserLocationComponent]
})
export class UserLocationModule { }
