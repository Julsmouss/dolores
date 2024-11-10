export class CreateFinancialProductDto {
    readonly name: string;
    readonly bank_id: number;
    readonly category_id: number;
    readonly interest_rate: number;
    readonly image_url: string;
    readonly cashback: number;
    readonly benefits: string;
    readonly insurances: string;
    readonly requirements: string;
}