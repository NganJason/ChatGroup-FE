import React, { useState, useEffect, useContext } from "react";

import { Layout } from "antd";
import Chatroom from "./Chatroom/Chatroom";
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";
import AddChannelModal from "./AddChannelModal/AddChannelModal";

import { useUserChannel } from "../../_shared/hooks/useUserChannel";
import { useChannelsMessages } from "../../_shared/hooks/useChannelsMessages";
import { useWindowDimensions } from "../../_shared/hooks/useWindowDimensions";
import { useChannelsMembers } from "../../_shared/hooks/useChannelsMembers";
import { ModalContext } from "../../_shared/hooks/showModalContext";
import AddMemberModal from "./AddMemberModal/AddMemberModal";
import { DataContext } from "../../_shared/hooks/dataContext";

const { Sider, Content } = Layout;

const Home = (): JSX.Element => {
  const { user, channelsMap, clearUnread, addChannel } = useContext(DataContext);
  const { getMessages, addMessage } = useChannelsMessages()
  const { getMembers } = useChannelsMembers()
  const [currChannelID, setCurrChannelID] = useState<number>(0)

  const { width } = useWindowDimensions()
  const [ showSideBar, setShowSideBar ] = useState<boolean>(width > 600);
  const { setShowChannelInfo, setShowSidebarMenu, setShowAddMemberModal } = useContext(ModalContext)

  useEffect(() => {
    if (width < 600) {
      setShowSideBar(false)
    } else {
      setShowSideBar(true)
    }
  }, [width])

  useEffect(() => {
    clearUnread(currChannelID);
  }, [currChannelID]);

  useEffect(() => {
    if (currChannelID === 0) {
      let firstID = parseInt(Object.keys(channelsMap)[0]);
      
      if (!isNaN(firstID)) {
        setCurrChannelID(firstID);
      }
      
    }
  }, [channelsMap])

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  const closeAllModals = () => {
    setShowChannelInfo(false)
    setShowSidebarMenu(false)
    setShowAddMemberModal(false)
  }

  return (
    <>
      <Layout className="home" onClick={closeAllModals}>
        <Sider
          width={"18rem"}
          className={`bg-one sider ${!showSideBar ? "disable" : ""}`}
        >
          <Sidebar
            currChannelID={currChannelID}
            setCurrChannelID={setCurrChannelID}
          />
        </Sider>
        <Layout className="body">
          <div className="bg-two header shadow">
            <Nav
              currChannelID={currChannelID}
              channelsMap={channelsMap}
              getMembers={getMembers}
              toggleSideBar={toggleSideBar}
            />
          </div>
          <Content className="bg-two content">
            <Chatroom
              currChannelID={currChannelID}
              getMessages={getMessages}
              addMessage={addMessage}
            ></Chatroom>
          </Content>
        </Layout>
      </Layout>
      <AddChannelModal addChannel={addChannel} />
      <AddMemberModal/>
    </>
  );
};

export default Home;
