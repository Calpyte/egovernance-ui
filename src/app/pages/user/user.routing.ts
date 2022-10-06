import { Routes, RouterModule } from '@angular/router';
import { UserContainerComponent } from './user-container/user-container.component';

const routes: Routes = [
  { path: '', component: UserContainerComponent},
];

export const UserRoutes = RouterModule.forChild(routes);
