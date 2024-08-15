import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsComponent } from './components/forms/forms.component';
import { CardsComponent } from './components/menu/cards.component';
import { ThreeJsAnimationComponent } from './components/threejs-animation/threejs-animation.component';

export const routes: Routes = [
  { path: 'menu/:id/forms/:form', component: FormsComponent },
  { path: 'menu/:id', component: CardsComponent },
  { path: 'loading', component: ThreeJsAnimationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}