import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteNewComponent } from './components/cliente-new/cliente-new.component';
import { GrupoClienteComponent } from './components/grupo-cliente/grupo-cliente.component';
import { GrupoClienteNewComponent } from './components/grupo-cliente-new/grupo-cliente-new.component';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    GrupoClienteComponent,
    ClienteNewComponent,
    GrupoClienteNewComponent
  ],
  imports: [
    BrowserModule, 
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
