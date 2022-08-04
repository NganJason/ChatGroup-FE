import React, { Dispatch, SetStateAction, useContext } from "react";

import { Button } from "antd";
import Channel from "./Channel/Channel";
import Text from "../../../_shared/Components/Text/Text";
import Menu from "./Menu/Menu";
import {
  PlusOutlined,
  DownOutlined
} from "@ant-design/icons";

import { ModalContext } from "../../../_shared/hooks/showModalContext";
import { DataContext } from "../../../_shared/hooks/dataContext";

const Sidebar = (): JSX.Element => {
  const { 
    showSidebarMenu, 
    toggleShowSidebarMenu, 
    toggleShowAddChannelModal 
  } = useContext(ModalContext)

  const {
    user,
    channelsMap,
    setCurrChannel,
    currChannel,
  } = useContext(DataContext)

  const onChannelClick = (channelID: string) => {
    setCurrChannel(channelID);
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
            channel={channelsMap[id]}
            selected={id === currChannel}
            onClick={() => {
              onChannelClick(id);
            }}
          />
        ))}
      </div>

      <div className="footer bg-three">
        <img
          src={
            user.photo_url ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
        <Text bd="700" align="left" color="tertiary">
          {user.username}
        </Text>

        <div className="icon__container">
          <DownOutlined className="icon primary" onClick={toggleMenu} />
          <Menu
            className={`${showSidebarMenu ? "" : "menu-disable"}`}
            toggleMenu={toggleMenu}
          />
        </div>
      </div>
    </div>
  );
}
  
export default Sidebar;
