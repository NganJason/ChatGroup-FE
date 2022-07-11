
import React from "react";

import Text from "../../../_shared/Components/Text/Text";
import { MenuOutlined } from "@ant-design/icons";
import { channelsInfoUnread, channelsMembers } from "../../../_shared/types/types";

type NavProps = {
  currChannelID: number;
  channelsMap: channelsInfoUnread;
  channelsMembersMap: channelsMembers;
  toggleSideBar: () => void;
};
const Nav = (props: NavProps): JSX.Element => {
  const { toggleSideBar, currChannelID, channelsMap } = props

  return (
    <div className="nav">
      <MenuOutlined className="icon secondary" onClick={toggleSideBar} />
      <Text size="1.1rem" bd="700" align="left">
        {channelsMap[currChannelID] ? channelsMap[currChannelID]
          .channel_name : ""}
      </Text>
    </div>
  );
};

export default Nav;
