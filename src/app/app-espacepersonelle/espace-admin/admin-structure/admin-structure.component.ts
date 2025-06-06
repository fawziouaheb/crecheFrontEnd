import { Component, OnInit } from '@angular/core';
import { ApiResponseObject, StructureDto } from '../../../api-client';
import {
  CityRestControllerService,
  StructureRestControllerService,
} from '../../../api-client';
import { MessageService } from '../../../shared/Composant-commun/app-message-display/message.service';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import * as L from 'leaflet';
import Geocoder from 'leaflet-control-geocoder';
import { ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import 'leaflet-control-geocoder';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface MessageData {
  message: string;
  success: boolean;
}

@Component({
  selector: 'app-admin-structure',
  templateUrl: './admin-structure.component.html',
  styleUrl: './admin-structure.component.css',
})
export class AdminStructureComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  form!: FormGroup;


  structureNameError: string | null = null;
  selectedStructureId: number | null = null; // pour suivre l'ID en édition
  selectedCityId: number | null = null; // ID de la ville sélectionnée
  cities: { id: number; name: string }[] = []; // Liste des villes
  structures: StructureDto[] = []; // Liste des structures
  structureName: string = '';
  capacity: number = 0;
  adresse: string = '';
  mobile: string = '';
  statut: string = '';
  log: number = 0;
  lat: number = 0;
  private map!: L.Map;
  private marker!: L.Marker;


  description: string = ''; // Nouveau champ
  images: string[] = []; // Nouveau champ
  isEditMode: boolean = false; // Mode pour savoir si on est en édition ou ajout
  isModalOpen: boolean = false; // Suivi de l'état de la modale
  id: number = 0;
  selectedImages: File[] = [];
  avantages: string[] = []; // Modifier en tableau au lieu d'une string
  newAvantage: string = ''; // Champ temporaire pour ajouter un avantage
  imagePreviews: string[] = []; // Pour stocker l'aperçu des images
  timestamp: number = new Date().getTime();
  submitted = false;




  constructor(
    private cityRestControllerService: CityRestControllerService,
    private structureControllerService : StructureRestControllerService,
    private messageService: MessageService, // Service pour afficher les messages
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      structureName: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]],
      adresse: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^0[1-9]\d{8}$/)]], // Numéro FR
      selectedCityId: [null, Validators.required],

      // Champs optionnels
      statut: [''], // <-- facultatif
      description: [''],
      avantages: [[]],
      images: [[]],
      lat: [0],
      log: [0]
    });

    this.loadStructures();
    this.loadCities();
  }


  onSubmit() {
    this.submitted = true;

    if (this.form.invalid || this.avantages.length === 0) {
      return;  // Arrête si le form est invalide ou pas d'avantages
    }

    // Sinon, fais ton traitement
    console.log('Form validé, avantages:', this.avantages);
  }


  addAvantage(): void {
    if (this.newAvantage.trim()) {
      this.avantages.push(this.newAvantage.trim()); // Ajoute à la liste
      this.newAvantage = ''; // Réinitialise le champ
    }
  }

  // Fonction pour supprimer un avantage
  removeAvantage(index: number): void {
    this.avantages.splice(index, 1);
  }
  // Charger la liste des villes
  loadCities(): void {
    this.cityRestControllerService.getAllCities().subscribe((result: any) => {
      this.cities = result.data;
    });
  }

  // Charger la liste des structures
  loadStructures(): void {
    console.log("Chargement des structures ...");

    this.structureControllerService.getAllStructures().subscribe((structures:any) => {
      console.log(structures);
      this.structures = structures;
      this.cdr.detectChanges(); // Force la détection de changement

    });

    setTimeout(() => {
      console.log("📌 Mise à jour de la liste après suppression :", this.structures);
      this.cdr.detectChanges(); // Force Angular à rafraîchir l'affichage
    }, 500);

    this.timestamp = new Date().getTime();

  }
  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    if (files.length === 0) {
      console.error("Aucun fichier sélectionné.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.selectedImages.push(files[i]);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result); // Ajouter l'aperçu de chaque image
        this.cdr.detectChanges(); // Forcer la détection de changement si besoin
      };
      reader.readAsDataURL(files[i]);
    }
  }



  saveStructure(): void {
    const formValues = this.form.value;

    this.structureNameError = null;

    const nameExists = this.structures?.some(s =>
      s.structureName &&
      s.structureName.toLowerCase().trim() === this.structureName.toLowerCase().trim() &&
      (!this.isEditMode || s.id !== this.selectedStructureId)
    );


    if (nameExists) {
      this.structureNameError = 'Ce nom de structure existe déjà.';
      return;
    }

    const newStructure: StructureDto = {
      id: this.isEditMode ? this.id : 0,
      structureName: this.structureName,
      capacity: this.capacity,
      adresse: this.adresse,
      mobile: this.mobile,
      statut: this.statut,
      log: Number(this.log),
      lat: this.lat,
      avantages: this.avantages.join(','),
      description: this.description,
      images: this.images,
      cityId: this.selectedCityId !== null ? Number(this.selectedCityId) : undefined,
    };

    const saveOrUpdate = () => {
      if (this.isEditMode) {
        this.structureControllerService.updateStructure(newStructure).subscribe({
          next: () => {
            this.loadImages();
            this.loadStructures();
            this.closeModal();
          },
          error: (err) => console.error('Erreur lors de la mise à jour:', err)
        });
      } else {
        this.structureControllerService.createStructure(newStructure).subscribe({
          next: () => {
            this.loadImages();
            this.loadStructures();
            this.closeModal();
          },
          error: (err) => console.error("Erreur lors de la création:", err)
        });
      }
    };

    if (this.selectedImages.length > 0) {
      // Uploader toutes les images séquentiellement
      const uploadNext = (index: number) => {
        if (index >= this.selectedImages.length) {
          saveOrUpdate();
          return;
        }

        const formData = new FormData();
        formData.append('file', this.selectedImages[index], this.selectedImages[index].name);

        this.structureControllerService.uploadImages(this.id, formData.get('file') as Blob).subscribe({
          next: (response) => {
            if (response && response['imageUrl']) {
              this.images.push(response['imageUrl']);
            }
            uploadNext(index + 1);
          },
          error: (err) => {
            console.error("Erreur lors de l'upload de l'image:", err);
            alert("Erreur lors de l'upload de l'image. Veuillez réessayer.");
          }
        });
      };

      uploadNext(0);
    } else {
      saveOrUpdate();
    }
  }






  // Supprimer une image de la liste
  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }
  // Fermer la modale
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedImages = [];
    this.imagePreviews = [];
  }


  // Modifier la modale pour bien prendre en compte les avantages en tableau
  openModal(isEditMode: boolean = false, structure: StructureDto | null = null): void {
    this.isEditMode = isEditMode;
    this.structureNameError = null;
    if (isEditMode && structure) {
      this.selectedStructureId = structure.id ?? 0;
      this.structureName = structure.structureName ?? '';
      this.id = structure.id ?? 0;
      this.capacity = structure.capacity ?? 0;
      this.adresse = structure.adresse ?? '';
      this.mobile = structure.mobile ?? '';
      this.statut = structure.statut ?? '';
      this.log = Number(structure.log);
      this.lat = structure.lat ?? 0;
      this.avantages = structure.avantages ? structure.avantages.split(',') : []; // Convertir en tableau
      this.description = structure.description ?? '';
      this.images = structure.images || [];
      this.imagePreviews = [...this.images]; // Charger les aperçus
      this.selectedCityId = structure.cityId || null;
    } else {
      this.selectedStructureId = null;
      this.structureName = '';
      this.id = 0;
      this.capacity = 0;
      this.adresse = '';
      this.mobile = '';
      this.statut = '';
      this.log = 0;
      this.lat = 0;
      this.avantages = [];
      this.description = '';
      this.images = [];
      this.imagePreviews = [];
      this.selectedCityId = null;
    }
    this.isModalOpen = true;
    setTimeout(() => this.initMap(), 100);
  }

  // Mise à jour de l'enregistrement


  // Supprimer une structure
  deleteStructure(id: number): void {
    if (!id) {
      console.error("❌ ID de structure invalide :", id);
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer cette structure ?')) {
      console.log("🗑️ Suppression de la structure avec l'ID :", id);

      // 1️⃣ Sauvegarde de l'état initial du tableau des structures
      const previousStructures = [...this.structures];  // Sauvegarder la liste avant toute modification

      // 2️⃣ Appel au backend pour supprimer la structure
      this.structureControllerService.deleteStructure(id).subscribe({
        next: () => {
          console.log("✅ Structure supprimée avec succès !");
          // 3️⃣ Mise à jour locale seulement si la suppression a réussi côté serveur
          this.structures = this.structures.filter(structure => structure.id !== id);
          this.cdr.detectChanges(); // Met à jour l'affichage immédiatement
          alert("La structure a été supprimée avec succès.");
        },
        // 4️⃣ Restauration de l'état initial si la suppression échoue

      });
    }

  }


