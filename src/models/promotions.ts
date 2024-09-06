export interface PromotionCreate {
  awardId: number;
  name: string;
  points: number;
  active: boolean;  
  storeId: number;
  maxWinners: number;
}

export interface PromotionUpdate  extends PromotionCreate {
  id: number,
}