import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCardDayComponent } from './time-card-day.component';

describe('TimeCardDayComponent', () => {
  let component: TimeCardDayComponent;
  let fixture: ComponentFixture<TimeCardDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeCardDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeCardDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
