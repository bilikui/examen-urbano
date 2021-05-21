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

  public id = 0;
  public clientes = new Array<Cliente>();

  constructor(private _route: ActivatedRoute, private _router: Router, private _clienteService: ClienteService) {
  }

  ngOnInit(): void {

    this._route.params.subscribe((params: Params) => {
      this.id = params.id;
    });

    this.clientes = this._clienteService.fetchAll();
  }

  new() {
    this._router.navigate(['/cliente/new']);    
  }

  update() {
    let id = $("#btn-update-cliente").data('id');
    console.log( $("#btn-update-cliente") );
  }

  delete() {
    //console.log(id);
  }



}
