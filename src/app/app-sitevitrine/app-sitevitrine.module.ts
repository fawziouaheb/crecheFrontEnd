import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSitevitrineRoutingModule } from './app-sitevitrine-routing.module';
import { PageLoginComponent } from './page-login/page-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PageActiviteComponent } from './page-activite/page-activite.component';
import { PageCandidateComponent } from './page-candidate/page-candidate.component';
import { PageContactComponent } from './page-contact/page-contact.component';
import { PageCareComponent } from './page-care/page-care.component';
import { PageTeamProComponent } from './page-team-pro/page-team-pro.component';
import { PageDailyExchangeComponent } from './page-daily-exchange/page-daily-exchange.component';
import { PageEducationalValueComponent } from './page-educational-value/page-educational-value.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PageFamiliarizationPeriodeComponent } from './page-familiarization-periode/page-familiarization-periode.component';
import { PageAccueilPresentationEntrepriseComponent } from './page-accueil-presentation-entreprise/page-accueil-presentation-entreprise.component';
import { PageAccueilPlaceDisponibleCrecheComponent } from './page-accueil-presentation-entreprise/page-accueil-place-disponible-creche/page-accueil-place-disponible-creche.component';
import { PresentationCrecheSommaireComponent } from './page-accueil-presentation-entreprise/presentation-creche-sommaire/presentation-creche-sommaire.component';
import { PagePreinscriptionComponent } from './page-preinscription/page-preinscription.component';
import { PagePromotionCompanyComponent } from './page-promotion-company/page-promotion-company.component';
import { NgxEditorModule } from 'ngx-editor';
import { PageReglementProtocoleComponent } from './page-reglement-protocole/page-reglement-protocole.component';
import { PageTarificationComponent } from './page-tarification/page-tarification.component';
import { AppHeadMonEspaceComponent } from './page-layout/app-head-mon-espace/app-head-mon-espace.component';
import { AppHeadMenuComponent } from './page-layout/app-head-menu/app-head-menu.component';
import { AppFooterComponent } from './page-layout/app-footer/app-footer.component';
import { PageLayoutSitevitrineComponent } from './page-layout/page-layout-sitevitrine/page-layout-sitevitrine.component';
import { PagePreinscriptionCreationComponent } from './page-preinscription/page-preinscription-creation/page-preinscription-creation.component';
import { PagePromotionComponent } from './page-promotion/page-promotion.component';
import { PageFicheCrecheComponent } from './page-fiche-creche/page-fiche-creche.component';
import { PageAvisDeParentsComponent } from './page-avis-de-parents/page-avis-de-parents.component';
import { PageForgetPasswordComponent } from './page-forget-password/page-forget-password.component';
import { PageResetPasswordComponent } from './page-forget-password/page-reset-password/page-reset-password.component';

@NgModule({
  declarations: [
    PageLoginComponent,
    PageActiviteComponent,
    PageCandidateComponent,
    PageContactComponent,
    PageCareComponent,
    PageTeamProComponent,
    PageDailyExchangeComponent,
    PageEducationalValueComponent,
    PageFamiliarizationPeriodeComponent,
    PageAccueilPresentationEntrepriseComponent,
    PageAccueilPlaceDisponibleCrecheComponent,
    PresentationCrecheSommaireComponent,
    PagePreinscriptionComponent,
    PagePromotionCompanyComponent,
    PageReglementProtocoleComponent,
    PageTarificationComponent,
    AppHeadMonEspaceComponent,
    AppHeadMenuComponent,
    AppFooterComponent,
    PageLayoutSitevitrineComponent,
    PagePreinscriptionCreationComponent,
    PagePromotionComponent,
    PageFicheCrecheComponent,
    PageAvisDeParentsComponent,
    PageForgetPasswordComponent,
    PageResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AppSitevitrineRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbCollapseModule,
    NgxEditorModule,
    FormsModule,
  ],
})
export class AppSitevitrineModule {}
