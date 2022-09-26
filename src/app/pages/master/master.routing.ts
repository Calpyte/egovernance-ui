import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "department",
    loadChildren: () =>
      import("../master/department/department.module").then((m) => m.DepartmentModule),
  },
  {
    path: "role",
    loadChildren: () =>
      import("../master/role/role.module").then((m) => m.RoleModule),
  },
  {
    path: "app-user",
    loadChildren: () =>
      import("../master/app-user/app-user.module").then((m) => m.AppUserModule),
  },
  {
    path: "office",
    loadChildren: () =>
      import("../master/office/office.module").then((m) => m.OfficeModule),
  },
];

export const MasterRoutes = RouterModule.forChild(routes);
