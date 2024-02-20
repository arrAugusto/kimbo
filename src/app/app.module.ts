import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FormsComponent } from './components/card-body/forms/forms.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    FormsComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Agrega RouterModule a los imports
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
