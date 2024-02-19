import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'hello', component: HelloComponent },
  // Otras rutas si las tienes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
