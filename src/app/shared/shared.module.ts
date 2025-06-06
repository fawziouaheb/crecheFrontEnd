import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AppTitreComponent } from './Composant-commun/app-titre/app-titre.component';
import { InputTextWithErrorComponent } from './Composant-commun/input-text-with-error/input-text-with-error.component';
import { ButtonCardComponent } from './Composant-commun/button-card/button-card.component';
import { PresentationCardCrecheComponent } from './Composant-commun/presentation-card-creche/presentation-card-creche.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMessageDisplayComponent } from './Composant-commun/app-message-display/app-message-display.component';
import { InputFieldComponent } from './Composant-commun/input-field/input-field.component';
import { SelectFieldComponent } from './Composant-commun/select-field/select-field.component';
import { ToastrModule } from 'ngx-toastr';
import { DataTableComponent } from './Composant-commun/data-table/data-table.component';

@NgModule({
  declarations: [
    AppTitreComponent,
    InputTextWithErrorComponent,
    ButtonCardComponent,
    PresentationCardCrecheComponent,
    AppMessageDisplayComponent,
    InputFieldComponent,
    SelectFieldComponent,
    DataTableComponent,
  ],
  exports: [
    AppTitreComponent,
    InputTextWithErrorComponent,
    ButtonCardComponent,
    PresentationCardCrecheComponent,
    AppMessageDisplayComponent,
    InputFieldComponent,
    SelectFieldComponent,
    DataTableComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, ReactiveFormsModule],
})
export class SharedModule {}
