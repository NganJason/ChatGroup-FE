import { Layout } from "antd";
import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "../../_shared/hooks/useWindowDimensions";
import Chatroom from "./Chatroom/Chatroom";
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";

const { Sider, Content } = Layout;

const Home = (): JSX.Element => {
  const { width } = useWindowDimensions()
  const [ showSideBar, setShowSideBar ] = useState(width > 600);

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

  return (
    <>
      <Layout className="home">
        <Sider
          width={"18rem"}
          className={`bg-one sider ${!showSideBar ? "disable" : ""}`}
        >
          <Sidebar />
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
    </>
  );
};

export default Home;
