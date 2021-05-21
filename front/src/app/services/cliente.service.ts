import { Injectable } from '@angular/core';
import Cliente from '../models/Cliente';
import GrupoCliente from '../models/GrupoCliente';

declare var $: any;

@Injectable()
export class ClienteService {

    constructor() {
    }

    fetchAll(): Array<Cliente> {
        let _clientes = new Array<Cliente>();
        let _cliente: Cliente;
        let self = this;
        $.ajax({
            url: '/examen/back/cliente/fetchAll',
            type: 'get',
            dataType: 'json',
            success: function(response: any) {
                if (response.status == 'ok') {
                    let _item: any;
                    for(let i = 0; i < response.data.length; i++) {
                        _item = response.data[i];
                        _cliente = self._dataBinding(_item);
                        _clientes.push(_cliente);
                    }
                }
            }
        });

        return _clientes;
    }

    find(id: number): any {
        let _cliente: any;
        let _data = {id: id};
        let self = this;
        $.ajax({
            url: '/examen/back/cliente/find',
            type: 'get',
            data: _data,
            dataType: 'json',
            async: false,
            success: function(response: any) {
                if (response.status == 'ok') {
                    _cliente = self._dataBinding(response.data);
                }
            }
        });

        return _cliente;
    }

    save(cliente: Cliente): boolean {
        let _response = false;
        $.ajax({
            url: '/examen/back/cliente/save',
            type: 'post',
            data: cliente,
            dataType: 'json',
            async: false
        }).done(function(data: any, textStatus: any, jqXHR: any) {
            if (jqXHR.status == 200 && jqXHR.responseJSON.status == 'ok') {
                _response = true;
            }
        });

        return _response;
    }

    delete(id: number): boolean {
        let _response = false;
        let data = {id: id};
        $.ajax({
            url: '/examen/back/cliente/delete',
            type: 'delete',
            data: data,
            dataType: 'json',
            async: false 
        }).done(function(data: any, textStatus: any, jqXHR: any) {
            if (jqXHR.status == 200 && jqXHR.responseJSON.status == 'ok') {
                _response = true;
            }
        });

        return _response;
    }

    _dataBinding(data: any): Cliente {
        let _grupoCliente = new GrupoCliente(data.grupoCliente.id, data.grupoCliente.nombre);
        return new Cliente(data.id, data.nombre, data.apellido, data.email, _grupoCliente, data.observaciones);
    }
}