import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCareComponent } from './page-care.component';

describe('PageCareComponent', () => {
  let component: PageCareComponent;
  let fixture: ComponentFixture<PageCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageCareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
