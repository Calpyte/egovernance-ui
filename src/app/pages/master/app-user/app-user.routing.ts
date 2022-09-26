import { Routes, RouterModule } from '@angular/router';
import { AppUserAddComponent } from './app-user-add/app-user-add.component';
import { AppUserComponent } from './app-user.component';

const routes: Routes = [
  {
    path: "",
    component: AppUserComponent,
  },
  {
    path: "add",
    component: AppUserAddComponent,
  },
  {
    path: "edit/:id",
    component: AppUserAddComponent,
  },
];

export const AppUserRoutes = RouterModule.forChild(routes);
