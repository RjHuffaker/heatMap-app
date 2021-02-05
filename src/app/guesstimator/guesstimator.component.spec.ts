import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuesstimatorComponent } from './guesstimator.component';

describe('GuesstimatorComponent', () => {
  let component: GuesstimatorComponent;
  let fixture: ComponentFixture<GuesstimatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuesstimatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuesstimatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
