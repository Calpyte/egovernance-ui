import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VillageAddComponent } from './village/village-add/village-add.component';
import { CountryAddComponent } from './country/country-add/country-add.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { DistrictAddComponent } from './district/district-add/district-add.component';
import { DistrictListComponent } from './district/district-list/district-list.component';
import { StateAddComponent } from './state/state-add/state-add.component';
import { StateListComponent } from './state/state-list/state-list.component';
import { CommonSharedModule } from '../../common-shared/common-shared.module';
import { LocationRoutes } from './location.routing';
import { LocationComponent } from './location.component';
import { TalukListComponent } from './taluk/taluk-list/taluk-list.component';
import { VillageListComponent } from './village/village-list/village-list.component';
import { NbTabsetModule } from '@nebular/theme';
import { TalukAddComponent } from './taluk/taluk-add/taluk-add.component';

@NgModule({
  imports: [
    CommonModule,
    LocationRoutes,
    CommonSharedModule,
    NbTabsetModule

  ],
  declarations: [
    LocationComponent,
    TalukListComponent,
    TalukAddComponent,
    VillageListComponent,
    VillageAddComponent,
    DistrictListComponent,
    DistrictAddComponent,
    StateListComponent,
    StateAddComponent,
    CountryListComponent,
    CountryAddComponent ]
})
export class LocationModule { }
