import React, { Dispatch, SetStateAction, useContext } from "react";

import { Button } from "antd";
import Channel from "./Channel/Channel";
import Text from "../../../_shared/Components/Text/Text";
import Menu from "./Menu/Menu";
import {
  PlusOutlined,
  DownOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons";

import { channelsInfoMap, userInfo } from "../../../_shared/types/types";
import { ModalContext } from "../../../_shared/hooks/showModalContext";

const items = [
  {
    label: "Profile",
    key: "profile",
    icon: <UserOutlined />,
  },
  {
    label: "Settings",
    key: "settings",
    icon: <SettingOutlined />,
  },
  {
    label: "Logout",
    logout: "logout",
    icon: <LogoutOutlined />,
  },
];

type SidebarProps = {
  userInfo: userInfo;
  channelsMap: channelsInfoMap;
  currChannelID: number;
  setCurrChannelID: Dispatch<SetStateAction<number>>;
};

const Sidebar = (props: SidebarProps): JSX.Element => {
  const {
    channelsMap,
    userInfo,
    currChannelID,
    setCurrChannelID,
  } = props;

  const { 
    showSidebarMenu, 
    toggleShowSidebarMenu, 
    toggleShowAddChannelModal 
  } = useContext(ModalContext)

  const onChannelClick = (channelID: number) => {
    setCurrChannelID(channelID)
  }

  const toggleMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    toggleShowSidebarMenu()
  }

  return (
    <div className="sidebar">
      <div className="header shadow">
        <Text bd="700" align="left">
          Channels
        </Text>

        <Button
          className="btn primary"
          size="small"
          icon={<PlusOutlined />}
          onClick={toggleShowAddChannelModal}
        />
      </div>

      <div className="content">
        {Object.keys(channelsMap).map((id) => (
          <Channel
            key={Number(id)}
            channel={channelsMap[Number(id)]}
            isSelected={Number(id) === currChannelID}
            onClick={() => {
              onChannelClick(Number(id));
            }}
          />
        ))}
      </div>

      <div className="footer bg-three">
        <img src={userInfo.profile_url} />
        <Text bd="700" align="left" color="tertiary">
          {userInfo.user_name}
        </Text>

        <div className="icon__container">
          <DownOutlined className="icon primary" onClick={toggleMenu} />
          <Menu
            className={`${showSidebarMenu ? "" : "menu-disable"}`}
            items={items}
            toggleMenu={toggleMenu}
          />
        </div>
      </div>
    </div>
  );
}
  
export default Sidebar;
