import { Routes, RouterModule } from '@angular/router';
import { UserLocationComponent } from './user-location.component';

const routes: Routes = [
  { path:'',component:UserLocationComponent },
];

export const UserLocationRoutes = RouterModule.forChild(routes);
