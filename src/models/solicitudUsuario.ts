export class solicitudUsuario {
    id: number;
    tipoSolicitud: string;
    login: number;
    roleId: number;
    tipoEmpresa: number;
    codEmpUsuario: number;
    tipoEmpAprueba: number;
    codEmpAprueba: number;
    tipodoc: number;
    numdoc: string;
    nombre: string;
    pais: string;
    depto: string;
    municipio: string;
    direccion: string;
    cargo: string;
    telefono: string;
    celular: string;
    email: string;
    confirmaEmail: string;
    estadoSolicitud: number;
    razonSolicitud: string;
    fechaSolicitud:Date;
    fechaProcesado:Date;
    nitProveedor: string;
    nomProveedor: string;
}