import React, { useState, useEffect } from "react";
import { getUserChannels } from "../../mock_data/get_user_channels";
import { channel, channelsInfoMap, userInfo } from "../types/types";

type useUserChannelReturn = {
    userInfo: userInfo;
    channelsMap: channelsInfoMap;
    clearUnread: (channelID: number) => void;
    addChannel: (channelName: string) => void;
}

export const useUserChannel = (userID: number): useUserChannelReturn => {
    const [userInfo, setUserInfo] = useState<userInfo>({})
    const [channelsMap, setChannelsMap] = useState<channelsInfoMap>({})

    useEffect(() => {
        let userChannels = getUserChannels(userID)
        setUserInfo(userChannels.user_info)

        let channelsMap: channelsInfoMap = {}
        for (var ch of userChannels.channels) {
            channelsMap[ch.channel_id] = ch
        }
        setChannelsMap(channelsMap)
    }, [])

    const clearUnread = (channelID: number) => {
      if (!(channelID in channelsMap)) {
        return;
      }

      const newChannelsMap = { ...channelsMap };
      newChannelsMap[channelID].unread = 0;

      setChannelsMap(newChannelsMap);
    };

    const addChannel = (channelName: string): void => {
        let newChannel: channel = {
            channel_id: (new Date().getTime()),
            channel_name: channelName,
            unread: 0,
        }

        setChannelsMap((prev) => ({
            ...prev,
            [newChannel.channel_id]: newChannel,
        }))
    }

    return {
        userInfo,
        channelsMap,
        clearUnread,
        addChannel,
    }
}