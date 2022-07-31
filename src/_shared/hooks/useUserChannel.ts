import React, { useState } from "react";
import { ChannelObj, User } from "../apis/chat_group";
import { useCreateChannel } from "../mutations/chat_group";
import { ChatGroupQueryKey, useGetUserChannelsQuery } from "../queries/chat_group";
import { channelsInfoMap } from "../types/types";
import { useQueryClient } from "react-query";

type useUserChannelReturn = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  channelsMap: channelsInfoMap;
  clearUnread: (channelID: number) => void;
  addChannel: (channelName: string) => void;
};

export const useUserChannel = (): useUserChannelReturn => {
    const queryClient = useQueryClient();

    const [user, setUser] = useState<User>({})
    const [channelsMap, setChannelsMap] = useState<channelsInfoMap>({})

    useGetUserChannelsQuery({
      onSuccess: (resp: ChannelObj[]): void => {
        var channelsMap: channelsInfoMap = {}

        for (var ch of resp) {
          channelsMap[ch.channel_id || 0] = ch
        }

        setChannelsMap(channelsMap)
      },
      enabled: user !== {}
    })

    const {
      mutate: createChannel,
    } = useCreateChannel(
      {
        onSuccess: (): void => {
          queryClient.invalidateQueries(ChatGroupQueryKey.GET_USER_CHANNELS);
        }
      }
    )

    const clearUnread = (channelID: number) => {
      if (!(channelID in channelsMap)) {
        return;
      }

      const newChannelsMap = { ...channelsMap };
      newChannelsMap[channelID].unread = 0;

      setChannelsMap(newChannelsMap);
    };

    const addChannel = (channelName: string): void => {
        createChannel(
          {
            channel_name: channelName,
            channel_desc: ""
          }
        )
    }

    return {
        user,
        setUser,
        channelsMap,
        clearUnread,
        addChannel,
    }
}