import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLayoutSitevitrineComponent } from './page-layout-sitevitrine.component';

describe('PageLayoutSitevitrineComponent', () => {
  let component: PageLayoutSitevitrineComponent;
  let fixture: ComponentFixture<PageLayoutSitevitrineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageLayoutSitevitrineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageLayoutSitevitrineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
