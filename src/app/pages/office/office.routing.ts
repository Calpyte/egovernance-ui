import { Routes, RouterModule } from '@angular/router';
import { OfficeContainerComponent } from './office-container/office-container.component';

const routes: Routes = [
  { path: '', component: OfficeContainerComponent},
];

export const OfficeRoutes = RouterModule.forChild(routes);
