import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/menu/cards.component';
import { FormsComponent } from './components/forms/forms.component';
import { HearLoadingComponent } from './generated/hear-loading/hear-loading.component';

const routes: Routes = [
  { path: 'forms/:id', component: FormsComponent },
  { path: 'menu/:id', component: CardsComponent },
  { path: 'loading', component: HearLoadingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })], // Agregar onSameUrlNavigation con valor 'reload'
  exports: [RouterModule],
})
export class AppRoutingModule {}
