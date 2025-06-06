import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuRestControllerService } from '../../../api-client';

@Component({
  selector: 'app-admin-menu-week',
  templateUrl: './admin-menu-week.component.html',
  styleUrl: './admin-menu-week.component.css',
})
export class AdminMenuWeekComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private menuService: MenuRestControllerService,
    private toast: ToastrService
  ) {}

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  isModalOpen = false;
  selectedImage: string | null = null;

  title: string = '';
  personId: number = 7;

  menus: any[] = [];

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getAllMenus().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.menus = res.data;
          this.toast.success('Menus chargés avec succès');
        }
      },
      error: (err) => {
        this.toast.error('Erreur lors du chargement des menus');
        console.error('Erreur lors du chargement des menus', err);
      },
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.selectedFile || !this.title) {
      this.toast.error('Titre et image sont obligatoires');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('title', this.title);
    formData.append('personId', this.personId.toString());
    this.http
      .post('http://localhost:8080/admin/menu/upload', formData)
      .subscribe({
        next: () => {
          this.selectedFile = null;
          this.imagePreview = null;
          this.title = '';
          this.loadMenus(); // Recharge la liste après upload
        },
        error: (err) => {
          this.toast.error("Erreur lors de l'upload de l'image");
          console.error('Erreur upload', err);
        },
      });
  }
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedImage = null;
  }
  openImage(image: string): void {
    this.selectedImage = image;
    this.isModalOpen = true;
  }
  deleteMenu(menuId: number): void {
    // Demander confirmation à l'utilisateur
    if (confirm('Êtes-vous sûr de vouloir supprimer ce menu ?')) {
      this.menuService.deleteMenu(menuId).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success('Menu supprimé avec succès');
            this.loadMenus(); // Recharger les menus après suppression
          } else {
            this.toast.error('Erreur lors de la suppression du menu');
          }
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          this.toast.error('Erreur lors de la suppression du menu');
        },
      });
    }
  }
}
