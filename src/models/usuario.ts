import { AutorizadoXUsuario } from "./autorizadoXUsuario";

export class usuario {
    idUser:number;
    login: string;
    password: string;
    roleId: number;
    isAdmin: string;
    cambioAlInicio: number;
    tipoEmpresa: number;
    tipodoc: number;
    numdoc: string;
    nombre: string;
    pais : string;
    codDepto: string;
    codigoDane: string;
    direccion: string;
    cargo: string;
    telefono: string;
    celular: string;
    email: string;
    //ConfirmaEmail solo existe en esta clase
    confirmaEmail: string;
    fechaCreacion: Date;
    estado: number;
    validoHasta: Date;
    codigoSeguridad: string;
    datosActualizados: number;
    vigenciaIndefinida: number;
    listAutorizados: AutorizadoXUsuario [] = [];
    estadoValidacion: string;
    nitEmpresa: string;
    nomEmpresa: string;
    nombres: string;
    apellidos: string;
    departamentoEmp: string;
    dv: string;
    ultimaConexion: Date;
    comentarios: string;
}