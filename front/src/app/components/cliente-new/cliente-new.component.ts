import { Component, OnInit } from '@angular/core';
import Cliente from '../../models/Cliente';
import GrupoCliente from '../../models/GrupoCliente';
import { ClienteService } from '../../services/cliente.service';
import { GrupoClienteService } from '../../services/grupo-cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-new',
  templateUrl: './cliente-new.component.html',
  styleUrls: ['./cliente-new.component.css'],
  providers: [ClienteService, GrupoClienteService]
})
export class ClienteNewComponent implements OnInit {

  public cliente: Cliente;
  public gruposClientes: Array<GrupoCliente>;

  constructor(private _clienteService: ClienteService, private _grupoClienteService: GrupoClienteService, private _router: Router) { 
    this.cliente = new Cliente();
    this.gruposClientes = new Array<GrupoCliente>();
  }

  ngOnInit(): void {
    this.gruposClientes = this._grupoClienteService.fetchAll();
  }

  clienteNewSubmit() {
    let response = this._clienteService.save(this.cliente);
    if (response) {
      alert("Se ha guardado el cliente correctamente.");
      this._router.navigate(['/cliente']);
    }
  }



}
