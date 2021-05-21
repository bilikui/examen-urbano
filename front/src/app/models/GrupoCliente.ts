import Cliente from '../models/Cliente';

export default class GrupoCliente 
{
    public id?: number;
    public nombre?: string;
    
    constructor(id?: number, nombre?: string) {
        this.id = id;
        this.nombre = nombre;
    }
}