import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importation des constantes de routes
import { PageLayoutSitevitrineComponent } from './app-sitevitrine/page-layout/page-layout-sitevitrine/page-layout-sitevitrine.component';
import { authGuard } from './app-authentification/guards/auth.guard';
import { AppEspacepersonelleComponent } from './app-espacepersonelle/app-espacepersonelle.component';
import { AppTestLayoutComponent } from './app-test-layout/app-test-layout.component';
import { ROUTES } from './constant/router-constant/router-constant';


const routes: Routes = [
  {
    path: '',
    component: PageLayoutSitevitrineComponent,
    loadChildren: () =>
      import('./app-sitevitrine/app-sitevitrine.module').then(
        (m) => m.AppSitevitrineModule
      ),
  },
  {
    path: ROUTES.MON_ESPACE,
    component: AppEspacepersonelleComponent,
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./app-espacepersonelle/app-espacepersonelle.module').then((m) => {
        return m.AppEspacepersonelleModule;
      }),
  },
  { path: 'test', component: AppTestLayoutComponent },
  { path: ROUTES.UNKNOWN, redirectTo: ROUTES.SITEVITRINE, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
