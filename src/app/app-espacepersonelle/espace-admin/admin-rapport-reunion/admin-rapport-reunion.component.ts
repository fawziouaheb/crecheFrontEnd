  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { RapportRestControllerService } from '../../../api-client';
  import { RapportDto } from '../../../api-client/model/rapportDto';
  import { ToastrService } from 'ngx-toastr';
  import { Store } from '@ngrx/store';
  import { Subscription, EMPTY } from 'rxjs';
  import { selectSelectedStructure } from '../admin-store/admin.selectors';
  import { filter, switchMap, catchError, take } from 'rxjs/operators';
  import { selectCurrentUser } from '../../../store/authentification/auth.selector';
  import { isRole } from '../../../utils/utils_role';
  import { ROLES } from '../../../constant/roles/constant-roles';


  @Component({
    selector: 'app-admin-rapport-reunion',
    templateUrl: './admin-rapport-reunion.component.html',
    styleUrls: ['./admin-rapport-reunion.component.css']
  })
  export class AdminRapportReunionComponent implements OnInit, OnDestroy {
    selectedDate: string | null = null;
    rapportId: number | null = null;
    rapport: string = '';
    rapportDateUpdate: string | null = null;
    utilisateursVus: any[] = [];
    isDirectrice: boolean = false;


    selectedStructureId: number | null = null;
    private subscription: Subscription = new Subscription();

    constructor(
      private rapportRestControllerService: RapportRestControllerService,
      private toast: ToastrService,
      private store: Store
    ) {}

  ngOnInit(): void {
  if (!this.selectedDate) {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
  }

  // 1. Prendre l'utilisateur courant (pour le rôle et id)
  const userSub = this.store.select(selectCurrentUser).pipe(take(1)).subscribe(user => {
    if (!user || !user.role?.roleName) {
      this.toast.error("Utilisateur non authentifié");
      return;
    }

    this.isDirectrice = isRole(user.role.roleName, ROLES.ADMIN);

    if (this.isDirectrice) {
      this.loadRapportAsDirectrice();
    } else {
      if (user.id !== undefined && user.id !== null) {
        this.loadRapportAsUser(user.id);
      } else {
        this.toast.error('Identifiant utilisateur non disponible');
      }
    }

  });

  this.subscription.add(userSub);
}



ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

onDateChange(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  this.selectedDate = inputElement.value || null;
  this.resetRapportData();
  this.ngOnInit();
}

loadRapportAsDirectrice() {
  const sub = this.store.select(selectSelectedStructure).pipe(
    filter((structure): structure is { id: number } => !!structure && !!structure.id), // filtre null et id falsy
    switchMap(structure => {
      this.selectedStructureId = structure.id;
      return this.loadRapportForStructure(structure.id);
    })
  ).subscribe((rapport: any) => {
    this.processRapportResponse(rapport);
  });
  this.subscription.add(sub);
}

loadRapportAsUser(userId: number) {
  if (!this.selectedDate) return;

  const sub = this.rapportRestControllerService.getRapportByDateAndUser(userId, this.selectedDate).pipe(
    catchError(err => {
      this.toast.error('Erreur lors de la récupération du rapport pour utilisateur');
      return EMPTY;
    })
  ).subscribe((rapport: any) => {
    this.processRapportResponse(rapport);

    if (rapport?.data) {
      const rapportId = rapport.data.id;
      if (rapportId) {
        this.markAsViewed(userId, rapportId);
      }
    }
  });

  this.subscription.add(sub);
}

loadRapportForStructure(id: number) {
  if (!this.selectedDate) {
    return EMPTY;
  }

  return this.rapportRestControllerService
    .getRapportByDateAndStructure(id, this.selectedDate)
    .pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération du rapport', error);
        this.toast.error('Erreur lors de la récupération du rapport.');
        return EMPTY;
      })
    );
}

processRapportResponse(rapport: any) {
  rapport = rapport?.data || null;
  if (rapport) {
    this.rapportId = rapport.id;
    this.rapport = rapport.rapportBody;
    this.utilisateursVus = rapport.nameEmployes;
    this.rapportDateUpdate = rapport.rapportDateUpdate;
  } else {
    this.resetRapportData();
  }
}

saveRapport(): void {
      if (!this.selectedStructureId) {
        this.toast.error('Aucune structure sélectionnée.');
        return;
      }
      if (!this.isDirectrice) {
        this.toast.error('vous avez pas le droit de sauvegarder un rapport');
        return;
      }

      const rapportDto: RapportDto = {
        id: this.rapportId ?? undefined,
        rapportBody: this.rapport,
        rapportDate: this.selectedDate ?? '',
        rapportDateUpdate: new Date().toISOString(),
        structureId: this.selectedStructureId, // Ajout de l'ID de la structure
      };

      this.rapportRestControllerService.add4(rapportDto).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toast.success(res.message || 'Rapport sauvegardé avec succès.');
          } else {
            this.toast.error(res.message || 'Erreur lors de la sauvegarde du rapport.');
          }
        },
        error: (error) => {
          this.toast.error('Erreur lors de la sauvegarde du rapport.');
        }
      });
}

markAsViewed(userId: number, rapportId: number): void {
      this.rapportRestControllerService.asViews(rapportId, userId).subscribe({
        next: (response) => {
          console.log(`✅ Rapport marqué comme vu pour l'utilisateur ${userId}`, response);
        },
        error: (error) => {
          console.error(`Erreur lors du marquage du rapport`, error);
        }
      });
}
hasUtilisateursVus(): boolean {
    return Array.isArray(this.utilisateursVus) && this.utilisateursVus.length > 0 && this.isDirectrice;
} 
resetRapportData(): void {
  this.rapport = '';
  this.utilisateursVus = [];
  this.rapportId = null;
  this.rapportDateUpdate = null;
}  

}
