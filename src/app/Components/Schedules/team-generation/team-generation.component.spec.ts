import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGenerationComponent } from './team-generation.component';

describe('TeamGenerationComponent', () => {
  let component: TeamGenerationComponent;
  let fixture: ComponentFixture<TeamGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
