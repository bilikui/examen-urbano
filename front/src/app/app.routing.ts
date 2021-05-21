import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// Importo mis componentes
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteNewComponent } from './components/cliente-new/cliente-new.component';
import { GrupoClienteComponent } from './components/grupo-cliente/grupo-cliente.component';
import { GrupoClienteNewComponent} from './components/grupo-cliente-new/grupo-cliente-new.component';
 
const appRoutes: Routes = [
    {path: 'cliente', component: ClienteComponent},
    {path: 'cliente/new', component: ClienteNewComponent},
    {path: 'cliente/new/:id', component: ClienteNewComponent},
    {path: 'grupo-cliente', component: GrupoClienteComponent},
    {path: 'grupo-cliente/new', component: GrupoClienteNewComponent},
    {path: 'grupo-cliente/new/:id', component: GrupoClienteNewComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
