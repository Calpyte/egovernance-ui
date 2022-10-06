import { Routes, RouterModule } from '@angular/router';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityComponent } from './activity.component';

const routes: Routes = [
  { path:'',component:ActivityComponent},
];

export const ActivityRoutes = RouterModule.forChild(routes);
