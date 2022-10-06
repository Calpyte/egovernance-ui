import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [

    {
      path: 'dashboard',
      loadChildren: () => import('../pages/dashboard/dashboard.module')
        .then(m => m.DashboardModule)//,canActivate:[AdminGuard]
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'department',
      loadChildren: () => import('../pages/department/department.module')
        .then(m => m.DepartmentModule)//,canActivate:[AdminGuard]
    },
    {
      path: 'role',
      loadChildren: () => import('../pages/role/role.module')
        .then(m => m.RoleModule)
    },
    {
      path: 'user',
      loadChildren: () => import('../pages/user/user.module')
        .then(m => m.UserModule)
    },
    {
      path: 'office',
      loadChildren: () => import('../pages/office/office.module')
        .then(m => m.OfficeModule)
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
