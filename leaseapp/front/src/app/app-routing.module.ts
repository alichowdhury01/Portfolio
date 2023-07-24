import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaseFormComponent } from './components/lease-form/lease-form.component';

const routes: Routes = [
  { path: '', component: LeaseFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
