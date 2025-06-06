import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminStructureComponent } from './admin-structure/admin-structure.component';
import { AdminActiviteComponent } from './admin-activite/admin-activite.component';
import { AdminCandidateComponent } from './admin-candidate/admin-candidate.component';
import { AdminVilleComponent } from './admin-ville/admin-ville.component';
import { AdminProtocleComponent } from './admin-protocle/admin-protocle.component';
import { ROUTES_ADMIN } from '../../constant/router-constant/router-constant';
import { ParentComponent } from './admin-parent/parent/parent.component';
import { EmployeeComponent } from './admin-employee/employee/employee.component';
import { EmployeeEditComponent } from './admin-employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './admin-employee/employee-list/employee-list.component';
import { AdminPreinscriptionComponent } from './admin-preinscription/admin-preinscription.component';

import { ParentListComponent } from './admin-parent/parent-list/parent-list.component';
import { ParentDetailsComponent } from './admin-parent/parent-details/parent-details.component';
import { EmployeeDetailsComponent } from './admin-employee/employee-details/employee-details.component';
import { AdminPointageComponent } from './admin-pointage/admin-pointage.component';

import { AdminRapportReunionComponent } from './admin-rapport-reunion/admin-rapport-reunion.component';
import { AdminPreinscriptionVisualisationComponent } from './admin-preinscription/admin-preinscription-visualisation/admin-preinscription-visualisation.component';
import { AdminMenuWeekComponent } from './admin-menu-week/admin-menu-week.component';


const routes: Routes = [
  { path: ROUTES_ADMIN.DASHBOARD, component: AdminDashboardComponent },
  { path: ROUTES_ADMIN.STRUCTURE, component: AdminStructureComponent },
  { path: ROUTES_ADMIN.ACTIVITE, component: AdminActiviteComponent },
  { path: ROUTES_ADMIN.CANDIDATE, component: AdminCandidateComponent },
  { path: ROUTES_ADMIN.CITY, component: AdminVilleComponent },
  { path: ROUTES_ADMIN.PROTOCOLE, component: AdminProtocleComponent },
  /** PARENT ROUTING */
  { path: ROUTES_ADMIN.PARENTS_ADMIN, component: ParentComponent },
  { path: ROUTES_ADMIN.PARENTS_LIST, component: ParentListComponent },
  { path: ROUTES_ADMIN.PARENT_DETAILS, component: ParentDetailsComponent },
  { path: ROUTES_ADMIN.POINTAGE_EMPLOYEE, component: AdminPointageComponent },
  /** EMPLOYEE ROUTING */
  { path: ROUTES_ADMIN.EMPLOYEE_ADMIN, component: EmployeeComponent },
  { path: ROUTES_ADMIN.EMPLOYEE_EDIT, component: EmployeeEditComponent },
  { path: ROUTES_ADMIN.EMPLOYEE_LIST, component: EmployeeListComponent },
  /**Rapport ROUTING */
  { path: ROUTES_ADMIN.MENU, component: AdminMenuWeekComponent },
  {
    path: ROUTES_ADMIN.RAPPORT_REUNION,
    component: AdminRapportReunionComponent,
  },

  /** PREINSCRIPTION */
  {
    path: ROUTES_ADMIN.PREINSCRITION_LIST,
    component: AdminPreinscriptionComponent,
  },
  {
    path: ROUTES_ADMIN.PREINSCRITION_LIST,
    component: AdminPreinscriptionComponent,
  },
  {
    path: ROUTES_ADMIN.PREINSCRITION_VISUALISATION,
    component: AdminPreinscriptionVisualisationComponent,
  },
  { path: ROUTES_ADMIN.EMPLOYEE_DETAILS, component: EmployeeDetailsComponent },

  { path: '**', redirectTo: ROUTES_ADMIN.DASHBOARD, pathMatch: 'full' }, // Cela ne fait rien
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspaceAdminRoutingModule {}
