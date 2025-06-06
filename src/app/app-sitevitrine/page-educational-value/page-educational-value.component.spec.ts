import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEducationalValueComponent } from './page-educational-value.component';

describe('PageEducationalValueComponent', () => {
  let component: PageEducationalValueComponent;
  let fixture: ComponentFixture<PageEducationalValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageEducationalValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageEducationalValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
