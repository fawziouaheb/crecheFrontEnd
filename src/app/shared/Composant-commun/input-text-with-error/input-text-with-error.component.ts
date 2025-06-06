import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text-with-error',
  templateUrl: './input-text-with-error.component.html',
  styleUrls: ['./input-text-with-error.component.scss'],
})
export class InputTextWithErrorComponent {
  @Input() control!: AbstractControl;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() inputType: string = '';

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  get isRequired(): boolean {
    return this.control.hasError('required');
  }

  getErrorMessage(): string {
    if (this.control.errors) {
      if (this.control.errors['required']) {
        return 'Ce champ est requis.';
      } else if (this.control.errors['minlength']) {
        return `Ce champ doit contenir au moins ${this.control.errors['minlength'].requiredLength} caractères.`;
      } else if (this.control.errors['email']) {
        return 'Veuillez entrer une adresse e-mail valide.';
      } else if (this.control.errors['pattern']) {
        return 'Format invalide.';
      }
    }
    return '';
  }
}
