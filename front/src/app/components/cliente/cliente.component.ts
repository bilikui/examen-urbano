import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import Cliente from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';

declare var $: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ClienteService]
})
export class ClienteComponent implements OnInit {

  public clientes = new Array<Cliente>();

  constructor(private _route: ActivatedRoute, private _router: Router, private _clienteService: ClienteService) {
  }

  ngOnInit(): void {

    this.clientes = this._clienteService.fetchAll();
  }

  new() {
    this._router.navigate(['/cliente/new']);    
  }

  update(id: any) {
    this._router.navigate(['/cliente/new', id]);
  }

  delete(id: any) {
    if (confirm('¿Desea borrar el registro?')) {
      this._clienteService.delete(id);
      alert("Se ha borrado el registro correctamente.");
      window.location.reload();
    }
  }



}
