import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "country",
    loadChildren: () =>
      import("../location/country/country.module").then((m) => m.CountryModule),
  },
];

export const LocationRoutes = RouterModule.forChild(routes);
