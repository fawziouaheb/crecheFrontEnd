import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidateRestControllerService } from './api-client';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxEditorModule } from 'ngx-editor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/authentification/auth.reducer';
import { AuthEffects } from './store/authentification/auth.effects';
import { AuthInterceptor } from './app-authentification/interceptors/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppTestLayoutComponent } from './app-test-layout/app-test-layout.component';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, AppTestLayoutComponent],
  imports: [
    NgbModule,
    NgxEditorModule,
    EditorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ImageModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    SharedModule,
    ButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    CommonModule,
    DropdownModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      timeOut: 4000,
      closeButton: true,
      progressBar: false,
      enableHtml: true,
    }),
  ],
  providers: [
    CandidateRestControllerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
