import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementDetailsMoreComponent } from './requirement-details-more.component';

describe('RequirementDetailsMoreComponent', () => {
  let component: RequirementDetailsMoreComponent;
  let fixture: ComponentFixture<RequirementDetailsMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementDetailsMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementDetailsMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
