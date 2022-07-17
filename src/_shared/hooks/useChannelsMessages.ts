import React, { useState } from "react";
import { getChannelMessages } from "../../mock_data/get_channel_messages";
import { channelsMessagesMap, message, userInfo } from "../types/types";

type useChannelsMessagesReturn = {
  getMessages: (channelID: number) => message[];
  addMessage: (senderInfo: userInfo, channelID: number, content: string) => void
};

export const useChannelsMessages = (): useChannelsMessagesReturn => {
  const [channelsMessagesMap, setChannelsMessagesMap] = useState<channelsMessagesMap>({});

  const getMessages = (channelID: number): message[] => {
    if (channelID in channelsMessagesMap) {
        return channelsMessagesMap[channelID]
    }

    let newChannelsMessagesMap = {...channelsMessagesMap}
    let messagesData = getChannelMessages(channelID);

    newChannelsMessagesMap[channelID] = messagesData && messagesData.messages;
    setChannelsMessagesMap(newChannelsMessagesMap)

    return newChannelsMessagesMap[channelID]
  }

  const addMessage = (senderInfo: userInfo, channelID: number, content: string): void => {
    let newMessage: message = {
      message_id: (new Date()).getTime(),
      channel_id: channelID,
      content: content,
      created_at: (new Date()).getTime(),
      sender_info: senderInfo
    }

    setChannelsMessagesMap((prev) => {
      let newMap = {...prev}

      if (!newMap[channelID]) {
        newMap[channelID] = []
      }

      newMap[channelID] = [newMessage, ...newMap[channelID]]

      return newMap
    });
  }

  return {
    getMessages, addMessage
  }
};
