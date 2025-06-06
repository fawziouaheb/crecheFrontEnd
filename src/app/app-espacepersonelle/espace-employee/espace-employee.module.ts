import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceEmployeeRoutingModule } from './espace-employee-routing.module';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AppEspacepersonelleModule } from '../app-espacepersonelle.module';
import { EspaceEmployeeComponent } from './espace-employee.component';

@NgModule({
  declarations: [EmployeeDashboardComponent, EspaceEmployeeComponent],
  imports: [
    CommonModule,
    EspaceEmployeeRoutingModule,
    AppEspacepersonelleModule,
  ],
})
export class EspaceEmployeeModule {}
