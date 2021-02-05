import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechMapFilterComponent } from './tech-map-filter.component';

describe('TechMapFilterComponent', () => {
  let component: TechMapFilterComponent;
  let fixture: ComponentFixture<TechMapFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechMapFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechMapFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
