export class CreatePriceDTO {
  readonly _id?: string;
  readonly idProduct: string;
  readonly idMarket: string;
  readonly value: number;
  readonly createdAt: string;
}
