import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorpionMapComponent } from './scorpion-map.component';

describe('ScorpionMapComponent', () => {
  let component: ScorpionMapComponent;
  let fixture: ComponentFixture<ScorpionMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorpionMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorpionMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
