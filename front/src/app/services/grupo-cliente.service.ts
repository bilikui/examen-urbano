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

    find(id: number): any {
        let _grupoCliente: any;
        let _data = {id: id};
        let self = this;
        $.ajax({
            url: '/examen/back/grupo-cliente/find',
            type: 'get',
            data: _data,
            dataType: 'json',
            async: false,
            success: function(response: any) {
                if (response.status == 'ok') {
                    _grupoCliente = self._dataBinding(response.data);
                }
            }
        });
        return _grupoCliente;
    }
    save(grupoCliente: GrupoCliente): boolean {
        let _response = false;
        $.ajax({
            url: '/examen/back/grupo-cliente/save',
            type: 'post',
            data: grupoCliente,
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
            url: '/examen/back/grupo-cliente/delete',
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

    search(field: string, search: string) {
        let _gruposClientes = Array<GrupoCliente>();
        let _grupoCliente = new GrupoCliente();
        let self = this;
        let _data = {field: field, search: search};
        $.ajax({
            url: '/examen/back/grupo-cliente/search',
            type: 'get',
            data: _data,
            dataType: 'json',
            async: false,
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