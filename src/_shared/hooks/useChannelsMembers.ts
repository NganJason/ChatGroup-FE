import React, { useState, useEffect } from "react";
import { getChannelMembers } from "../../mock_data/get_channel_members";
import { User } from "../apis/chat_group";
import { useGetChannelMembersQuery } from "../queries/chat_group";
import { channelsMembersMap, userInfo } from "../types/types";

type useChannelsMembersReturn = {
  getCurrChannelMembers: () => User[];
};

export const useChannelsMembers = (channelID: string): useChannelsMembersReturn => {
    const [channelsMembersMap, setChannelsMembersMap] = useState<channelsMembersMap>({})

    const { data: members } = useGetChannelMembersQuery(
        channelID,
        {
          retry: false,
          refetchOnWindowFocus: false,
        }
    )
    
    const getCurrChannelMembers = (): User[] => {
      // if (channelID in channelsMembersMap) {
      //     return channelsMembersMap[channelID];
      // }

      // let newChannelsMembersMap = {...channelsMembersMap};
      // newChannelsMembersMap[channelID] = getChannelMembers(channelID).members;
      // setChannelsMembersMap(newChannelsMembersMap)

      // return newChannelsMembersMap[channelID]
      
      return members || [];
    };

    return {
      getCurrChannelMembers,
    };
}