import React from "react";
import { NewChatGroupService, User } from "../apis/chat_group";
import { ChatGroupQueryKey, useGetChannelMembersQuery } from "../queries/chat_group";
import { useQueryClient } from "react-query";

type useChannelsMembersReturn = {
  getCurrChannelMembers: () => User[];
  addMembers: (channelID: string, userIDs: string[]) => void
};

export const useChannelsMembers = (channelID: string): useChannelsMembersReturn => {
  const queryClient = useQueryClient();

    const { data: members } = useGetChannelMembersQuery(
        channelID,
        {
          retry: false,
          refetchOnWindowFocus: false,
        }
    )
    
    const getCurrChannelMembers = (): User[] => {
      return members || [];
    };

    const addMembers = (
      channelID: string,
      userIDs: string[],
    ) => {
      let service = NewChatGroupService()

      service.addMembers(
        channelID,
        userIDs
      ).then(() => {
        queryClient.invalidateQueries([ChatGroupQueryKey.GET_CHANNEL_MEMBERS, channelID]);
      })
    }

    return {
      getCurrChannelMembers,
      addMembers,
    };
}