import { FC, useEffect, useMemo, useState } from "react";

import { Flex, Image, Typography } from "antd";
import {
  Currency,
  Filter as FilterType,
  Order,
} from "./coins-markets-table.types";
import { Filter } from "./filter";

const { Title, Text } = Typography;

import type { TableProps } from "antd";
import { Table } from "antd";
import { DEFAULT_URL_SP, URL } from "./constants";

interface DataType {
  id: string;
  image: string;
  name: number;
  current_price: number;
  circulating_supply: number;
}

const getData = async ({ vs_currency, order, page }: FilterType) => {
  return await fetch(
    URL +
      new URLSearchParams({
        ...DEFAULT_URL_SP,
        vs_currency,
        order,
        page: page.toString(),
      }).toString()
  ).then((response) => {
    return response.json();
  });
};

const CoinsMarketsTable: FC = () => {
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
        render: (_, { name, image }) => (
          <Flex gap={16} align="center">
            <Image width={32} src={image} />
            <Text>{name}</Text>
          </Flex>
        ),
      },
      {
        key: "current_price",
        title: "Current Price",
        dataIndex: "current_price",
        render: (price) => `${price} ${filter.vs_currency}`,
      },
      {
        key: "circulating_supply",
        title: "Circulating Supply",
        dataIndex: "circulating_supply",
      },
    ],
    [filter.vs_currency]
  );

  return (
    <main>
      <Title level={2}>Coins & Markets</Title>

      <Flex vertical gap={24}>
        <Filter
          onChange={({ key, value }) => setFilter({ ...filter, [key]: value })}
        />

        <Table<DataType>
          rowKey={(key) => key.id}
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          pagination={{
            pageSize: filter.per_page,
            current: filter.page,
            total: 10000,
            pageSizeOptions: [5, 10, 20, 50, 100],

            onChange: (page, per_page) =>
              setFilter({ ...filter, page, per_page }),
          }}
        />
      </Flex>
    </main>
  );
};

export { CoinsMarketsTable };
