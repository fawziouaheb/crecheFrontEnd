import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppEspacepersonelleRoutingModule } from './app-espacepersonelle-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EspaceUnauthorizedComponent } from './espace-unauthorized/espace-unauthorized.component';
import { AppEspacepersonelleComponent } from './app-espacepersonelle.component';
import { RouterModule } from '@angular/router';
import { EspacePersonnellLayoutComponent } from './espace-personnell-layout/espace-personnell-layout.component';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EspacePersonnelleEffects } from './espace-personnelle-store/espace-personnelle.effects';
import { EspacePersonnelleReducer } from './espace-personnelle-store/espace-personnelle.reducer';

@NgModule({
  declarations: [
    EspaceUnauthorizedComponent,
    AppEspacepersonelleComponent,
    EspacePersonnellLayoutComponent,
  ],
  exports: [EspacePersonnellLayoutComponent],
  imports: [
    CommonModule,
    AppEspacepersonelleRoutingModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ButtonModule,
    AvatarModule,
    SidebarModule,
    StoreModule.forFeature('espacepersonnelle', EspacePersonnelleReducer),
    EffectsModule.forFeature([EspacePersonnelleEffects]),
  ],
})
export class AppEspacepersonelleModule {}
