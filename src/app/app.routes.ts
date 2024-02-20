import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsComponent } from './components/card-body/forms/forms.component';

export const routes: Routes = [
  { path: 'forms', component: FormsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
