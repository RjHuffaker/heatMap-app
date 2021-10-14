import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallScriptBrowseComponent } from './call-script-browse.component';

describe('CallScriptBrowseComponent', () => {
  let component: CallScriptBrowseComponent;
  let fixture: ComponentFixture<CallScriptBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallScriptBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallScriptBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
