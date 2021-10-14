import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptReadComponent } from './prompt-read.component';

describe('PromptReadComponent', () => {
  let component: PromptReadComponent;
  let fixture: ComponentFixture<PromptReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromptReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
