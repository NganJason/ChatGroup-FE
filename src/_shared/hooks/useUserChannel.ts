import React, { useState, useEffect } from "react";
import { getUserChannels } from "../../mock_data/get_user_channels";
import { channelsInfoMap, userInfo } from "../types/types";

type useUserChannelReturn = {
    userInfo: userInfo;
    channelsMap: channelsInfoMap;
    clearUnread: (channelID: number) => void;
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

    return {
        userInfo,
        channelsMap,
        clearUnread
    }
}