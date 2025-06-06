import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormManagerService {
  constructor(private fb: FormBuilder) {}

  createContactForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Email valide
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Téléphone à 10 chiffres
      message: ['', [Validators.required, Validators.minLength(1)]], // Minimum 10 caractères
    });
  }
}
