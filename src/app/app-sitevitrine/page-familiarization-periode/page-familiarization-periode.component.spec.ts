import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFamiliarizationPeriodeComponent } from './page-familiarization-periode.component';

describe('PageFamiliarizationPeriodeComponent', () => {
  let component: PageFamiliarizationPeriodeComponent;
  let fixture: ComponentFixture<PageFamiliarizationPeriodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageFamiliarizationPeriodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageFamiliarizationPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
