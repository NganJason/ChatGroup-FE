import React, { useState, useEffect } from "react";

import { Message, NewChatGroupService } from "../apis/chat_group";
import { channelsMessagesMap } from "../types/types";

type useChannelsMessagesReturn = {
  createMessage: (channelID: string, content: string) => void;
  messageLoading: boolean;
  channelsMessagesMap: channelsMessagesMap;
  addMessage: (channelID: string, message: Message) => void;
  fetchNext: (channelID: string) => void;
};

export const useChannelsMessages = (
  currChannelID: string
): useChannelsMessagesReturn => {
  const [channelsMessagesMap, setChannelsMessagesMap] =
    useState<channelsMessagesMap>({});
  const [messageLoading, setMessageLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!currChannelID || currChannelID === "") {
      return
    }
    
    let channelMessagesInfo = channelsMessagesMap[currChannelID];
    let service = NewChatGroupService();

    if (!channelMessagesInfo || !channelMessagesInfo.last_fetched) {
      setMessageLoading(true);

      service
        .getMessages(
          currChannelID, 
          100,
        )
        .then((resp) => {
          setChannelsMessagesMap({
            ...channelsMessagesMap,
            [currChannelID]: {
              messages: resp.messages || [],
            },
          });
        })
        .finally(() => {
          setMessageLoading(false);
        });
    }
  }, [currChannelID]);

  const addMessage = (channelID: string, message?: Message): void => {
    setChannelsMessagesMap((prev) => {
      return {
        ...prev,
        [channelID]: {
          messages: [
            message || {},
            ...prev[channelID].messages,
          ]
        }
      }
    });
  };

  const fetchNext = (channelID: string): void => {
    let channelMessagesInfo = channelsMessagesMap[channelID];
    if (!channelMessagesInfo) {
      return
    }

    let lastMsgTime = channelMessagesInfo.messages[channelMessagesInfo.messages.length -1].created_at

    let service = NewChatGroupService()
    service.getMessages(
      channelID,
      100,
      lastMsgTime,
    )
    .then((resp) => {
      setChannelsMessagesMap({
        ...channelsMessagesMap,
        [channelID]: {
          messages: [
            ...channelsMessagesMap[channelID].messages,
            ...(resp.messages || []),
          ],
        },
      });
    })
  }

  const createMessage = (channelID: string, content: string): void => {
    let service = NewChatGroupService();

    service.createMessage(channelID, content).then((resp) => {
      addMessage(channelID, resp.message)
    });
  };

  return {
    createMessage,
    messageLoading,
    channelsMessagesMap,
    addMessage,
    fetchNext,
  };
};
