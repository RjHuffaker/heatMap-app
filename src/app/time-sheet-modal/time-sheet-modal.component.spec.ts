import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetModalComponent } from './time-sheet-modal.component';

describe('TimeSheetModalComponent', () => {
  let component: TimeSheetModalComponent;
  let fixture: ComponentFixture<TimeSheetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
