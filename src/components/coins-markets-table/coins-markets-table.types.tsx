export enum FilterKey {
  CURRENCY_KEY = "vs_currency",
  ORDER_KEY = "order",
  PAGE_KEY = "page",
}

export enum Currency {
  USD = "usd",
  EUR = "eur",
}
export enum Order {
  ASC = "market_cap_asc",
  DESC = "market_cap_desc",
}

export type Filter = {
  vs_currency: Currency;
  order: Order;
  page: number;
  per_page: number;
};
