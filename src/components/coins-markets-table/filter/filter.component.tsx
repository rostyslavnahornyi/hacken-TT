import { Flex, Select } from "antd";
import { FC } from "react";
import { Currency, FilterKey, Order } from "../coins-markets-table.types";
import { FilterProps, Option } from "./filter.types";

const CURRENCY_FILTER_OPTIONS: Option[] = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
];

const ORDER_FILTER_OPTIONS: Option[] = [
  { value: "market_cap_desc", label: "Market cap descending" },
  { value: "market_cap_asc", label: "Market cap ascending" },
];

const Filter: FC<FilterProps> = ({ onChange }) => {
  return (
    <Flex gap={24}>
      <Select
        defaultValue={Currency.USD}
        style={{ width: 200 }}
        onChange={(value) => onChange({ key: FilterKey.CURRENCY_KEY, value })}
        options={CURRENCY_FILTER_OPTIONS}
      />
      <Select
        defaultValue={Order.DESC}
        style={{ width: 200 }}
        onChange={(value) => onChange({ key: FilterKey.ORDER_KEY, value })}
        options={ORDER_FILTER_OPTIONS}
      />
    </Flex>
  );
};

export { Filter };
