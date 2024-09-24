import ReactCodeMirror from "@uiw/react-codemirror";
import { FC } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { Flex, Typography } from "antd";
import { SOURCE_CODE } from "./source-code";

const { Title } = Typography;

const AppSourceCode: FC = () => {
  return (
    <Flex vertical>
      <Title level={2}>App source code</Title>

      <ReactCodeMirror
        value={SOURCE_CODE}
        height="1000px"
        extensions={[javascript({ jsx: true })]}
      />
    </Flex>
  );
};

export { AppSourceCode };
