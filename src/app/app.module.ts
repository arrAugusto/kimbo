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

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    FormsComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule, // Agrega FormsModule si usas formularios template-driven
    ReactiveFormsModule, // Agrega ReactiveFormsModule si usas formularios reactivos
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
