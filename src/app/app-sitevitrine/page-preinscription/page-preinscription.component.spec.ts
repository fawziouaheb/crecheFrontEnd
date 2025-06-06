import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePreinscriptionComponent } from './page-preinscription.component';

describe('PagePreinscriptionComponent', () => {
  let component: PagePreinscriptionComponent;
  let fixture: ComponentFixture<PagePreinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagePreinscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePreinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
