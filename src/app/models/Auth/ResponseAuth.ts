import { TransactionGroup } from "./TransactionGroup";

export interface ResponseAuth{
    codeResponse: string;
    messageResponse: string;
    data: TransactionGroup[][];    
}