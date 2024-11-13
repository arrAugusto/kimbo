import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsComponent } from './components/forms/forms.component';
import { CardsComponent } from './components/menu/cards.component';
import { ThreeJsAnimationComponent } from './components/threejs-animation/threejs-animation.component';
import { IngresosPendientesComponent } from './components/list_pending/list-pending';
import { DetallesInventarioComponent } from './components/specific/detalles-inventario/detalles-inventario.component';
import { FirmasDocsComponent } from './components/firmas-docs/firmas-docs.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard, NoAuthGuard } from './login/AuthGuard';


export const routes: Routes = [
  { path: 'menu/:id/forms/:form', component: FormsComponent, canActivate: [AuthGuard] }, // Protegido
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },       // Protegido
  { path: 'menu/:id', component: CardsComponent, canActivate: [AuthGuard] },            // Protegido
  { path: 'loading', component: ThreeJsAnimationComponent },                            // Público
  { path: 'menu/:id/list_pending/:form/sub_form/:sub_form', component: IngresosPendientesComponent, canActivate: [AuthGuard] }, // Protegido
  { path: 'detalles', component: DetallesInventarioComponent, canActivate: [AuthGuard] }, // Protegido
  { path: 'validate', component: FirmasDocsComponent, canActivate: [AuthGuard] },       // Protegido
  { path: 'auth_login', component: LoginComponent, canActivate: [NoAuthGuard] },        // Público con guard
  { path: '**', redirectTo: '/auth_login' },                                            // Ruta comodín (404)
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
