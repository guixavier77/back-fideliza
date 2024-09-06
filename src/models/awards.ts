export interface AwardCreate {
  storeId: number,
  name: string,
  price: number,
  active: boolean,
  image_url: string,
}

export interface AwardUpdate extends AwardCreate {
  id: number;
}