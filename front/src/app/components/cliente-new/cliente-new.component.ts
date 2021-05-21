import { Component, OnInit } from '@angular/core';
import Cliente from '../../models/Cliente';
import GrupoCliente from '../../models/GrupoCliente';
import { ClienteService } from '../../services/cliente.service';
import { GrupoClienteService } from '../../services/grupo-cliente.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-cliente-new',
  templateUrl: './cliente-new.component.html',
  styleUrls: ['./cliente-new.component.css'],
  providers: [ClienteService, GrupoClienteService]
})
export class ClienteNewComponent implements OnInit {

  public cliente: Cliente;
  public gruposClientes: Array<GrupoCliente>;
  public id: any;

  constructor(private _clienteService: ClienteService, private _grupoClienteService: GrupoClienteService, private _router: Router, private _route: ActivatedRoute) { 
    this.cliente = new Cliente(0, '', '', '', new GrupoCliente());
    this.gruposClientes = new Array<GrupoCliente>();
  }

  ngOnInit(): void {
    this.gruposClientes = this._grupoClienteService.fetchAll();
    this._route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    
    if (typeof this.id != 'undefined') {
      this.cliente = this._clienteService.find(this.id);      

      let self = this;
      $(document).ready(function(){
        $('select[name="grupoCliente"]').val(self.cliente.grupoCliente.id);
      });

    }
  }

  clienteNewSubmit() {
    let response = this._clienteService.save(this.cliente);
    if (response) {
      alert("Se ha guardado el cliente correctamente.");
      this._router.navigate(['/cliente']);
    }
  }



}
