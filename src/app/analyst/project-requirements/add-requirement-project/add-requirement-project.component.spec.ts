import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequirementProjectComponent } from './add-requirement-project.component';

describe('AddRequirementProjectComponent', () => {
  let component: AddRequirementProjectComponent;
  let fixture: ComponentFixture<AddRequirementProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRequirementProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequirementProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
