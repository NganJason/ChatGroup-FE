import React, { useState, useEffect } from "react";

import { Layout } from "antd";
import Chatroom from "./Chatroom/Chatroom";
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";
import Modal from "./Modal/Modal";

import { useUserChannel } from "../../_shared/hooks/useUserChannel";
import { useChannelsMessages } from "../../_shared/hooks/useChannelsMessages";
import { useWindowDimensions } from "../../_shared/hooks/useWindowDimensions";
import { useChannelsMembers } from "../../_shared/hooks/useChannelsMembers";

const { Sider, Content } = Layout;

const Home = (): JSX.Element => {
  const { userInfo, channelsMap, clearUnread } =useUserChannel(12345);
  const { getMessages } = useChannelsMessages()
  const { getMembers } = useChannelsMembers()
  const [currChannelID, setCurrChannelID] = useState<number>(0)

  const { width } = useWindowDimensions()
  const [ showSideBar, setShowSideBar ] = useState<boolean>(width > 600);
  const [ showModal, setShowModal ] = useState<boolean>(false)

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

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  const toggleShowModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <Layout className="home">
        <Sider
          width={"18rem"}
          className={`bg-one sider ${!showSideBar ? "disable" : ""}`}
        >
          <Sidebar
            userInfo={userInfo}
            channelsMap={channelsMap}
            currChannelID={currChannelID}
            setCurrChannelID={setCurrChannelID}
            toggleShowModal={toggleShowModal}
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
            ></Chatroom>
          </Content>
        </Layout>
      </Layout>
      <Modal showModal={showModal} toggleShowModal={toggleShowModal} />
    </>
  );
};

export default Home;
