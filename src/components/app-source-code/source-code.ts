export const SOURCE_CODE = `
import { Flex, Select } from "antd";
import { FC } from "react";
import { Currency, FilterKey, Order } from "../coins-markets-table.types";
import { FilterProps, Option } from "./filter.types";

const URL = "https://api.coingecko.com/api/v3/coins/markets?"
const DEFAULT_URL_SP = {
  sparkline: "false",
};

type Option = Pick<FieldNames, "value" | "label">;
type FilterProps = {
  onChange: (filter: { key: FilterKey; value: Currency | Order }) => void;
};

enum FilterKey {
  CURRENCY_KEY = "vs_currency",
  ORDER_KEY = "order",
  PAGE_KEY = "page",
}
enum Currency {
  USD = "usd",
  EUR = "eur",
}
enum Order {
  ASC = "market_cap_asc",
  DESC = "market_cap_desc",
}
type Filter = {
  vs_currency: Currency;
  order: Order;
  page: number;
  per_page: number;
};

const CURRENCY_FILTER_OPTIONS: Option[] = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
];

const ORDER_FILTER_OPTIONS: Option[] = [
  { value: "market_cap_desc", label: "Market cap descending" },
  { value: "market_cap_asc", label: "Market cap ascending" },
];

const App: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [tableData, setTableData] = useState<DataType[]>();
	const [filter, setFilter] = useState<FilterType>({
		vs_currency: Currency.USD,
		order: Order.DESC,
		page: 1,
		per_page: 10,
	});

	useEffect(() => {
		(async () => {
			try {
				const data = await getData(filter);
				setTableData(data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [filter]);

	const columns: TableProps<DataType>["columns"] = useMemo(
		() => [
			{
				key: "name",
				title: "Name",
				dataIndex: ["name", "image"],
				render: (_, { name, image }) => {
					return (
						<Flex gap={16} align="center">
							<Image width={32} src={image} />
							<Text>{name}</Text>
						</Flex>
					);
				},
			},
			{
				key: "current_price",
				title: "Current Price",
				dataIndex: "current_price",
				render: (price) => <>{price} {filter.vs_currency}</>,
			},
			{
				key: "circulating_supply",
				title: "Circulating Supply",
				dataIndex: "circulating_supply",
			},
		],
		[filter.vs_currency]
	);

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

	return <>
		<main>
			<Title level={2}>Coins & Markets</Title
			<Flex vertical gap={24}>
				<Filter
					onChange={({ key, value }) => setFilter({ ...filter, [key]: value })}
				/>
				<Table<DataType>
					columns={columns}
					dataSource={tableData}
					loading={isLoading}
					pagination={{
						pageSize: filter.per_page,
						current: filter.page,
						total: 10000,
						pageSizeOptions: [5, 10, 20, 50, 100]
						onChange: (page, per_page) =>
							setFilter({ ...filter, page, per_page }),
					}}
				/>
			</Flex>
		</main>
		<Flex vertical>
     	 <Title level={2}>App source code</Title>

     	 <ReactCodeMirror
        	value={SOURCE_CODE}
        	height="1000px"
        	extensions={[javascript({ jsx: true })]}
      	 />
    	</Flex>
	</>
}
`;
