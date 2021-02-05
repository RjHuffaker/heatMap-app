import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBroComponent } from './article-browse.component';

describe('ArticleListComponent', () => {
  let component: ArticleBroComponent;
  let fixture: ComponentFixture<ArticleBroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleBroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleBroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
