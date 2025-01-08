export interface IPosition {
  id: number;
  user: number;
  crypto_currency: number;
  quantity: number;
  purchase_price: number;
  invested_amount: number;
  purchase_date: Date;
  last_profit_price?: number;
  status: "active" | "closed";
  created_at: Date;
  updated_at: Date;
}
