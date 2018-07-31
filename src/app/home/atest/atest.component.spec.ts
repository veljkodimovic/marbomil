import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtestComponent } from './atest.component';

describe('AtestComponent', () => {
  let component: AtestComponent;
  let fixture: ComponentFixture<AtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
