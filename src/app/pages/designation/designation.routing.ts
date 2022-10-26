import { Routes, RouterModule } from '@angular/router';
import { DesignationComponent } from './designation.component';

const routes: Routes = [
  { path:'',component:DesignationComponent },
];

export const DesignationRoutes = RouterModule.forChild(routes);
