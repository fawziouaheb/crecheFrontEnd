import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTitreComponent } from './app-titre.component';

describe('AppTitreComponent', () => {
  let component: AppTitreComponent;
  let fixture: ComponentFixture<AppTitreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppTitreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppTitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
