import { Layout } from "antd";
import React from "react";
import Chatroom from "./Chatroom/Chatroom";
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";

const { Header, Sider, Content } = Layout;

const Home = (): JSX.Element => (
  <>
    <Layout className="home">
      <Sider width={'18rem'} className="bg-one sider">
        <Sidebar />
      </Sider>
      <Layout className="body">
        <Header className="bg-two header shadow">
          <Nav />
        </Header>
        <Content className="bg-two content">
          <Chatroom></Chatroom>
        </Content>
      </Layout>
    </Layout>
  </>
);

export default Home;
