import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsPayementComponent } from './parents-payement/parents-payement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ParentsMenuWeekComponent } from './parents-menu-week/parents-menu-week.component';
import { EspaceParentsRoutingModule } from './espace-parents-routing.module';
import { ParentsDashboardComponent } from './parents-dashboard/parents-dashboard.component';
import { EspaceParentsComponent } from './espace-parents.component';
import { AppEspacepersonelleModule } from '../app-espacepersonelle.module';

@NgModule({
  declarations: [
    ParentsPayementComponent,
    ParentsMenuWeekComponent,
    ParentsDashboardComponent,
    EspaceParentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    EspaceParentsRoutingModule,
    AppEspacepersonelleModule,
  ],
})
export class EspaceParentsModule {}
