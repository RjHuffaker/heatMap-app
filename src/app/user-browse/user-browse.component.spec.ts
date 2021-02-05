import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBrowseComponent } from './user-browse.component';

describe('UserBrowseComponent', () => {
  let component: UserBrowseComponent;
  let fixture: ComponentFixture<UserBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
