import React, { useState } from "react";
import { getChannelMembers } from "../../mock_data/get_channel_members";
import { channelsMembersMap, userInfo } from "../types/types";

type useChannelsMembersReturn = {
  getMembers: (channelID: number) => userInfo[]
};

export const useChannelsMembers = (): useChannelsMembersReturn => {
    const [channelsMembersMap, setChannelsMembersMap] = useState<channelsMembersMap>({})
    
    const getMembers = (channelID: number): userInfo[] => {
        if (channelID in channelsMembersMap) {
            return channelsMembersMap[channelID];
        }

        let newChannelsMembersMap = {...channelsMembersMap};
        newChannelsMembersMap[channelID] = getChannelMembers(channelID).members;
        setChannelsMembersMap(newChannelsMembersMap)

        return newChannelsMembersMap[channelID]
    }

    return {
        getMembers
    }
}