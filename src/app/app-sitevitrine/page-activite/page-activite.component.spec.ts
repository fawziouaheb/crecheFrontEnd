import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageActiviteComponent } from './page-activite.component';

describe('PageActiviteComponent', () => {
  let component: PageActiviteComponent;
  let fixture: ComponentFixture<PageActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageActiviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
