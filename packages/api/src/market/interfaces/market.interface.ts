export interface MarketInterface {
  readonly _id?: string;
  readonly name: string;
  readonly image: string;
  readonly slug: string;
  readonly title: string;
  readonly address: string;
  readonly city: string;
  readonly branch_office: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly phone: string;
  readonly idUser: string;
  readonly createdAt: string;
}
