import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationCardCrecheComponent } from './presentation-card-creche.component';

describe('PresentationCardCrecheComponent', () => {
  let component: PresentationCardCrecheComponent;
  let fixture: ComponentFixture<PresentationCardCrecheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresentationCardCrecheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentationCardCrecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