// Fonction pour charger les images
  loadImages(): void {
    this.structureControllerService.getImagesByStructure(this.id).subscribe((images: string[]) => {
      this.images = images;
      this.imagePreviews = images; // Met à jour l'aperçu des images dans le modal
    });
  }

  private initMap(): void {
    if (!this.mapContainer?.nativeElement) {
      console.error('Map container not found');
      return;
    }

    // Détruire l'ancienne carte
    if (this.map) {
      this.map.remove();
    }

    // Options de la carte
    const mapOptions: L.MapOptions = {
      center: [this.lat || 48.8566, this.log || 2.3522],
      zoom: 13,
      zoomControl: false, // On l'ajoutera manuellement
      preferCanvas: true, // Meilleures performances
      attributionControl: false // On l'ajoutera manuellement
    };

    // Création de la carte
    this.map = L.map(this.mapContainer.nativeElement, mapOptions);

    // Couche de tuiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Contrôle de zoom personnalisé
    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);

    const defaultIcon = L.divIcon({
      className: 'leaflet-div-icon',
      html: '<div style="background-color: red; width: 10px; height: 10px; border-radius: 50%;"></div>', // Exemple d'une icône vide, de forme ronde
      iconSize: [10, 10]
    });
    // Ajouter le marqueur par défaut
    this.marker = L.marker([this.lat, this.log], { icon: defaultIcon }).addTo(this.map);
    this.marker.bindPopup("<b>Votre emplacement actuel</b>").openPopup();
    // Géocodeur
    const geocoder = (L.Control as any).geocoder({
      defaultMarkGeocode: false,
      position: 'topleft',
      collapsed: false,
      placeholder: 'Rechercher une adresse...'
    }).addTo(this.map);

    // Événements
    geocoder.on('markgeocode', (e: any) => {
      const latlng = e.geocode.center;
      this.updateCoordinates(latlng);
      this.adresse = e.geocode.name || '';
      this.map.fitBounds(e.geocode.bbox);
    });

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.updateCoordinates(e.latlng);
    });




    // Redimensionnement après un délai
    setTimeout(() => {
      this.map.invalidateSize(true); // Force le redimensionnement

      if (this.lat && this.log) {
        this.map.setView([this.lat, this.log], 13, {
          animate: true
        });
      }
    }, 350); // Délai augmenté pour être sûr
  }

  // Ajouter un marqueur par défaut (sans icône personnalisée)
  private addDefaultMarker(lat: number, lng: number): void {
    // Si un marqueur existe déjà, on le déplace
    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
    } else {
      // Crée un nouveau marqueur sans icône personnalisée (icône par défaut)
      this.marker = L.marker([lat, lng]).addTo(this.map);

      // Ajouter un popup si nécessaire
      this.marker.bindPopup('<b>Point sur la carte</b>').openPopup();
    }
  }

// Fonction pour mettre à jour les coordonnées et déplacer le marqueur
  private updateCoordinates(latlng: L.LatLng): void {
    this.lat = latlng.lat;
    this.log = latlng.lng;

    // Déplacer le marqueur au nouvel emplacement
    this.addDefaultMarker(this.lat, this.log);
  }

  ngAfterViewInit(): void {
    // L'initialisation de la carte est maintenant gérée dans openModal()
  }

  private resetForm(): void {
    this.id = 0;
    this.structureName = '';
    this.capacity = 0;
    this.adresse = '';
    this.mobile = '';
    this.selectedCityId = null;
    this.statut = 'actif';
    this.description = '';
    this.avantages = [];
    this.images = [];
    this.imagePreviews = [];

    this.lat = 0;
    this.log = 0;
  }

}
