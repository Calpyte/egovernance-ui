import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { CommonSharedModule } from '../../common-shared/common-shared.module';
import { LocationRoutes } from './location.routing';
import { DistrictAddComponent } from './district/district-add/district-add.component';
import { DistrictListComponent } from './district/district-list/district-list.component';
import { StateAddComponent } from './state/state-add/state-add.component';
import { StateListComponent } from './state/state-list/state-list.component';
import { TalukAddComponent } from './taluk/taluk-add/taluk-add.component';
import { TalukListComponent } from './taluk/taluk-list/taluk-list.component';
import { VillageAddComponent } from './village/village-add/village-add.component';
import { VillageListComponent } from './village/village-list/village-list.component';

@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    LocationRoutes,

  ],
  declarations: [
    LocationComponent,
    DistrictAddComponent,
    DistrictListComponent,
    StateAddComponent,
    StateListComponent,
    TalukAddComponent,
    TalukListComponent,
    VillageAddComponent,
    VillageListComponent
  ]
})
export class LocationModule { }
