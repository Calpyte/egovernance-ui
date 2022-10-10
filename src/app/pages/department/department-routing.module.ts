import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { DepartmentContainerComponent } from './department-container/department-container.component';

const routes: Routes = [
  {path:'',component:DepartmentContainerComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
