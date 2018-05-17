import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { AdminComponent } from './admin.component';
import { QuoteService } from './quote.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          FlexLayoutModule,
          MaterialModule,
          SharedModule
        ],
        declarations: [AdminComponent],
        providers: [
          QuoteService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
