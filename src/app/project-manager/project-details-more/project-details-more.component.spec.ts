import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsMoreComponent } from './project-details-more.component';

describe('ProjectDetailsMoreComponent', () => {
  let component: ProjectDetailsMoreComponent;
  let fixture: ComponentFixture<ProjectDetailsMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailsMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
