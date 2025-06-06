import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePreinscriptionCreationComponent } from './page-preinscription-creation.component';

describe('PagePreinscriptionCreationComponent', () => {
  let component: PagePreinscriptionCreationComponent;
  let fixture: ComponentFixture<PagePreinscriptionCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagePreinscriptionCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePreinscriptionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
