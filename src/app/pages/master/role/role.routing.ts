import { Routes, RouterModule } from '@angular/router';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleComponent } from './role.component';

const routes: Routes = [
  {
    path: "",
    component: RoleComponent,
  },
  {
    path: "add",
    component: RoleAddComponent,
  },
];

export const RoleRoutes = RouterModule.forChild(routes);
