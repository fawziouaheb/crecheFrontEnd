import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFicheCrecheComponent } from './page-fiche-creche.component';

describe('PageFicheCrecheComponent', () => {
  let component: PageFicheCrecheComponent;
  let fixture: ComponentFixture<PageFicheCrecheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageFicheCrecheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageFicheCrecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
