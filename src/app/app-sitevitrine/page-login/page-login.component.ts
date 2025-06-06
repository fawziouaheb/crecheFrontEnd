import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestDto, AuthRestControllerService } from '../../api-client';
import { Subscription } from 'rxjs';
import { authentification } from '../../store/authentification/auth.actions';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
})
export class PageLoginComponent {
  loginForm!: FormGroup;
  private _subs: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    private loginService: AuthRestControllerService,
    private router: Router,
    private store: Store
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitLogin();
    } else {
      this.errorMessage = 'Veuillez remplir correctement les champs.';
    }
  }

  private submitLogin(): void {
    if (this.loginForm.valid) {
      const request: AuthRequestDto = {
        username: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value,
      };
      this.store.dispatch(authentification({ request }));
    }
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
