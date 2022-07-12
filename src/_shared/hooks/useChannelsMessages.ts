import React, { useState } from "react";
import { getChannelMessages } from "../../mock_data/get_channel_messages";
import { channelsMessagesMap, message } from "../types/types";

type useChannelsMessagesReturn = {
  getMessages: (channelID: number) => message[];
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

  return {
    getMessages
  }
};
