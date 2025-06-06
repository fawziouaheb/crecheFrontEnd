import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_EMPLOYEE } from '../../constant/router-constant/router-constant';
import { AdminPointageComponent } from '../espace-admin/admin-pointage/admin-pointage.component';
import { AdminRapportReunionComponent } from '../espace-admin/admin-rapport-reunion/admin-rapport-reunion.component';
import { AdminMenuWeekComponent } from '../espace-admin/admin-menu-week/admin-menu-week.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  {
    path: ROUTES_EMPLOYEE.POINTAGE_EMPLOYEE,
    component: AdminPointageComponent,
  },
  {
    path: ROUTES_EMPLOYEE.RAPPORT_REUNION,
    component: AdminRapportReunionComponent,
  },
  { path: ROUTES_EMPLOYEE.MENU, component: AdminMenuWeekComponent },
  { path: ROUTES_EMPLOYEE.DASHBOARD, component: EmployeeDashboardComponent },
  { path: '**', component: EmployeeDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspaceEmployeeRoutingModule {}
