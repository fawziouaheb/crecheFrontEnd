import { Component, OnInit } from '@angular/core';
import { Protocole, ProtocoleRestControllerService } from '../../../api-client';

@Component({
  selector: 'app-admin-protocle',
  templateUrl: './admin-protocle.component.html',
  styleUrl: './admin-protocle.component.css',
})
export class AdminProtocleComponent implements OnInit {
  protocoles: Protocole[] = []; // Tableau pour stocker les protocoles existants
  newProtocole: Protocole = { titre: '', contenu: '' }; // Protocole vide pour l'ajout
  editProtocole: Protocole = { titre: '', contenu: '' }; // Protocole pour l'édition

  constructor(private protocoleService: ProtocoleRestControllerService) {}

  ngOnInit(): void {
    this.getAllProtocoles(); // Charger les protocoles existants lors de l'initialisation
  }

  // Récupérer tous les protocoles via l'API
  getAllProtocoles(): void {
    this.protocoleService.getAllProtocoles().subscribe({
      next: (data) => {
        this.protocoles = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des protocoles:', err);
      },
    });
  }

  // Ajouter un nouveau protocole
  createProtocole(): void {
    if (this.newProtocole.titre && this.newProtocole.contenu) {
      this.protocoleService.addProtocole(this.newProtocole).subscribe({
        next: (data) => {
          this.protocoles.push(data);
          this.newProtocole = { titre: '', contenu: '' }; // Réinitialiser après ajout
        },
        error: (err) => {
          console.error('Erreur lors de la création du protocole:', err);
        },
      });
    }
  }

  // Modifier un protocole existant
  updateProtocole(): void {
    if (
      this.editProtocole.titre &&
      this.editProtocole.contenu &&
      this.editProtocole.id !== undefined
    ) {
      // Créer un objet Protocole avec les données à jour
      const protocole: Protocole = {
        id: this.editProtocole.id,
        titre: this.editProtocole.titre,
        contenu: this.editProtocole.contenu,
      };

      // Appel à la méthode updateProtocole du service
      this.protocoleService
        .updateProtocole(this.editProtocole.id, protocole)
        .subscribe({
          next: (data) => {
            // Mise à jour des protocoles dans le tableau après modification
            const index = this.protocoles.findIndex((p) => p.id === data.id);
            if (index !== -1) {
              this.protocoles[index] = data;
            }
            this.editProtocole = { titre: '', contenu: '', id: undefined }; // Réinitialiser après modification
          },
          error: (err) => {
            console.error('Erreur lors de la modification du protocole:', err);
          },
        });
    } else {
      console.error("L'ID du protocole est manquant ou non défini.");
    }
  }

  // Supprimer un protocole
  deleteProtocole(protocoleId: number): void {
    this.protocoleService.deleteProtocole(protocoleId).subscribe({
      next: () => {
        // Supprimer le protocole de la liste après suppression
        this.protocoles = this.protocoles.filter((p) => p.id !== protocoleId);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du protocole:', err);
      },
    });
  }

  // Sélectionner un protocole pour l'édition
  selectProtocoleToEdit(protocole: Protocole): void {
    this.editProtocole = { ...protocole }; // Remplir le formulaire d'édition avec les données existantes
  }
}
