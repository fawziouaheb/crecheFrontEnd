import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // <-- correct import Validators
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApiResponseObject,
  PasswordResetControllerService,
} from '../../../api-client';
import { tap, catchError, EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-reset-password',
  templateUrl: './page-reset-password.component.html',
  styleUrls: ['./page-reset-password.component.css'], // petit fix ici aussi
})
export class PageResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token!: string;
  isTokenValide = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private resetPasswordService: PasswordResetControllerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    if (!this.token) {
      this.toastr.error('Token manquant, veuillez vous connecter.');
      this.router.navigate(['/login']);
      return;
    }

    this.resetPasswordService
      .validateResetToken(this.token)
      .pipe(
        tap((response: ApiResponseObject) => {
          if (response.success) {
            this.isTokenValide = true;
          } else {
            this.toastr.error(response.message);
            this.router.navigate(['/login']);
          }
        }),
        catchError(() => {
          this.toastr.error('Une erreur est survenue.');
          this.router.navigate(['/login']);
          return EMPTY;
        })
      )
      .subscribe();

    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { notMatching: true };
  }

  onSubmit() {
    if (this.resetForm.invalid) return;

    this.loading = true;

    const body = {
      token: this.token,
      newPassword: this.resetForm.get('password')?.value,
    };

    this.resetPasswordService
      .confirmReset(body)
      .pipe(
        tap((response: ApiResponseObject) => {
          if (response.success) {
            this.toastr.success(response.message);
            this.router.navigate(['/login']);
          } else {
            this.toastr.warning(response.message);
          }
        }),
        catchError(() => {
          this.toastr.error('Une erreur est survenue.');
          return EMPTY;
        })
      )
      .subscribe({
        complete: () => (this.loading = false),
        error: () => (this.loading = false),
      });
  }
}
