import { Routes, RouterModule } from '@angular/router';
import { CoordinatesTxnComponent } from './coordinates-txn.component';

const routes: Routes = [
  { path:"",component:CoordinatesTxnComponent},
];

export const CoordinatesTxnRoutes = RouterModule.forChild(routes);
