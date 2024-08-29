export interface PromotionCreate {
  awardId: number;
  name: string;
  points: number;
  active: boolean;  
  storeId: number;
}