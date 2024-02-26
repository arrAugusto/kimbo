import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsComponent } from './components/forms/forms.component';
import { CardsComponent } from './components/cards/cards.component';

export const routes: Routes = [
  { path: 'forms/:id', component: FormsComponent },
  { path: 'menu/:id', component: CardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
