import { Component, OnInit } from '@angular/core';
import GrupoCliente from '../../models/GrupoCliente';
import { GrupoClienteService } from '../../services/grupo-cliente.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-grupo-cliente-new',
  templateUrl: './grupo-cliente-new.component.html',
  styleUrls: ['./grupo-cliente-new.component.css'],
  providers: [GrupoClienteService]
})
export class GrupoClienteNewComponent implements OnInit {

  public grupoCliente: GrupoCliente;
  public gruposClientes: Array<GrupoCliente>;
  public id: any;

  constructor(private _grupoClienteService: GrupoClienteService, private _router: Router, private _route: ActivatedRoute) { 
    this.grupoCliente = new GrupoCliente();
    this.gruposClientes = new Array<GrupoCliente>();
  }

  ngOnInit(): void {
    this.gruposClientes = this._grupoClienteService.fetchAll();
    this._route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    
    if (typeof this.id != 'undefined') {
      this.grupoCliente = this._grupoClienteService.find(this.id);      
    }
  }

  grupoClienteNewSubmit() {
    let response = this._grupoClienteService.save(this.grupoCliente);
    if (response) {
      alert("Se ha guardado el grupo de cliente correctamente.");
      this._router.navigate(['/grupo-cliente']);
    }
  }






}
