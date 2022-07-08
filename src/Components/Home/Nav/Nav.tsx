
import React from "react";

import Text from "../../../_shared/Text/Text";
import { MenuOutlined } from "@ant-design/icons";

type NavProps = {
  toggleSideBar: () => void;
};
const Nav = (props: NavProps): JSX.Element => {
  const { toggleSideBar } = props

  return (
    <div className="nav">
      <MenuOutlined className="icon secondary" onClick={toggleSideBar} />
      <Text size="1.1rem" bd="700" align="left">
        FRONT-END DEVELOPERS
      </Text>
    </div>
  );
};

export default Nav;
