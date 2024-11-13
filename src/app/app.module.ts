import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./generated/nav-bar/nav-bar.component";
import { SideBarComponent } from "./generated/side-bar/side-bar.component";
import { FormsComponent } from "./components/forms/forms.component";
import { CardsComponent } from "./components/menu/cards.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ThreeJsAnimationComponent } from "./components/threejs-animation/threejs-animation.component";
import { NgxSpinnerModule } from 'ngx-spinner';
import { HearLoadingComponent } from './generated/hear-loading/hear-loading.component';
import { IngresosPendientesComponent } from "./components/list_pending/list-pending";
import { DetallesInventarioComponent } from "./components/specific/detalles-inventario/detalles-inventario.component";
import { FirmasDocsComponent } from "./components/firmas-docs/firmas-docs.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    FormsComponent,
    IngresosPendientesComponent, // Declarar aquí el componente
    CardsComponent,
    ThreeJsAnimationComponent,
    HearLoadingComponent,
    DetallesInventarioComponent,
    FirmasDocsComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot()
  ],
  exports: [
    ThreeJsAnimationComponent,
    HearLoadingComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
