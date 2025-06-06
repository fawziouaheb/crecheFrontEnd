import { Component, OnInit } from '@angular/core';
import { Protocole, ProtocoleRestControllerService } from '../../api-client';

@Component({
  selector: 'app-page-reglement-protocole',
  templateUrl: './page-reglement-protocole.component.html',
  styleUrl: './page-reglement-protocole.component.css',
})
export class PageReglementProtocoleComponent implements OnInit {
  protocoles: Protocole[] = []; // Array pour stocker les protocoles
  currentIndex: number = 0; // Pour gérer l'index des protocoles dans un carrousel ou pagination si nécessaire

  constructor(private protocoleService: ProtocoleRestControllerService) {}

  ngOnInit(): void {
    this.getAllProtocoles(); // Récupérer tous les protocoles lors de l'initialisation
  }

  // ✅ Récupération des protocoles via l'API
  getAllProtocoles(): void {
    this.protocoleService.getAllProtocoles().subscribe({
      next: (data) => {
        this.protocoles = data;
        console.log(this.protocoles); // Afficher les données dans la console pour vérifier
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des protocoles:', err);
      },
    });
  }

  convertToHtml(description: string | undefined): string {
    return (description ?? '').replace(/\n/g, '<br />'); // Remplacer les sauts de ligne par des balises <br />
  }
}
