import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallScriptReadComponent } from './call-script-read.component';

describe('CallScriptReadComponent', () => {
  let component: CallScriptReadComponent;
  let fixture: ComponentFixture<CallScriptReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallScriptReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallScriptReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
