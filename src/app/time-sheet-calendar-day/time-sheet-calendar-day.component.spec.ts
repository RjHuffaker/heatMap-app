import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetCalendarDayComponent } from './time-sheet-calendar-day.component';

describe('TimeSheetCalendarDayComponent', () => {
  let component: TimeSheetCalendarDayComponent;
  let fixture: ComponentFixture<TimeSheetCalendarDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetCalendarDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetCalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
