import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTeamProComponent } from './page-team-pro.component';

describe('PageTeamProComponent', () => {
  let component: PageTeamProComponent;
  let fixture: ComponentFixture<PageTeamProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageTeamProComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageTeamProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
