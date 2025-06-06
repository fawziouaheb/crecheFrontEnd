import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, catchError, EMPTY } from 'rxjs';
import {
  PasswordResetControllerService,
  ApiResponseObject,
} from '../../api-client';

@Component({
  selector: 'app-page-forget-password',
  templateUrl: './page-forget-password.component.html',
  styleUrl: './page-forget-password.component.css',
})
export class PageForgetPasswordComponent {
  resetRequestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resetPasswordControllerService: PasswordResetControllerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.resetRequestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.resetRequestForm.invalid) return;

    const email: string = this.resetRequestForm.value.email;

    this.resetPasswordControllerService
      .requestReset({ email })
      .pipe(
        map((response: ApiResponseObject) => {
          if (response.success) {
            this.toastr.success(response.message);
          } else {
            this.toastr.warning(response.message);
          }
          this.router.navigate(['/login']);
        }),
        catchError(() => {
          this.toastr.error('Une erreur est survenue.');
          return EMPTY; // ou return throwError(error);
        })
      )
      .subscribe();
  }
}
