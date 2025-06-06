import { Component, OnInit } from '@angular/core';
import { WorkingSessionDto } from '../../../api-client/model/workingSessionDto';
import { WorkingSessionControllerService } from '../../../api-client/api/workingSessionController.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AuthentificationState } from '../../../store/authentification/auth.reducer';
import { selectCurrentUser } from '../../../store/authentification/auth.selector';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-pointage',
  templateUrl: './admin-pointage.component.html',
  styleUrl: './admin-pointage.component.css'
})
export class AdminPointageComponent implements OnInit {

  employeId: number | null = null; // Devient dynamique
  heureArrivee: string = '';
  heureDepart: string = '';
  messageManuel = '';
  historiqueManuel: any[] = [];

  constructor(
    private workingSessionService: WorkingSessionControllerService,
    private toastr: ToastrService,
    private store: Store<{ auth: AuthentificationState }> // 👈 store
  ) {}

  ngOnInit(): void {
    // Récupération du currentUser depuis le store
    this.store.select(selectCurrentUser).pipe(take(1)).subscribe((user) => {
      if (user && user.id) {
        console.log("ID de l'utilisateur connecté :", user.id);
        this.employeId = user.id;
        this.getHistorySession(); // Charger l’historique avec l’ID dynamique
      } else {
        this.toastr.error('Utilisateur non connecté ou ID manquant.');
      }
    });
  }

  enregistrerManuel() {
    if (!this.employeId) {
      this.toastr.error('Aucun employé identifié.');
      return;
    }

    if (this.heureArrivee && this.heureDepart) {
      const heureArriveeFormatee = this.heureArrivee;
      const heureDepartFormatee = this.arrondirHeureDepart(this.heureDepart);
      console.log("id utilisateur", this.employeId);
      const session: WorkingSessionDto = {
        dateSession: new Date().toISOString().split('T')[0],
        arrivalTime: this.formatTime(heureArriveeFormatee),
        departureTime: this.formatTime(heureDepartFormatee),
        durationMinute: this.calculerDuree(this.heureArrivee, heureDepartFormatee),
        typeEnregistration: 'manuel',
        employeId: this.employeId // 👈 récupéré depuis le store
      };

      this.workingSessionService.add1(session).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success(res.message || 'Session enregistrée avec succès !');
            this.getHistorySession();
          } else {
            this.toastr.error(res.message || 'Erreur lors de l\'enregistrement de la session.');
          }
        },
        error: () => {
          this.toastr.error('Erreur lors de l\'enregistrement de la session.');
        }
      });

      this.heureArrivee = '';
      this.heureDepart = '';
    }
  }

  getHistorySession() {
    if (!this.employeId) return;
    this.workingSessionService.getSessionsByEmploye(this.employeId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.historiqueManuel = res.data;
          this.toastr.success(res.message || 'Historique récupéré avec succès !');
        } else {
          this.toastr.error(res.message || 'Erreur lors de la récupération de l\'historique.');
        }
      },
      error: () => {
        this.toastr.error('Erreur lors de la récupération de l\'historique des sessions.');
      }
    });
  }

  arrondirHeureDepart(heure: string): string {
    const [h, m] = heure.split(':').map(Number);
    let minutesArrondies = 0;

    if (m <= 7) {
      minutesArrondies = 15;
    } else if (m <= 22) {
      minutesArrondies = 30;
    } else if (m <= 37) {
      minutesArrondies = 45;
    } else {
      minutesArrondies = 0;
    }

    let heures = h;
    if (minutesArrondies === 0) {
      heures = (heures + 1) % 24;
    }

    const heuresStr = heures.toString().padStart(2, '0');
    const minutesStr = minutesArrondies.toString().padStart(2, '0');

    return `${heuresStr}:${minutesStr}`;
  }

  formatTime(heure: string): string {
    return heure.length === 5 ? `${heure}:00` : heure;
  }

  calculerDuree(arrivee: string, depart: string): number {
    const [h1, m1] = arrivee.split(':').map(Number);
    const [h2, m2] = depart.split(':').map(Number);

    const minutesArrivee = h1 * 60 + m1;
    const minutesDepart = h2 * 60 + m2;

    let duree = minutesDepart - minutesArrivee;
    if (duree < 0) {
      duree += 24 * 60;
    }
    return duree;
  }
}
