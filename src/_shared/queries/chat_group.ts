import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";
import { NewChatGroupService, ValidateAuthResponse } from "../apis/chat_group"

export enum ChatGroupQueryKey {
    VALIDATE_AUTH = "VALIDATE_AUTH",
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
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
        retryDelay: 3000,
      }
    );
}