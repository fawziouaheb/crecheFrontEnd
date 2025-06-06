import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationCrecheSommaireComponent } from './presentation-creche-sommaire.component';

describe('PresentationCrecheSommaireComponent', () => {
  let component: PresentationCrecheSommaireComponent;
  let fixture: ComponentFixture<PresentationCrecheSommaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresentationCrecheSommaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentationCrecheSommaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
