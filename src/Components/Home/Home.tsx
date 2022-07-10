import React, { useState, useEffect } from "react";

import { Layout } from "antd";
import Chatroom from "./Chatroom/Chatroom";
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";

import { useWindowDimensions } from "../../_shared/hooks/useWindowDimensions";
import Modal from "./Modal/Modal";

const { Sider, Content } = Layout;

const Home = (): JSX.Element => {
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
          <Sidebar toggleShowModal={toggleShowModal} />
        </Sider>
        <Layout className="body">
          <div className="bg-two header shadow">
            <Nav toggleSideBar={toggleSideBar} />
          </div>
          <Content className="bg-two content">
            <Chatroom></Chatroom>
          </Content>
        </Layout>
      </Layout>
      <Modal showModal={showModal} toggleShowModal={toggleShowModal} />
    </>
  );
};

export default Home;
