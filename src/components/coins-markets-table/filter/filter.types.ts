import { FieldNames } from "rc-select/lib/Select";
import { Currency, FilterKey, Order } from "../coins-markets-table.types";

type Option = Pick<FieldNames, "value" | "label">;

type FilterProps = {
  onChange: (filter: { key: FilterKey; value: Currency | Order }) => void;
};

export type { FilterProps, Option };
