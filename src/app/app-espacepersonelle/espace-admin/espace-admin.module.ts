import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceAdminRoutingModule } from './espace-admin-routing.module';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminStructureComponent } from './admin-structure/admin-structure.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminActiviteComponent } from './admin-activite/admin-activite.component';
import { AdminCandidateComponent } from './admin-candidate/admin-candidate.component';
import { AdminVilleComponent } from './admin-ville/admin-ville.component';
import { AdminProtocleComponent } from './admin-protocle/admin-protocle.component';
import { EspaceAdminComponent } from './espace-admin.component';
import { EmployeeEditComponent } from './admin-employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './admin-employee/employee-list/employee-list.component';
import { EmployeeComponent } from './admin-employee/employee/employee.component';
import { AdminPreinscriptionComponent } from './admin-preinscription/admin-preinscription.component';

import { ParentComponent } from './admin-parent/parent/parent.component';
import { ParentListComponent } from './admin-parent/parent-list/parent-list.component';
import { ParentDetailsComponent } from './admin-parent/parent-details/parent-details.component';
import { EmployeeDetailsComponent } from './admin-employee/employee-details/employee-details.component';
import { AdminRapportReunionComponent } from './admin-rapport-reunion/admin-rapport-reunion.component';

import { AdminPointageComponent } from './admin-pointage/admin-pointage.component';
import { AdminPreinscriptionVisualisationComponent } from './admin-preinscription/admin-preinscription-visualisation/admin-preinscription-visualisation.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AdminEffects } from './admin-store/admin.effects';
import { adminReducer } from './admin-store/admin.reducer';
import { AppEspacepersonelleModule } from '../app-espacepersonelle.module';
import { AdminPlanningComponent } from './admin-planning/admin-planning.component';
import { AdminMenuWeekComponent } from './admin-menu-week/admin-menu-week.component';
@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminStructureComponent,
    AdminActiviteComponent,
    AdminCandidateComponent,
    AdminVilleComponent,
    AdminProtocleComponent,
    EspaceAdminComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    EmployeeComponent,
    AdminPreinscriptionComponent,
    ParentComponent,
    ParentListComponent,
    ParentDetailsComponent,
    EmployeeDetailsComponent,
    AdminRapportReunionComponent,
    AdminPointageComponent,
    AdminPreinscriptionVisualisationComponent,
    AdminPlanningComponent,
    AdminMenuWeekComponent,
  ],
  imports: [
    CommonModule,
    EspaceAdminRoutingModule,
    RouterModule,
    FormsModule,
    SharedModule,
    AppEspacepersonelleModule,
    ReactiveFormsModule,
    StoreModule.forFeature('admin', adminReducer),
    EffectsModule.forFeature([AdminEffects]),
  ],
})
export class EspaceAdminModule {}
