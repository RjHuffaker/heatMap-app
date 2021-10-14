import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallScriptAddComponent } from './call-script-add.component';

describe('CallScriptAddComponent', () => {
  let component: CallScriptAddComponent;
  let fixture: ComponentFixture<CallScriptAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallScriptAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallScriptAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
