import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ROUTES,
  ROUTES_SOMMAIRE,
  SOMMAIRE,
} from '../constant/router-constant/router-constant';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageActiviteComponent } from './page-activite/page-activite.component';
import { PageCandidateComponent } from './page-candidate/page-candidate.component';
import { PageContactComponent } from './page-contact/page-contact.component';
import { PageEducationalValueComponent } from './page-educational-value/page-educational-value.component';
import { PageAccueilPresentationEntrepriseComponent } from './page-accueil-presentation-entreprise/page-accueil-presentation-entreprise.component';
import { PagePreinscriptionComponent } from './page-preinscription/page-preinscription.component';
import { PageReglementProtocoleComponent } from './page-reglement-protocole/page-reglement-protocole.component';
import { PageTarificationComponent } from './page-tarification/page-tarification.component';
import { PageAccueilPlaceDisponibleCrecheComponent } from './page-accueil-presentation-entreprise/page-accueil-place-disponible-creche/page-accueil-place-disponible-creche.component';
import { PresentationCrecheSommaireComponent } from './page-accueil-presentation-entreprise/presentation-creche-sommaire/presentation-creche-sommaire.component';
import { PagePreinscriptionCreationComponent } from './page-preinscription/page-preinscription-creation/page-preinscription-creation.component';
import { PagePromotionComponent } from './page-promotion/page-promotion.component';
import { PageFicheCrecheComponent } from './page-fiche-creche/page-fiche-creche.component';
import { PageAvisDeParentsComponent } from './page-avis-de-parents/page-avis-de-parents.component';
import { PageForgetPasswordComponent } from './page-forget-password/page-forget-password.component';
import { PageResetPasswordComponent } from './page-forget-password/page-reset-password/page-reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: PageAccueilPresentationEntrepriseComponent,
  },
  {
    path: ROUTES.LOGIN,
    component: PageLoginComponent,
  },
  {
    path: ROUTES.ACTIVITE,
    component: PageActiviteComponent,
  },
  {
    path: ROUTES.CANDIDAT,
    component: PageCandidateComponent,
  },
  {
    path: ROUTES.CONTACT,
    component: PageContactComponent,
  },
  {
    path: ROUTES.EDUCATIONVALUES,
    component: PageEducationalValueComponent,
  },
  {
    path: ROUTES.REGLEMENTS,
    component: PageReglementProtocoleComponent,
  },
  { path: `${ROUTES.FICHE_CRECHE}/:id`, component: PageFicheCrecheComponent },
  {
    path: ROUTES.AVIS_PARENTS,
    component: PageAvisDeParentsComponent,
  },

  {
    path: ROUTES.PREINSCRIPTION,
    component: PagePreinscriptionCreationComponent,
  },
  {
    path: ROUTES.TARIF,
    component: PageTarificationComponent,
  },
  {
    path: ROUTES.PROMOTION,
    component: PagePromotionComponent,
  },
  {
    path: ROUTES.SOMMAIRE_CRECHE,
    component: PresentationCrecheSommaireComponent,
  },
  {
    path: ROUTES_SOMMAIRE(SOMMAIRE.PLACE_DISPONIBLE),
    component: PageAccueilPlaceDisponibleCrecheComponent,
  },
  { path: ROUTES.FORGET_PASSWORD, component: PageForgetPasswordComponent },
  { path: ROUTES.RESET_PASSWORD, component: PageResetPasswordComponent },
  { path: ROUTES.UNKNOWN, redirectTo: ROUTES.SITEVITRINE },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSitevitrineRoutingModule {}
