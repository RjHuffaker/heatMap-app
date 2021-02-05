import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigataComponent } from './navigata.component';

describe('NavigataComponent', () => {
  let component: NavigataComponent;
  let fixture: ComponentFixture<NavigataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
