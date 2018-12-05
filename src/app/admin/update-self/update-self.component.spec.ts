import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSelfComponent } from './update-self.component';

describe('UpdateSelfComponent', () => {
  let component: UpdateSelfComponent;
  let fixture: ComponentFixture<UpdateSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
