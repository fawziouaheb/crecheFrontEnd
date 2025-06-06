import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePromotionCompanyComponent } from './page-promotion-company.component';

describe('PagePromotionCompanyComponent', () => {
  let component: PagePromotionCompanyComponent;
  let fixture: ComponentFixture<PagePromotionCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagePromotionCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePromotionCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
