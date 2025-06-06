import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
    handleError(error: HttpErrorResponse): string {
        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          return `Error: ${error.error.message}`;
        } else {
          // Erreur côté serveur
          return `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }
      
}
