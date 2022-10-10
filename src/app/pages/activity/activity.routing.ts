import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { ActivityComponent } from './activity.component';

const routes: Routes = [
  { path:'',component:ActivityComponent, canActivate:[AuthGuard]},
];

export const ActivityRoutes = RouterModule.forChild(routes);
