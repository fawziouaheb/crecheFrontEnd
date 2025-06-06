import { Component, Input, Optional, SkipSelf } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  NgControl,
  ControlContainer,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent {
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() type: string = 'text';

  constructor(
    @Optional() @SkipSelf() private controlContainer: ControlContainer
  ) {}

  get control(): FormControl {
    return this.controlContainer?.control?.get(this.controlName) as FormControl;
  }

  get isRequired(): boolean {
    return this.control?.hasValidator?.(Validators.required) ?? false;
  }

  get showError(): boolean {
    return (
      this.control?.invalid && (this.control?.dirty || this.control?.touched)
    );
  }

  get errorMessage(): string {
    const errors = this.control?.errors;
    if (errors?.['required']) return 'Ce champ est requis.';
    if (errors?.['minlength'])
      return `Minimum ${errors['minlength'].requiredLength} caractères.`;
    if (errors?.['email']) return 'Email invalide.';
    return 'Champ invalide.';
  }
}
