import { Component, OnInit } from '@angular/core';
import {
  ParentFeedbackRestControllerService,
} from '../../api-client';


interface ParentFeedback {
  parentName?: string;
  date?: string;
  rating?: number;
  message?: string;
}

@Component({
  selector: 'app-page-avis-de-parents',
  templateUrl: './page-avis-de-parents.component.html'
})
export class PageAvisDeParentsComponent implements OnInit {
  feedbacks: ParentFeedback[] = [];
  newFeedback: Omit<ParentFeedback, 'id'|'date'> = {
    parentName: '',
    rating: 5,
    message: ''
  };

  constructor(
    private feedbackService: ParentFeedbackRestControllerService
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => {
        this.feedbacks = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des avis', err);
        // Gérer l'erreur (affichage à l'utilisateur)
      }
    });
  }

  submitAvis(): void {
    this.feedbackService.createFeedback({
      ...this.newFeedback,
      date: new Date().toISOString() // Optionnel - peut être géré côté serveur
    } as ParentFeedback).subscribe({
      next: (newFeedback) => {
        this.feedbacks.unshift(newFeedback);
        this.resetForm();
      },
      error: (err) => {
        console.error("Erreur lors de l'envoi de l'avis", err);
        // Gérer l'erreur (affichage à l'utilisateur)
      }
    });
  }

  resetForm(): void {
    this.newFeedback = {
      parentName: '',
      rating: 5,
      message: ''
    };
  }

  // Méthodes pour l'affichage des étoiles
  getStars(rating?: number): number[] {
    return Array(rating ?? 0).fill(0);
  }

  getEmptyStars(rating?: number): number[] {
    return Array(5 - (rating ?? 0)).fill(0);
  }



}
