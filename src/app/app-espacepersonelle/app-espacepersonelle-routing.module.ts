import { EspaceEmployeeModule } from './espace-employee/espace-employee.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '../constant/router-constant/router-constant';
import { EspaceUnauthorizedComponent } from './espace-unauthorized/espace-unauthorized.component';
import { EspaceAdminComponent } from './espace-admin/espace-admin.component';
import { roleGuard } from '../app-authentification/guards/role.guard';
import { authGuard } from '../app-authentification/guards/auth.guard';
import { EspaceParentsComponent } from './espace-parents/espace-parents.component';
import { EspaceEmployeeComponent } from './espace-employee/espace-employee.component';

const routes: Routes = [
  {
    path: 'admin',
    component: EspaceAdminComponent,
    //canActivate: [authGuard, roleGuard],
    //data: { roles: ['ADMINISTRATEUR'] },
    loadChildren: () =>
      import('./espace-admin/espace-admin.module').then((m) => {
        return m.EspaceAdminModule;
      }),
  },
  {
    path: 'parents',
    component: EspaceParentsComponent,
    //canActivate: [authGuard, roleGuard],
    //data: { roles: ['ADMINISTRATEUR'] },
    loadChildren: () =>
      import('./espace-parents/espace-parents.module').then((m) => {
        return m.EspaceParentsModule;
      }),
  },
  {
    path: 'employee',
    component: EspaceEmployeeComponent,
    //canActivate: [authGuard, roleGuard],
    //data: { roles: ['ADMINISTRATEUR'] },
    loadChildren: () =>
      import('./espace-employee/espace-employee.module').then((m) => {
        return m.EspaceEmployeeModule;
      }),
  },
  { path: 'unauthorized', component: EspaceUnauthorizedComponent },
  { path: '**', redirectTo: ROUTES.LOGIN, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppEspacepersonelleRoutingModule {}
