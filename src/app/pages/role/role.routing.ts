import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { RoleContainerComponent } from './role-container/role-container.component';

const routes: Routes = [
  { path:'', component:RoleContainerComponent,canActivate:[AuthGuard]}
];


export const RoleRoutes = RouterModule.forChild(routes);
