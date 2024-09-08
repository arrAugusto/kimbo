import { PenddingIncome } from "./Pendding_income";

export interface ResponsePenddingIncome {
    codeResponse: string;
    messageResponse: string;
    data: PenddingIncome[];
}
