import React, { useState, useEffect } from "react";

import { Layout } from "antd";
import Chatroom from "./Chatroom/Chatroom";
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";

import { useWindowDimensions } from "../../_shared/hooks/useWindowDimensions";
import Modal from "./Modal/Modal";

import { userChannels } from "../../mock_data/get_user_channels";
import { channelMessages } from "../../mock_data/get_channel_messages";
import { channelMembers } from "../../mock_data/get_channel_members";
import { channelsInfoUnread, channelsMembers, channelsMessages, userInfo } from "../../_shared/types/types";

const { Sider, Content } = Layout;

const Home = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<userInfo>(userChannels.user_info);
  const [currChannelID, setCurrChannelID] = useState<number>(userChannels.channels[0].channel_id)

  const [channelsMap, setChannelsMap] = useState<channelsInfoUnread>({})
  const [channelsMessagesMap, setChannelsMessagesMap] = useState<channelsMessages>({})
  const [channelsMembersMap, setChannelsMembersMap] = useState<channelsMembers>({})

  const { width } = useWindowDimensions()
  const [ showSideBar, setShowSideBar ] = useState<boolean>(width > 600);
  const [ showModal, setShowModal ] = useState<boolean>(false)

  useEffect(() => {
    setUserInfo(userChannels.user_info);
    setCurrChannelID(userChannels.channels[0].channel_id);

    let newChannelsMap: channelsInfoUnread = {};
    for (var ch of userChannels.channels) {
      newChannelsMap[ch.channel_id] = ch;
    }
    setChannelsMap(newChannelsMap);

    let newMessagesMap: channelsMessages = {};
    for (var msg of channelMessages.messages) {
      let channelID = channelMessages.channel_info.channel_id
      if (!(channelID in newMessagesMap)) {
        newMessagesMap[channelID] = []
      }

      newMessagesMap[channelID].push(msg);
    }
    setChannelsMessagesMap({ ...channelsMessagesMap, ...newMessagesMap });

    let newChannelsMembersMap: channelsMembers = {};
    for (var member of channelMembers.members) {
      let channelID = channelMessages.channel_info.channel_id
      if (!(channelID in newChannelsMembersMap)) {
        newChannelsMembersMap[channelID] = []
      }
      
      newChannelsMembersMap[channelMembers.channel_info.channel_id].push(
        member
      );
    }
    setChannelsMembersMap({ ...channelsMembersMap, ...newChannelsMembersMap });
  }, []);

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
              channelsMembersMap={channelsMembersMap}
              toggleSideBar={toggleSideBar}
            />
          </div>
          <Content className="bg-two content">
            <Chatroom
              currChannelID={currChannelID}
              channelsMessagesMap={channelsMessagesMap}
            ></Chatroom>
          </Content>
        </Layout>
      </Layout>
      <Modal showModal={showModal} toggleShowModal={toggleShowModal} />
    </>
  );
};

export default Home;
