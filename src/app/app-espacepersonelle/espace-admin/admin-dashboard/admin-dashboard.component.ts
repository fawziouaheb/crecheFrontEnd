import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ApiResponseObject, CandidateRestControllerService, PersonRestControllerService} from '../../../api-client';
import { StructureRestControllerService } from '../../../api-client';
import { ROUTES_ADMIN } from '../../../constant/router-constant/router-constant';

// Interface pour un Candidat
interface Candidat {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  ville: string;
  statut: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  public structuresNames: string[] = [];
  public structureChoisi: string = '';
  public menuItems: {
    name: string;
    url: string;
    selected: boolean;
    hovered: boolean;
  }[] = [];
  public structures: any[] = [];
  totalCandidats: number = 0;
  totalStructures: number = 0;
  totalEmployes: number = 0;
  totalParents: number = 0;



  // Typage explicite pour `activitesRecentes`
  activitesRecentes = {
    candidats: [] as Candidat[],  // On précise que c'est un tableau de Candidat
    structures: [] as string[],
    parents: [] as any[],   // Typage possible : `as Parent[]` si tu en as un
    employes: [] as any[],// Ajout d'un tableau de structures
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private structureControllerService: StructureRestControllerService,
    private candidateAdminService: CandidateRestControllerService,
    private personRestControllerService: PersonRestControllerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRecentActivities();
    this.loadStructures();
    this.getAllCandidats();
    this.getAllStructures();
    this.getAllEmployes();
    this.getAllParents();
  }

  // Navigation vers différentes pages
  navigateToStructure(): void {
    this.router.navigate(['../', ROUTES_ADMIN.STRUCTURE], { relativeTo: this.route });
  }

  navigateToVilles(): void {
    this.router.navigate(['../', ROUTES_ADMIN.CITY], { relativeTo: this.route });
  }

  navigateToCandidats(): void {
    this.router.navigate(['../', ROUTES_ADMIN.CANDIDATE], { relativeTo: this.route });
  }

  navigateToEmployes(): void {
    this.router.navigate(['../', ROUTES_ADMIN.EMPLOYEE_LIST], { relativeTo: this.route });
  }

  navigateToParents(): void {
    this.router.navigate(['../', ROUTES_ADMIN.PARENTS_ADMIN], { relativeTo: this.route });
  }


  // Récupération des activités récentes
  getRecentActivities() {
    // Récupération des candidats
    this.candidateAdminService.getAll().subscribe(
      (response: any) => {
        if (response.success) {
          const data = response.data;
          // Transformation des données pour qu'elles correspondent à l'interface Candidat
          this.activitesRecentes.candidats = data.map((candidat: any) => ({
            id: candidat.id,
            nom: candidat.lastName,
            prenom: candidat.firstName,
            email: candidat.email,
            ville: candidat.city || 'Ville inconnue',
            statut: candidat.statut || 'Statut inconnu',
          }));
          this.personRestControllerService.getAllParents().subscribe((parents: any) => {
            this.activitesRecentes.parents = parents.slice(-5).reverse(); // derniers parents
          });
          this.personRestControllerService.getAll1().subscribe((response: any) => {
            if (response.success) {
              this.activitesRecentes.employes = response.data.slice(-5).reverse(); // derniers employés
            }
          });


        } else {
          this.toast.error('Erreur lors de la récupération des candidats');
        }
      },
      (error) => {
        this.toast.error('Erreur lors de la récupération des candidats');
      }
    );



  }






  // Récupération de toutes les structures (affichage sous forme de cartes)
  loadStructures(): void {
    console.log("Chargement des structures ...");

    this.structureControllerService.getAllStructures().subscribe(
      (structures: any) => {
        console.log('Structures récupérées:', structures);

        if (Array.isArray(structures)) {
          this.structures = structures;
          this.activitesRecentes.structures = structures.map((s: any) => s.structureName);
        } else {
          this.structures = [];
          this.activitesRecentes.structures = [];
          this.toast.warning('Aucune structure trouvée');
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des structures', error);
        this.structures = [];
        this.activitesRecentes.structures = [];
        this.toast.error('Erreur lors du chargement des structures');
      }
    );
  }


  getAllCandidats(): void {
    this.candidateAdminService.getAll().subscribe(
      (response: any) => {
        if (response.success) {
          this.totalCandidats = response.data.length;
        } else {
          this.toast.error('Erreur lors de la récupération des candidats');
          this.totalCandidats = 0;
        }
      },
      (error) => {
        this.toast.error('Erreur lors de la récupération des candidats');
        this.totalCandidats = 0;
      }
    );
  }

  getAllStructures(): void {
    this.structureControllerService.getAllStructures().subscribe(
      (structures: any[]) => {
        if (Array.isArray(structures)) {
          this.totalStructures = structures.length;
        } else {
          this.toast.warning('Aucune structure trouvée');
          this.totalStructures = 0;
        }
      },
      (error) => {
        this.toast.error('Erreur lors du chargement des structures');
        this.totalStructures = 0;
      }
    );
  }

  getAllEmployes(): void {
    this.personRestControllerService.getAll1().subscribe(
      (response: any) => {
          this.totalEmployes = response.data.length;
      });
  }

  getAllParents(): void {
    this.personRestControllerService.getAllParents().subscribe((response : any) => {
      this.totalParents = response.data.length ;
    });
  }





}
