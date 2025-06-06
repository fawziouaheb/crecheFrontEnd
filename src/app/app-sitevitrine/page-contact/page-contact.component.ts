import { Component, OnInit } from '@angular/core';
import { FormManagerService } from './services/contact-form-manager.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ContactRestControllerService } from '../../api-client';

@Component({
  selector: 'app-page-contact',
  templateUrl: './page-contact.component.html',
  styleUrl: './page-contact.component.css',
})
export class PageContactComponent implements OnInit {
  contactForm!: FormGroup;
  public numeroTel: string = '09 56 74 28 33';
  successMessage: string = '';  // Message de succès
  errorMessage: string = '';    // Message d'erreur

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private contactService: ContactRestControllerService,
    private formManager: FormManagerService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formManager.createContactForm();
  }

  onSubmit(): void {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      // Appel au service pour soumettre le formulaire
      this.contactService.submitForm(formData).subscribe(
        (response: any) => {
          console.log('Réponse du serveur :', response);
          this.successMessage = response.message;  // Afficher le message de succès
          this.errorMessage = '';  // Réinitialiser le message d'erreur
          this.clearFormErrors();
          this.contactForm.reset(); // Réinitialiser le formulaire

          // Réinitialiser le message après 5 secondes
          setTimeout(() => {
            this.successMessage = '';
          }, 10000);
        },
        (error) => {
          console.error('Erreur reçue :', error);
          this.errorMessage = 'Une erreur est survenue lors de l’envoi du formulaire.'; // Afficher le message d'erreur
          this.successMessage = '';  // Réinitialiser le message de succès
        }
      );
    }
  }

  // Méthode pour effacer les erreurs sur tous les champs
  clearFormErrors() {
    Object.keys(this.contactForm.controls).forEach((controlName) => {
      const control = this.contactForm.get(controlName);
      if (control) {
        control.markAsPristine(); // Marque le champ comme non modifié
        control.markAsUntouched(); // Marque le champ comme non touché
        control.setErrors(null); // Efface toutes les erreurs
      }
    });
  }
}
