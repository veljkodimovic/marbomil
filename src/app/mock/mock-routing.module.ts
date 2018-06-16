import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { MockComponent } from './mock.component';

const routes: Routes = Route.withShell([

  { path: 'mock', component: MockComponent, data: { title: extract('Mock') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MockRoutingModule { }
