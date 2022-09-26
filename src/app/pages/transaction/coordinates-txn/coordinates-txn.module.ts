import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatesTxnComponent } from './coordinates-txn.component';
import { CoordinatesTxnRoutes } from './coordinates-txn.routing';
import { CommonSharedModule } from '../../../common-shared/common-shared.module';
import { CoordinatesTxnListComponent } from './coordinates-txn-list/coordinates-txn-list.component';

@NgModule({
  imports: [
    CommonModule,
    CoordinatesTxnRoutes,
    CommonSharedModule
  ],
  declarations: [CoordinatesTxnComponent,CoordinatesTxnListComponent]
})
export class CoordinatesTxnModule { }
