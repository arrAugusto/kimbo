import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HelloComponent } from './hello/hello.component';

@NgModule({
  declarations: [AppComponent, HelloComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Agrega RouterModule a los imports
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
