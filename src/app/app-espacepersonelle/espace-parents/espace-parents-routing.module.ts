import { ROUTES_PARENTS } from './../../constant/router-constant/router-constant';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_ADMIN } from '../../constant/router-constant/router-constant';
import { ParentsPayementComponent } from './parents-payement/parents-payement.component';
import { ParentsMenuWeekComponent } from './parents-menu-week/parents-menu-week.component';
import { ParentsDashboardComponent } from './parents-dashboard/parents-dashboard.component';
import { ParentDetailsComponent } from '../espace-admin/admin-parent/parent-details/parent-details.component';
const routes: Routes = [
  /** Routing parents */
  { path: ROUTES_PARENTS.DASHBOARD, component: ParentsDashboardComponent },
  {
    path: ROUTES_PARENTS.PARENTS_PAYEMENT,
    component: ParentsPayementComponent,
  },
  {
    path: ROUTES_PARENTS.PARENT_DETAILS,
    component: ParentDetailsComponent,
  },
  { path: '**', redirectTo: ROUTES_PARENTS.DASHBOARD, pathMatch: 'full' }, // Cela ne fait rien
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspaceParentsRoutingModule {}
