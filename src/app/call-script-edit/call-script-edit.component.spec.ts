import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallScriptEditComponent } from './call-script-edit.component';

describe('CallScriptEditComponent', () => {
  let component: CallScriptEditComponent;
  let fixture: ComponentFixture<CallScriptEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallScriptEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallScriptEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
