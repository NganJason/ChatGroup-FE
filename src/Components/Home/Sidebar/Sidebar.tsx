import React, { useContext } from "react";
import { useQueryClient } from "react-query";


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
import { useUploadImage } from "../../../_shared/mutations/chat_group";
import { ChatGroupQueryKey } from "../../../_shared/queries/chat_group";

const Sidebar = (): JSX.Element => {
  const queryClient = useQueryClient();

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

  const {
    mutate: uploadImage,
  } = useUploadImage(
    {
      onSuccess: (): void => {
        queryClient.invalidateQueries(ChatGroupQueryKey.VALIDATE_AUTH)
      }
    }
  )

  const onChannelClick = (channelID: string) => {
    setCurrChannel(channelID);
  }

  const toggleMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    toggleShowSidebarMenu()
  }

  const onFileSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).files) {

      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0]
        uploadImage(file)
      }
    }
  };

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
        <div className="user__img">
          <img
            src={
              user.photo_url ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
          />
          <input
            type="file"
            onChange={onFileSubmit}
          />
        </div>
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
