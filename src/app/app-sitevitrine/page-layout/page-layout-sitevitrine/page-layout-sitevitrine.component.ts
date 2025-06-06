import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page-layout-sitevitrine',
  templateUrl: './page-layout-sitevitrine.component.html',
  styleUrl: './page-layout-sitevitrine.component.css',
})
export class PageLayoutSitevitrineComponent {
  constructor(private router: Router, private modalService: NgbModal) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
