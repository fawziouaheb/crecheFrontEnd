// Les constants utilisées pour la routing
export const ROUTES = {
  SITEVITRINE: 'vitrine',
  MON_ESPACE: 'monespace',
  EDUCATIONVALUES: 'value/education',
  TARIF: 'tarification',
  CANDIDAT: 'candidate',
  CONTACT: 'contact',
  ACTIVITE: 'activite',
  SOMMAIRE_CRECHE: 'sommaire',
  PREINSCRIPTION: 'preinscription',
  REGLEMENTS: 'reglements',
  FICHE_CRECHE: 'fiche-creche',
  LOGIN: 'login',
  PROMOTION: 'a-propos-de-nous',
  AVIS_PARENTS: 'avis-parents',
  FORGET_PASSWORD: 'forget-password',
  RESET_PASSWORD: 'reset-password',
  UNKNOWN: '**',
};
export const ROUTES_PARENTS = {
  PATH_PARENTS: ROUTES.MON_ESPACE + '/parents',
  DASHBOARD: 'dashboard',
  PARENTS_PAYEMENT: 'parents-payement',
  PARENT_DETAILS: 'parent-details/:id',
  UNKNOWN: '**',
};

export const ROUTES_EMPLOYEE = {
  PATH_EMPLOYEE: ROUTES.MON_ESPACE + '/employee',
  DASHBOARD: 'dashboard',
  RAPPORT_REUNION: 'rapport-reunion',
  POINTAGE_EMPLOYEE: 'pointage-employee',
  MENU: 'menu',

  UNKNOWN: '**',
};

export const ROUTES_ADMIN = {
  PATH_ADMIN: ROUTES.MON_ESPACE + '/admin',
  DASHBOARD: 'dashboard',
  CANDIDATE: 'candidate',
  CITY: 'city',
  STRUCTURE: 'structure',
  PROMO: 'promo',
  ACTIVITE: 'activite',
  PROTOCOLE: 'protocoles',
  EMPLOYEE_ADMIN: 'add-employee',
  EMPLOYEE_LIST: 'employee-list',
  EMPLOYEE_EDIT: 'edit-employee/:id',
  EMPLOYEE_DETAILS: 'employee-details/:id',
  PARENTS_ADMIN: 'add-parents',
  PARENTS_LIST: 'parents-list',
  PARENTS_EDIT: 'edit-parents/:id',
  PARENT_DETAILS: 'parent-details/:id',
  RAPPORT_REUNION: 'rapport-reunion',
  POINTAGE_EMPLOYEE: 'pointage-employee',
  PARENTS_PAYEMENT: 'parents-payement',
  PREINSCRITION_VISUALISATION: 'preinscriptions-visualisation',
  PREINSCRITION_LIST: 'preinscriptions-list',
  MENU: 'menu',
  UNKNOWN: '**',
};

export const SOMMAIRE = {
  VIDE: '',
  PLACE_DISPONIBLE: 'place_disponible',
  UNKNOWN: '**',
};

// Fonction pour générer une URL à partir de SOMMAIRE_CRECHE et de l'URL donnée
export function ROUTES_SOMMAIRE(url: string): string {
  return ROUTES.SOMMAIRE_CRECHE + '/' + url;
}
