import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTarificationComponent } from './page-tarification.component';

describe('PageTarificationComponent', () => {
  let component: PageTarificationComponent;
  let fixture: ComponentFixture<PageTarificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageTarificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageTarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
