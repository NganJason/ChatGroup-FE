import React, { useContext } from "react";

import Text from "../../../_shared/Components/Text/Text";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { channelsInfoMap, userInfo } from "../../../_shared/types/types";
import ChannelInfo from "./ChannelInfo/ChannelInfo";
import { getChannelMembers } from "../../../mock_data/get_channel_members";
import { ModalContext } from "../../../_shared/hooks/showModalContext";

type NavProps = {
  currChannelID: number;
  channelsMap: channelsInfoMap;
  getMembers: (channelID: number) => userInfo[]
  toggleSideBar: () => void;
};
const Nav = (props: NavProps): JSX.Element => {
  const { toggleSideBar, currChannelID, channelsMap } = props
  const { toggleShowChannelInfo } = useContext(ModalContext)

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
        {channelsMap[currChannelID]
          ? channelsMap[currChannelID].channel_name
          : ""}
      </Text>

      <div className="nav-info" onClick={toggleChannelInfo}>
        <UserOutlined className="icon secondary" />
        <ChannelInfo
          members={getChannelMembers(currChannelID)?.members || []}
        />
      </div>
    </div>
  );
};

export default Nav;
