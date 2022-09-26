import { Routes, RouterModule } from '@angular/router';
import { OfficeAddComponent } from './office-add/office-add.component';
import { OfficeComponent } from './office.component';

const routes: Routes = [
  { 
    path: "",
    component: OfficeComponent ,
   },
   {
    path: "add",
    component: OfficeAddComponent,
   },
];

export const OfficeRoutes = RouterModule.forChild(routes);
