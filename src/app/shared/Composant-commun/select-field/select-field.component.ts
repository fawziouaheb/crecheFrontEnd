import { Component, Input, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
})
export class SelectFieldComponent {
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() options: { label: string; value: string }[] = [];

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
    return 'Champ invalide.';
  }
}
