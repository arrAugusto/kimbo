export interface ResponseTransaction {
    codeResponse?: string;
    messageResponse?: string;
    data?: any[] | null; // Permite `null` además de `any[]`
    itemsFail?: any[] | null; // Permite `null` además de `any[]`
  }