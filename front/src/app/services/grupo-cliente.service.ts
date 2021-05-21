import { Injectable } from '@angular/core';
import GrupoCliente from '../models/GrupoCliente';

declare var $: any;

@Injectable()
export class GrupoClienteService {

    constructor() {
    }

    fetchAll(): Array<GrupoCliente> {
        let _gruposClientes = Array<GrupoCliente>();
        let _grupoCliente = new GrupoCliente();
        let self = this;
        $.ajax({
            url: '/examen/back/grupo-cliente/fetchAll',
            type: 'get',
            dataType: 'json',
            success: function(response: any) {
                if (response.status == 'ok') {
                    let _item: any;
                    for(let i = 0; i < response.data.length; i++) {
                        _item = response.data[i];
                        _grupoCliente = self._dataBinding(_item);
                        _gruposClientes.push(_grupoCliente);
                    }
                }
            }
        });
        return _gruposClientes;
    }


    _dataBinding(data: any): GrupoCliente {
        return new GrupoCliente(data.id, data.nombre);
    }
}