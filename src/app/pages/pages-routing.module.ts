import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../guard/auth.guard';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [

    {
      path: 'dashboard',
      loadChildren: () => import('../pages/dashboard/dashboard.module')
        .then(m => m.DashboardModule)
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'department',
      canActivate:[AuthGuard],
      loadChildren: () => import('../pages/department/department.module')
        .then(m => m.DepartmentModule)
    },
    {
      path: 'designation',
      canActivate:[AuthGuard],
      loadChildren: () => import('../pages/designation/designation.module')
        .then(m => m.DesignationModule)
    },
    {
      path: 'role',
      canActivate:[AuthGuard],
      loadChildren: () => import('../pages/role/role.module')
        .then(m => m.RoleModule)
    },
    {
      path: 'user',
      canActivate:[AuthGuard],
      loadChildren: () => import('../pages/user/user.module')
        .then(m => m.UserModule)
    },
    {
      path: 'office',
      canActivate:[AuthGuard],
      loadChildren: () => import('../pages/office/office.module')
        .then(m => m.OfficeModule)
    },
    {
      path: 'activity',
      canActivate:[AuthGuard],
      loadChildren: () => import('../pages/activity/activity.module')
        .then(m => m.ActivityModule)
    },
     {
      path: 'officer',
      canActivate:[AuthGuard],
      loadChildren: () => import('../pages/officer/officer.module')
        .then(m => m.OfficerModule)
    },
    {
      path: 'location',
      canActivate:[AuthGuard],
      loadChildren: () => import('../pages/location/location.module')
        .then(m => m.LocationModule)
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
  providers:[AuthGuard]
})
export class PagesRoutingModule {
}
