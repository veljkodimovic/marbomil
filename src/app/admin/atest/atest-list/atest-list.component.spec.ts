import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtestListComponent } from './atest-list.component';

describe('AtestListComponent', () => {
  let component: AtestListComponent;
  let fixture: ComponentFixture<AtestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
