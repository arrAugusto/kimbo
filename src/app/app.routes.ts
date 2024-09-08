import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsComponent } from './components/forms/forms.component';
import { CardsComponent } from './components/menu/cards.component';
import { ThreeJsAnimationComponent } from './components/threejs-animation/threejs-animation.component';
import { IngresosPendientesComponent } from './components/ingresos-pendientes/ingresos-pendientes.component';

export const routes: Routes = [
  { path: 'menu/:id/forms/:form', component: FormsComponent },
  { path: 'menu/:id', component: CardsComponent },
  { path: 'loading', component: ThreeJsAnimationComponent },
  { path: 'menu/:id/ing_pendientes', component: IngresosPendientesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}