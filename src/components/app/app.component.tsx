import { FC } from "react";
import { CoinsMarketsTable } from "../coins-markets-table";
import { AppSourceCode } from "../app-source-code";

const App: FC = () => {
  return (
    <>
      <CoinsMarketsTable />
      <AppSourceCode />
    </>
  );
};

export { App };
