import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new BehaviorSubject<string>(''); // Valeur par défaut vide
  currentMessage = this.messageSource.asObservable();

  private successStatusSource = new BehaviorSubject<boolean>(true); // Par défaut, succès
  currentSuccessStatus = this.successStatusSource.asObservable();

  constructor() { }

  // Méthode pour changer le message
  changeMessage(message: string, isSuccess: boolean) {
    this.messageSource.next(message);
    this.successStatusSource.next(isSuccess);
    console.log(isSuccess) // Met à jour l'état de succès ou d'erreur
  }
}
