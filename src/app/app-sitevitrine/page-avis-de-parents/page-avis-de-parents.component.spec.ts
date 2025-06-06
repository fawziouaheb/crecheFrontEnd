import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAvisDeParentsComponent } from './page-avis-de-parents.component';

describe('PageAvisDeParentsComponent', () => {
  let component: PageAvisDeParentsComponent;
  let fixture: ComponentFixture<PageAvisDeParentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAvisDeParentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageAvisDeParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
