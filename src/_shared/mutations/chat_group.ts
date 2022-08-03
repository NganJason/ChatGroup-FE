import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "react-query"
import {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthSignupRequest,
  AuthSignupResponse,
  ChannelObj,
  CreateChannelRequest,
  CreateChannelResponse,
  GetChannelMembersRequest,
  NewChatGroupService,
  User,
} from "../apis/chat_group";

export const useLogin = (
    options?: UseMutationOptions<
        User,
        unknown,
        AuthLoginRequest,
        unknown
    >
) => {
    const loginMutate = async (
        params: AuthLoginRequest
    ): Promise<User> => {
        const service = NewChatGroupService()

        const response: AuthLoginResponse = await service.login(
            params.username || "",
            params.password || ""
        )

        return response.user_info ?? {}
    }

    return useMutation(loginMutate, options)
}

export const useSignup = (
    options?: UseMutationOptions<
      User,
      unknown,
      AuthSignupRequest,
      unknown
    >
): UseMutationResult<
  User,
  unknown,
  AuthSignupRequest,
  unknown
> => {
    const signupMutate = async (
        params: AuthSignupRequest
    ): Promise<User> => {
        const service = NewChatGroupService()

        const response: AuthSignupResponse = await service.signup(
            params.username || "",
            params.password || ""
        )

        return response.user_info ?? {};
    };

    return useMutation(signupMutate, options)
}

export const useLogout = (
  options?: UseMutationOptions<void, unknown, void, unknown>
) => {
  const logoutMutate = async (): Promise<void> => {
    const service = NewChatGroupService();

    await service.logout();
  };

  return useMutation(logoutMutate, options);
};

export const useCreateChannel = (
    options?: UseMutationOptions<
        ChannelObj,
        unknown,
        CreateChannelRequest,
        unknown
    >
) => {
    const createChannelMutate = async (params: CreateChannelRequest): Promise<ChannelObj> => {
      const service = NewChatGroupService();

      const response: CreateChannelResponse = await service.createChannel(
        params.channel_name || "",
        params.channel_desc || ""
      );

      return response.channel ?? {};
    };

    return useMutation(createChannelMutate, options);
}