import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReglementProtocoleComponent } from './page-reglement-protocole.component';

describe('PageReglementProtocoleComponent', () => {
  let component: PageReglementProtocoleComponent;
  let fixture: ComponentFixture<PageReglementProtocoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageReglementProtocoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageReglementProtocoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
