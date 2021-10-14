import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptEditComponent } from './prompt-edit.component';

describe('PromptEditComponent', () => {
  let component: PromptEditComponent;
  let fixture: ComponentFixture<PromptEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromptEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
