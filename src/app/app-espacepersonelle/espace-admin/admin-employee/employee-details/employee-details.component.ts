import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonRestControllerService,FileRestControllerService,WorkingSessionControllerService } from '../../../../api-client';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId: any; 
  employee: any; // Stocker les détails de l'employé
  selectedFile: File | null = null; // Fichier sélectionné pour le téléchargement
  moisListe = [
    { value: 1, label: 'Janvier' }, { value: 2, label: 'Février' }, { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' }, { value: 5, label: 'Mai' }, { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' }, { value: 8, label: 'Août' }, { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' }, { value: 11, label: 'Novembre' }, { value: 12, label: 'Décembre' }
  ];
  moisSelectionne: number = new Date().getMonth() + 1; // Par défaut, mois actuel
  anneeSelectionnee: number = new Date().getFullYear(); // Année actuelle
  sessionsTravail: any[] = [];
  mois: number = new Date().getMonth() + 1; // Mois actuel
  annee: number = new Date().getFullYear(); // Année actuelle

  dateDebut: string = '';
  dateFin: string = '';

  totalHeures: number = 0;
  detailsSessions: any[] = [];
  afficherDetails: boolean = false;
  anneesDisponibles: number[] = [];


  constructor(
    private route: ActivatedRoute,
    private personRestControllerService: PersonRestControllerService,
    private fileRestControllerService: FileRestControllerService,
    private workerService: WorkingSessionControllerService,
    private toast: ToastrService){}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.employeeId = +params.get('id')!;
    this.getEmployeeDetails();
  });
  this.initialiserAnnees();
  this.mettreAJourDates();
}

getEmployeeDetails(): void {
    this.personRestControllerService.getEmploye(this.employeeId).subscribe(
      (response: any) => {
        if (response.success) {
          this.employee = response.data;
          console.log("Détails de l'employé récupérés :", this.employee);
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des détails de l'employé", error);
      }
    );
}

uploadFile() {
    if (!this.selectedFile) {
      this.toast.error('Veuillez sélectionner un fichier !');
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // Supprimer le préfixe "data:application/pdf;base64,"
  
      const uploadRequest = {
        idPackage: this.employeeId,
        fileName: this.selectedFile?.name,
        fileData: base64String
      };
  
      this.fileRestControllerService.uploadPdf(uploadRequest).subscribe(
        (response: any) => {
            if (response.success) {
            this.toast.success(
              response.message || 'Votre demande a été traité avec success.'
            );
          } else {
            this.toast.error(response.message || 'Une erreur s’est produite.');
          }
        },
        (error) => {
          this.toast.error('Erreur lors de l\'envoi du fichier !');

        }
      );
    };
  
    reader.onerror = (error) => {
      console.error("Erreur lors de la lecture du fichier :", error);
    };
}
  

downloadFile(fileName: string) {
    if (!this.employeeId) {
      this.toast.error('Aucun parent sélectionné !');
      return;
    }

    this.fileRestControllerService.downloadPdf(this.employeeId,fileName).subscribe(
      (response: any) => {        
        if (!response || !response.fileBase64) {
          this.toast.error('Erreur : fichier introuvable !');
          return;
        }

        // 🔹 Convertir la chaîne Base64 en Blob PDFù
        const byteCharacters = atob(response.fileBase64);
        const byteArray = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArray[i] = byteCharacters.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: 'application/pdf' });

        // 🔹 Télécharger le fichier
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.toast.success('Le fichier a été téléchargé avec succès !');
      },
      (error) => {
        this.toast.error('Erreur : impossible de télécharger le fichier !');
      }
    );
}


onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}
deleteFile(fileName: string) {
  if (!this.employeeId) {
    alert("Aucun parent sélectionné !");
    return;
  }

  if (!confirm(`Voulez-vous vraiment supprimer le fichier "${fileName}" ?`)) {
    return;
  }


  this.fileRestControllerService.deletePdf(this.employeeId,fileName).subscribe(
    (response: any) => {
      if (response.success) {
        this.toast.success(
          response.message || 'Votre demande a été traité avec success.'
        );

      } else {
        this.toast.error(response.message || 'Une erreur s’est produite.');
      }
    },
    (error) => {
      this.toast.error('Une erreur s’est produite lors de la suppression du fichier.');
    }
  );
}

// Simuler chargement des heures
chargerHeures() {
  const employeId = this.employee?.id;
  if (!employeId) {
    console.error("Employé non sélectionné !");
    return;
  }

  // TODO: Appeler ici ton service backend
  // Simulons une réponse pour l'instant :
  this.sessionsTravail = [
    { dateSession: new Date(this.anneeSelectionnee, this.moisSelectionne - 1, 3), durationMinute: 480 },
    { dateSession: new Date(this.anneeSelectionnee, this.moisSelectionne - 1, 10), durationMinute: 450 },
    { dateSession: new Date(this.anneeSelectionnee, this.moisSelectionne - 1, 17), durationMinute: 420 },
  ];

  // Calcul total heures
  const totalMinutes = this.sessionsTravail.reduce((acc, curr) => acc + curr.durationMinute, 0);
  this.totalHeures = +(totalMinutes / 60).toFixed(2); // Convertir en heures et arrondir à 2 décimales
}



toggleDetails() {
  this.afficherDetails = !this.afficherDetails;
}

initialiserAnnees() {
  const anneeActuelle = new Date().getFullYear();
  for (let i = anneeActuelle; i >= anneeActuelle - 10; i--) {
    this.anneesDisponibles.push(i);
  }
}

mettreAJourDates() {
  this.dateDebut = `${this.annee}-${this.mois.toString().padStart(2, '0')}-01`;
  this.dateFin = this.calculerDernierJour(this.mois, this.annee);
}

calculerDernierJour(mois: number, annee: number): string {
  const dernierJour = new Date(annee, mois, 0).getDate();
  return `${annee}-${mois.toString().padStart(2, '0')}-${dernierJour}`;
}

chercherSessions() {
  if (!this.employeeId || !this.dateDebut || !this.dateFin) {
    this.toast.error('Veuillez sélectionner une période !');
    return;
  }
const requestBody = {
  employeId: this.employeeId,
  dateDebut: this.dateDebut,
  dateFin: this.dateFin
};
this.workerService.getWorkingSessionsByMonth(requestBody).subscribe(
  (response: any) => {
    if (response.success) {
      this.sessionsTravail = response.data;
      this.detailsSessions = response.data; // <<< Ajoute cette ligne !
      this.totalHeures = this.sessionsTravail.reduce((acc, session) => acc + session.durationMinute, 0) / 60;
      this.afficherDetails = true;
    } else {
      this.toast.error(response.message || 'Erreur lors de la récupération des sessions');
    }
  },
  (error) => {  
    this.toast.error('Erreur lors de la récupération des sessions');
  }
);

}
}
