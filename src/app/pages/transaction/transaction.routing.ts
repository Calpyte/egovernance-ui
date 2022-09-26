import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "coordinates-txn",
    loadChildren: () =>
      import("../transaction/coordinates-txn/coordinates-txn.module").then((m) => m.CoordinatesTxnModule),
  },
  {
    path: "user-location",
    loadChildren: () =>
      import("../transaction/user-location/user-location.module").then((m) => m.UserLocationModule),
  },
];

export const TransactionRoutes = RouterModule.forChild(routes);
