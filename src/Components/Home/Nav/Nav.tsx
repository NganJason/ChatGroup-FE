import React, { useContext } from "react";

import Text from "../../../_shared/Components/Text/Text";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { channelsInfoMap } from "../../../_shared/types/types";
import ChannelInfo from "./ChannelInfo/ChannelInfo";
import { ModalContext } from "../../../_shared/hooks/showModalContext";
import { DataContext } from "../../../_shared/hooks/dataContext";

type NavProps = {
  channelsMap: channelsInfoMap;
  toggleSideBar: () => void;
};
const Nav = (props: NavProps): JSX.Element => {
  const { toggleSideBar, channelsMap } = props
  const { toggleShowChannelInfo } = useContext(ModalContext)
  const { currChannel, getCurrChannelMembers } = useContext(DataContext)

  const toggleChannelInfo = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    toggleShowChannelInfo()
  }

  return (
    <div className="nav">
      <MenuOutlined
        className="icon-menu icon secondary"
        onClick={toggleSideBar}
      />
      <Text size="1.1rem" bd="700" align="left">
        {channelsMap[currChannel] ? channelsMap[currChannel].channel_name : ""}
      </Text>

      <div className="nav-info" onClick={toggleChannelInfo}>
        <UserOutlined className="icon secondary" />
        <ChannelInfo members={getCurrChannelMembers()} />
      </div>
    </div>
  );
};

export default Nav;
