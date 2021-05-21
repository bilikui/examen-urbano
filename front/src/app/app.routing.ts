import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// Importo mis componentes
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteNewComponent } from './components/cliente-new/cliente-new.component';
import { GrupoClienteComponent } from './components/grupo-cliente/grupo-cliente.component';

const appRoutes: Routes = [
    {path: 'cliente', component: ClienteComponent},
    {path: 'cliente/new', component: ClienteNewComponent},
    {path: 'cliente/show/:id', component: ClienteComponent},
    {path: 'cliente/update/:id', component: ClienteComponent},
    {path: 'cliente/delete/:id', component: ClienteComponent},
    {path: 'grupo-cliente', component: GrupoClienteComponent},
    {path: 'grupo-cliente/new', component: GrupoClienteComponent},
    {path: 'grupo-cliente/show/:id', component: GrupoClienteComponent},
    {path: 'grupo-cliente/update/:id', component: GrupoClienteComponent},
    {path: 'grupo-cliente/delete/:id', component: GrupoClienteComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
