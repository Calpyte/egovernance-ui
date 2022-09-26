import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutes } from './transaction.routing';
import { CoordinatesTxnModule } from './coordinates-txn/coordinates-txn.module';
import { UserLocationModule } from './user-location/user-location.module';

@NgModule({
  imports: [
    CommonModule,
    TransactionRoutes,
    CoordinatesTxnModule,
    UserLocationModule
  ],
  declarations: []
})
export class TransactionModule { }
