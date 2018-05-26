import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtestViewComponent } from './atest-view.component';

describe('AtestViewComponent', () => {
  let component: AtestViewComponent;
  let fixture: ComponentFixture<AtestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
