import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import GrupoCliente from '../../models/GrupoCliente';
import { GrupoClienteService } from '../../services/grupo-cliente.service';

declare var $: any;

@Component({
  selector: 'app-grupo-cliente',
  templateUrl: './grupo-cliente.component.html',
  styleUrls: ['./grupo-cliente.component.css'],
  providers: [GrupoClienteService]
})
export class GrupoClienteComponent implements OnInit {

  public gruposClientes = new Array<GrupoCliente>();

  constructor(private _route: ActivatedRoute, private _router: Router, private _grupoClienteService: GrupoClienteService) {
  }

  ngOnInit(): void {

    this.gruposClientes = this._grupoClienteService.fetchAll();
  }

  new() {
    this._router.navigate(['/grupo-cliente/new']);    
  }
  update(id: any) {
    this._router.navigate(['/grupo-cliente/new', id]);
  }
  delete(id: any) {
    if (confirm('¿Desea borrar el registro?')) {
      this._grupoClienteService.delete(id);
      alert("Se ha borrado el registro correctamente.");
      window.location.reload();
    }
  }

  busqueda() {
    let search = $('#busqueda').val().trim();
    this.gruposClientes = this._grupoClienteService.search('nombre', search);
  }

  limpiarBusqueda() {
    $('#busqueda').val('');
    this.busqueda();
  }
}
