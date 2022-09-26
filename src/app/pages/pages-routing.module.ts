import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'master',
      loadChildren: () => import('../pages/master/master.module')
        .then(m => m.MasterModule),
    },
    {
      path: "location",
      loadChildren: () => import('../pages/location/location.module')
      .then(m => m.LocationModule),
    },
    {
      path: 'transaction',
      loadChildren: () => import('../pages/transaction/transaction.module')
        .then(m => m.TransactionModule),
    },
    {
      path: 'dashboard',
      loadChildren: () => import('../pages/dashboard/dashboard.module')
        .then(m => m.DashboardModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
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
