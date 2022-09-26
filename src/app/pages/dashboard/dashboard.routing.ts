import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserChartsComponent } from './user-charts/user-charts.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
   }
];

export const DashboardRoutes = RouterModule.forChild(routes);
