import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { UserChartsComponent } from './user-charts/user-charts.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    canActivate:[AuthGuard]
   }
];

export const DashboardRoutes = RouterModule.forChild(routes);
