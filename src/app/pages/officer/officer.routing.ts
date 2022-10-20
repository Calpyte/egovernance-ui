import { Routes, RouterModule } from '@angular/router';
import { OfficeAddComponent } from '../office/office-add/office-add.component';
import { OfficerComponent } from './officer.component';

const routes: Routes = [
  {  path:'',component:OfficerComponent},
  {path:'add',component:OfficeAddComponent}
];

export const OfficerRoutes = RouterModule.forChild(routes);
