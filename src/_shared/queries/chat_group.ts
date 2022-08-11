import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";
import {
  NewChatGroupService,
  ValidateAuthResponse,
  ChannelObj,
  GetUserChannelsResponse,
  User,
  GetChannelMembersResponse,
} from "../apis/chat_group";

export enum ChatGroupQueryKey {
    VALIDATE_AUTH = "VALIDATE_AUTH",
    GET_USER_CHANNELS = "GET_USER_CHANNELS",
    GET_CHANNEL_MEMBERS = "GET_CHANNEL_MEMBERS"
}

export const useValidateAuthQuery = <TData = boolean>(
    options?: UseQueryOptions<User, unknown, TData>
): UseQueryResult<TData> => {
    const validateAuthFetch = async (): Promise<User> => {
        const service = NewChatGroupService()

        try {
            const response: ValidateAuthResponse = await service.validateAuth()

            return response.user_info ?? {}
        } catch (err) {
            return {}
        }
    };

    return useQuery<User, unknown, TData>(
      ChatGroupQueryKey.VALIDATE_AUTH,
      validateAuthFetch,
      options
    );
}

export const useGetUserChannelsQuery = <TData = ChannelObj[]>(
    options?: UseQueryOptions<ChannelObj[], unknown, TData>
): UseQueryResult<TData> => {
    const getUserChannelsFetch = async (): Promise<ChannelObj[]> => {
        const service = NewChatGroupService()

        try {
            const response: GetUserChannelsResponse = await service.getUserChannels()

            return response.channels ?? []
        } catch(err) {
            throw err
        }
    }

    return useQuery<ChannelObj[], unknown, TData>(
      ChatGroupQueryKey.GET_USER_CHANNELS,
      getUserChannelsFetch,
      options
    );
}

export const useGetChannelMembersQuery = <TData = User[]>(
  channelID: string,
  options?: UseQueryOptions<User[], unknown, TData>
): UseQueryResult<TData> => {
  const getChannelMembersFetch = async (): Promise<User[]> => {
    if (!channelID || channelID === "") {
      return [];
    }

    const service = NewChatGroupService();

    try {
      const response: GetChannelMembersResponse =
        await service.getChannelMembers(channelID);

      return response.members ?? [];
    } catch (err) {
      throw err;
    }
  };

  return useQuery<User[], unknown, TData>(
    [ChatGroupQueryKey.GET_CHANNEL_MEMBERS, channelID],
    getChannelMembersFetch,
    options
  );
};