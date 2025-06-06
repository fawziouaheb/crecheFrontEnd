import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-page-promotion-company',
  templateUrl: './page-promotion-company.component.html',
  styleUrl: './page-promotion-company.component.css',
})
export class PagePromotionCompanyComponent implements OnInit, OnDestroy {
  editor: Editor = new Editor();
  html = '';
  ngOnInit(): void {
    this.editor = new Editor();
  }
  constructor() {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
