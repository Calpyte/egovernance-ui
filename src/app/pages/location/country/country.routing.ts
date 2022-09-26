import { Routes, RouterModule } from '@angular/router';
import { CountryAddComponent } from './country-add/country-add.component';
import { CountryComponent } from './country.component';

const routes: Routes = [
  { 
    path: "",
    component: CountryComponent ,
   },
   {
    path: "add",
    component: CountryAddComponent,
   },
];

export const CountryRoutes = RouterModule.forChild(routes);
