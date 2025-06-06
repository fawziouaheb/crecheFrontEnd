import { Component, OnInit } from '@angular/core';
import { CandidateRestControllerService } from '../../../api-client';
import { MessageService } from '../../../shared/Composant-commun/app-message-display/message.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-candidate',
  templateUrl: './admin-candidate.component.html',
  styleUrl: './admin-candidate.component.css',
})
export class AdminCandidateComponent implements OnInit {
  constructor(
    private candidateAdminService: CandidateRestControllerService,
    private messageService: MessageService,
    private toast: ToastrService
  ) {}
  candidatures: any[] = [];

  ngOnInit(): void {
    this.getAllCandidates();
  }

  getAllCandidates() {
    
    this.candidateAdminService.getAll().subscribe(
      (response: any) => {
        console.log('Données reçues :', response.data);
      if (response.success) {
        const data = response.data; // Assurez-vous que 'data' est bien défini ici
        // Transformer les données pour qu'elles correspondent au template
        this.candidatures = data.map((candidat: any) => ({
          id: candidat.id,
          nom: candidat.lastName,
          prenom: candidat.firstName,
          email: candidat.email,
          ville: candidat.city || 'Ville inconnue', // Ajoutez un fallback si city est manquant
          contrat: candidat.contract || 'Non précisé',
          dateDisponibilite: candidat.dateFree || 'Date inconnue',
          dateCandidate: candidat.createdAt || 'Date Inconnue',
          telephone: candidat.mobile,
          statut: candidat.statut || 'Statut inconnu',
          structure: candidat.structure || 'Non précisé',
          motivation: candidat.motivation || 'Aucune motivation renseignée',
          cv: candidat.cv || '#',
        }));
          this.toast.success(
            response.message || 'Votre demande a été traité avec success.'
          );
        }
        else {
          this.toast.error(response.message || 'Une erreur s’est produite.');
        }
      },
      (error) => {
        this.toast.error('Une erreur s’est produite.');
      }
    );
  }

  acceptCandidate(id: number): void {
    this.candidateAdminService.acceptCandidate(id).subscribe(
      (data) => {
        interface MessageData {
          message: string;
          success: boolean; // ou bien un type spécifique selon le contenu de `data`
        }
        //this.getAllCandidates(); // Rafraîchit la liste des candidats après l'acceptation
        this.messageService.changeMessage(
          (data as MessageData).message,
          (data as MessageData).success
        );
      },
      (error) => {
        this.messageService.changeMessage(
          "Problème lors de traiement de la l'opératio.",
          false
        );
        console.error("Erreur lors de l'acceptation du candidat :", error);
      }
    );
  }

  refuseCandidate(id: number): void {
    this.candidateAdminService.rejectCandidat(id).subscribe(
      (response: any) => {
        if (response.success) {
          this.toast.success(response.message || 'Votre demande a été traité avec success.');
          this.getAllCandidates(); // Rafraîchit la liste des candidats après l'acceptation
        } else {
          this.toast.error(response.message || 'Une erreur s’est produite.');
        }
      },
      (error) => {
       // this.toast.error("Une erreur s’est produite.")
        console.error("Erreur lors du refus du candidat :", error);
      }
    );
  }

  downloadCV(filePath: string): void {
  
    this.candidateAdminService.downloadCV(filePath).subscribe(
      (response: any) => {
        const base64 = response?.fileBase64;
        if (!base64) {
          this.toast.error('Aucun fichier retourné.');
          return;
        }
  
        // Conversion du base64 en Blob
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
  
        // Création d'un lien de téléchargement
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'cv.pdf'; // Nom du fichier à télécharger
        link.click();
  
        // Nettoyage
        URL.revokeObjectURL(link.href);
        this.toast.success('CV téléchargé avec succès.');
      },
      (error) => {
        this.toast.error('Erreur lors du téléchargement du CV.');
      }
    );
  }
  
}
