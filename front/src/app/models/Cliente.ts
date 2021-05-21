import GrupoCliente  from '../models/GrupoCliente';

export default class Cliente 
{
    public id?: number;
    public grupoCliente: GrupoCliente;
    public nombre: string;
    public apellido: string;
    public email: string;
    public observaciones?: string;

    constructor(id: number, nombre: string, apellido: string, email: string, grupoCliente: GrupoCliente, observaciones?: string) {
        this.id = id; 
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.observaciones = observaciones;
        this.grupoCliente = grupoCliente;
    }

    getNombreApellido() {
        return this.nombre + ' ' + this.apellido;
    }

}