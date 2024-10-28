export interface PenddingIncome {
    id_transaccion: string;
    numeroFactura: string;
    fecha: string;
    bultos: number;
    valor: number;
    estado: string;

    usuario: string;
    estado_transaccion: string;
    referenciaUnica: string;
    config_form: string;

}