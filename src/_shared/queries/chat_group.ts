import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";
import { NewChatGroupService, ValidateAuthResponse, ChannelObj, GetUserChannelsResponse } from "../apis/chat_group"

export enum ChatGroupQueryKey {
    VALIDATE_AUTH = "VALIDATE_AUTH",
    GET_USER_CHANNELS= "GET_USER_CHANNELS",
}

export const useValidateAuthQuery = <TData = boolean>(
    options?: UseQueryOptions<boolean, unknown, TData>
): UseQueryResult<TData> => {
    const validateAuthFetch = async (): Promise<boolean> => {
        const service = NewChatGroupService()

        try {
            const response: ValidateAuthResponse = await service.validateAuth()

            return response.is_auth ?? false
        } catch (err) {
            return false
        }
    };

    return useQuery<boolean, unknown, TData>(
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