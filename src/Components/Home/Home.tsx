import React, { useState, useEffect, useContext } from "react";

import { Layout } from "antd";
import Chatroom from "./Chatroom/Chatroom";
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";
import AddChannelModal from "./AddChannelModal/AddChannelModal";

import { useWindowDimensions } from "../../_shared/hooks/useWindowDimensions";
import { ModalContext } from "../../_shared/hooks/showModalContext";
import AddMemberModal from "./AddMemberModal/AddMemberModal";
import { DataContext } from "../../_shared/hooks/dataContext";

const { Sider, Content } = Layout;

const Home = (): JSX.Element => {
  const { 
    channelsMap, 
    addChannel, 
    currChannel, 
    setCurrChannel 
  } = useContext(DataContext);
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
    if (currChannel === "" || !currChannel) {
      let firstID = Object.keys(channelsMap)[0];

      if (firstID !== "") {
        setCurrChannel(firstID);
      }
    }
  }, [channelsMap, currChannel])

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
          <Sidebar />
        </Sider>
        <Layout className="body">
          <div className="bg-two header shadow">
            <Nav channelsMap={channelsMap} toggleSideBar={toggleSideBar} />
          </div>
          <Content className="bg-two content">
            <Chatroom />
          </Content>
        </Layout>
      </Layout>
      <AddChannelModal addChannel={addChannel} />
      <AddMemberModal />
    </>
  );
};

export default Home;
