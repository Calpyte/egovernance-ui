import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { OfficeContainerComponent } from './office-container/office-container.component';

const routes: Routes = [
  { path: '', component: OfficeContainerComponent, canActivate:[AuthGuard]},
];

export const OfficeRoutes = RouterModule.forChild(routes);
