import { Component } from '@angular/core';
import { CityRestControllerService } from '../../../api-client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-ville',
  templateUrl: './admin-ville.component.html',
  styleUrl: './admin-ville.component.css',
})
export class AdminVilleComponent {
  cities: any[] = []; // Liste des villes
  cityName = ''; // Nom de la ville à ajouter ou modifier
  isEditMode = false; // Indique si on est en mode modification
  selectedCityId: number | null = null;
   // ID de la ville à modifier
  constructor(
    private cityRestControllerService: CityRestControllerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCities(); // Charger les villes au démarrage
  }

  loadCities(): void {
    this.cityRestControllerService.getAllCities().subscribe({
      next: (response : any) => {
        if (response.success) {
          this.cities = response.data;
          this.toast.success(
            response.message || 'Votre demande a été traité avec success.'
          );
        } else {
          this.toast.error(response.message || 'Une erreur s’est produite.');
        }
      },
      error: (error) => {
        this.toast.error('Une erreur s’est produite.');
      },
    });
  }
  openEditCityModal(city: any): void {
    this.isEditMode = true;
    this.cityName = city.name;
    this.selectedCityId = city.id;
    this.showModal();
  }

  openAddCityModal(): void {
    this.isEditMode = false;
    this.cityName = '';
    this.selectedCityId = null;
    this.showModal();
  }

  deleteCity(cityId: number): void {
    this.toast.error('La suppression de la ville n\'est pas encore implémentée.');
    // if (confirm('Êtes-vous sûr de vouloir supprimer cette ville ?')) {

    //   this.cityRestControllerService.deleteCity(cityId).subscribe(() => {
    //     this.loadCities();
    //   });
    // }
  }
  private showModal(): void {
    const modal = document.getElementById('cityModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  saveCity(): void {
    if (this.cityName.trim() === '') {
      this.toast.error('Le nom de la ville ne peut pas être vide.');
      return;
    }

    if (this.isEditMode && this.selectedCityId !== null) {
      const cityData = { id: this.selectedCityId, name: this.cityName };
      this.cityRestControllerService.updateCity(cityData).subscribe({
        next: (response : any) => {
          if (response.success) {
            this.loadCities();
            this.hideModal();
            this.toast.success(
              response.message || 'Votre demande a été traité avec success.'
            );
          } else {
            this.toast.error(response.message || 'Une erreur s’est produite.');
          }
        },
        error: (error) => {
          this.toast.error('Une erreur s’est produite.');
        },
      });
    } else {
      const cityData = { name: this.cityName };
      this.cityRestControllerService.addCity(cityData).subscribe({
        next: (response : any) => {
          
          if (response.success) {
            this.loadCities();
            this.hideModal();
            this.toast.success(
              response.message || 'Votre demande a été traité avec success.'
            );
          } else {
            this.toast.error(response.message || 'Une erreur s’est produite.');
          }
        },
        error: (error) => {
          this.toast.error('Une erreur s’est produite.');
        },
      });
    }
  }

  private hideModal(): void {
    const modal = document.getElementById('cityModal');
    if (modal) {
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
  }
}
