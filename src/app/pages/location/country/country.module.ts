import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './country.component';
import { CommonSharedModule } from '../../../common-shared/common-shared.module';
import { NbCardModule } from '@nebular/theme';
import { LocationRoutes } from '../location.routing';
import { CountryAddComponent } from './country-add/country-add.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryRoutes } from './country.routing';

@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    NbCardModule,
    CountryRoutes
  ],
  declarations: [
    CountryComponent,
    CountryAddComponent,
    CountryListComponent
  ],
  // entryComponents: [CountryAddComponent]
})
export class CountryModule { }
