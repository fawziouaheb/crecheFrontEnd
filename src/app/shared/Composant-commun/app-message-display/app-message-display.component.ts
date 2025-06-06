import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message-display',
  templateUrl: './app-message-display.component.html',
  styleUrl: './app-message-display.component.css'
})
export class AppMessageDisplayComponent  implements OnInit {
 
  message: string = '';
  isSuccess: boolean = true; // Valeur par défaut

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // Souscription au message et au statut de succès/erreur
    this.messageService.currentMessage.subscribe(message => {
      this.message = message;
    });

    this.messageService.currentSuccessStatus.subscribe(status => {
      this.isSuccess = status;
    });
  }

  // Méthode pour fermer le message
  closeMessage(): void {
    this.message = '';  // Masquer le message
  }
}
