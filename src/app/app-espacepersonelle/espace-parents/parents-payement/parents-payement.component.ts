import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentRestControllerService } from '../../../api-client/api/paymentRestController.service'; // Ajoute ce service pour interagir avec l'API
import { PaymentDto } from '../../../api-client/model/paymentDto'; // Assurez-vous que ce modèle est correct
@Component({
  selector: 'app-parent-payement',
  templateUrl: './parents-payement.component.html',
  styleUrls: ['./parents-payement.component.css'],
})
export class ParentsPayementComponent implements OnInit {
  moisPaye!: number;
  anneePaye!: number;
  montant!: number;
  dateVirement!: string;
  messageSuccess: string = '';
  parentId!: number; // Ajoute cette variable si elle n'est pas déjà gérée dans le composant

  // Liste des mois et années pour le formulaire
  listeMois = [
    { value: 1, label: 'Janvier' },
    { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' },
    { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' },
  ];

  anneesDisponibles: number[] = [];

  constructor(
    private toast: ToastrService,
    private paiementService: PaymentRestControllerService // Injecte ton service
  ) {}

  ngOnInit(): void {
    this.initAnnees();
    this.parentId = 8; // Remplace ceci par la méthode qui récupère l'ID du parent, si nécessaire
  }

  initAnnees() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 10; i--) {
      this.anneesDisponibles.push(i);
    }
  }

  envoyerNotificationPaiement() {
    const paiementData: PaymentDto = {
      month: this.getMoisLabel(this.moisPaye), // Mois en format texte, selon ton DTO
      year: this.anneePaye.toString(), // Année en format chaîne de caractères
      amount: this.montant,
      dateTransfer: this.dateVirement,
      parentId: this.parentId, // Ajoute l'ID du parent
    };

    this.paiementService.add3(paiementData).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageSuccess = 'Votre paiement a été ajouté avec succès !';
          this.toast.success('Paiement enregistré avec succès.');
        } else {
          this.toast.error(res.message || "Erreur lors de l'ajout du paiement");
        }
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Erreur technique');
      },
    });
  }

  private getMoisLabel(mois: number): string {
    const moisLabels = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ];
    return moisLabels[mois - 1];
  }
}
