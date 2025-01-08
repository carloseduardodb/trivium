export interface IProfitTake {
  id: number;
  position: number;
  amount_withdrawn: number;
  price_at_withdraw: number;
  remaining_value: number;
  withdraw_date: Date;
  created_at: Date;
  updated_at: Date;
}
