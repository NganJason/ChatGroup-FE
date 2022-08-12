import axios from "axios";

export interface ValidateAuthRequest {}

export interface ValidateAuthResponse {
  debug_msg?: string;
  user_info?: User;
}
export interface AuthLoginRequest {
  username?: string;
  password?: string;
}

export interface AuthLoginResponse {
  debug_msg?: string;
  user_info?: User;
}

export interface AuthLogoutRequest {}

export interface AuthLogoutResponse {
  debug_msg?: string;
}

export interface AuthSignupRequest {
  username?: string;
  password?: string;
}

export interface AuthSignupResponse {
  debug_msg?: string;
  user_info?: User;
}

export interface GetUserInfoRequest {}

export interface GetUserInfoResponse {
  debug_msg?: string;
  user_info?: User;
}

export interface GetUserChannelsRequest {}

export interface GetUserChannelsResponse {
  debug_msg?: string;
  channels?: ChannelObj[];
}

export interface CreateChannelRequest {
  channel_name?: string;
  channel_desc?: string;
}

export interface CreateChannelResponse {
  debug_msg?: string;
  channel?: ChannelObj;
}

export interface GetChannelMessagesRequest {
  /** @format int64 */
  channel_id?: string;
  from_unix_time?: number;
  to_unix_time?: number;
}

export interface GetChannelMessagesResponse {
  debug_msg?: string;
  messages?: Message[];
}

export interface GetChannelMembersRequest {
  /** @format int64 */
  channel_id?: string;
  page_size?: number;
  page_number?: number;
}

export interface GetChannelMembersResponse {
  debug_msg?: string;
  members?: User[];
}

export interface CreateMessageRequest {
  channel_id?: string;
  content?: string;
}

export interface CreateMessageResponse {
  debug_msg?: string;
  message?: Message;
}

export interface UploadImageRequest {}

export interface UploadImageResponse {
  debug_msg?: string;
  url?: string;
}

export interface CreateSocketRequest {}

export interface CreateSocketResponse {
  debug_msg?: string;
}

export interface AddUsersToChannelRequest {
  channel_id?: string;
  user_ids?: number[];
}

export interface AddUsersToChannelResponse {
  debug_msg?: string;
}

export interface User {
  user_id?: string;
  username?: string;
  email_address?: string;
  photo_url?: string;
}

export interface ChannelObj {
  /** @format int64 */
  channel_id?: string;
  channel_name?: string;
  channel_desc?: string;
  unread?: number;
}

export interface Message {
  message_id?: string;
  channel_id?: string;
  content?: string;
  created_at?: number;
  sender?: User;
}

export enum eventType {
 SERVER_EVENT = 0,
 CLIENT_SEND_MSG_EVENT = 1,
 CLIENT_JOIN_CHANNEL_EVENT = 2,
}

export const NewChatGroupService = (): ChatGroup => {
    let s = new ChatGroup()

    return s
}

class ChatGroup {
  baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_BACKEND_HOST || "";
  }

  async validateAuth(): Promise<ValidateAuthResponse> {
    let url: string = this.baseUrl + "auth/validate"

    try {
      let resp = await axios.post(url, {}, { withCredentials: true });

      return handleResp(resp)
    } catch(err: any) {
      if (err.response.status >= 400) {
        throw new Error(err.response.data.debug_msg);
      }

      throw err
    }
  }

  async login(
    username: string, 
    password: string
  ): Promise<AuthLoginResponse> {
    let url: string = this.baseUrl + "auth/login";

    var resp: any
    try {
        resp = await axios.post(
            url,
            {
                username: username,
                password: password,
            },
            { withCredentials: true }
        )

        return handleResp(resp)
    } catch(err: any) {
        if (err.response.status >= 400) {
          throw new Error(err.response.data.debug_msg)
        }
        
        throw err
    }    
  }

  async signup(username:string, password:string): Promise<AuthSignupResponse> {
    let url: string = this.baseUrl + "auth/signup"

    try {
        let resp = await axios.post(
            url,
            {
                username: username,
                password: password,
            },
            { withCredentials: true }
        )

        return handleResp(resp)
    } catch(err: any) {
        if (err.response.status >= 400) {
          throw new Error(err.response.data.debug_msg);
        }
        
        throw err
    }
  }

  async logout(): Promise<AuthLogoutResponse> {
    let url: string = this.baseUrl + "auth/logout"

    try {
      let resp = await axios.post(
        url,
        {},
        { withCredentials: true }
      )

      return handleResp(resp)
    } catch(err: any) {
      if (err.response.status >= 400) {
        throw new Error(err.response.data.debug_msg);
      }
      
      throw err
    }
  }

  async getUserChannels(): Promise<GetUserChannelsResponse> {
    let url: string = this.baseUrl + "user/channels"

    try {
      let resp:string = await axios.post(url, {}, { withCredentials: true });

      return handleResp(resp);
    } catch (err: any) {
      if (err.response.status >= 400) {
        throw new Error(err.response.data.debug_msg);
      }

      throw err;
    }
  }

  async createChannel(
    channelName: string,
    channelDesc: string,
  ): Promise<CreateChannelResponse> {
    let url: string = this.baseUrl + "channel/create"

    try {
      let resp = await axios.post(
        url,
        {
          channel_name: channelName,
          channel_desc: channelDesc
        },
        { withCredentials: true }
      )

      return handleResp(resp)
    } catch(err) {
      throw err;
    }
  }

  async getChannelMembers(
    channelID: string,
  ): Promise<GetChannelMembersResponse> {
    let url: string = this.baseUrl + "channel/members"

    try {
      let resp = await axios.post(
        url,
        {
          channel_id: channelID,
        },
        { withCredentials: true }
      )

      return handleResp(resp)
    } catch(err) {
      throw err;
    }
  }

  async addMembers(
    channelID: string,
    userIDs: string[],
  ): Promise<AddUsersToChannelResponse> {
    let url: string = this.baseUrl + "channel/add_users"

    try {
      let resp = await axios.post(
        url,
        {
          channel_id: channelID,
          user_ids: userIDs,
        },
        { withCredentials: true }
      )

      return handleResp(resp)
    } catch(err) {
      throw err
    }
  }

  async getMessages(
    channelID: string,
    pageSize?: number,
    fromTime?:  number,
  ): Promise<GetChannelMessagesResponse> {
    let url: string = this.baseUrl + "channel/messages"
    if (!channelID || channelID === "") {
      throw new Error("channelID cannot be empty")
    }

    try {
      let resp = await axios.post(
        url,
        {
          channel_id: channelID,
          from_unix_time: fromTime,
          page_size: pageSize,
        },
        { withCredentials: true }
      )

      return handleResp(resp)
    } catch(err) {
      throw err;
    }
  }

  async createMessage(
    channelID: string,
    content: string,
  ): Promise<CreateMessageResponse> {
    let url: string = this.baseUrl + "message/create"
    if (!channelID || channelID === "") {
      throw new Error("channelID cannot be empty");
    }

    try {
      let resp = await axios.post(
        url,
        {
          channel_id: channelID,
          content: content,
        },
        { withCredentials: true }
      )

      return handleResp(resp)
    } catch(err) {
      throw err;
    }
  }

  async uploadImage(
    file: File,
  ): Promise<UploadImageResponse> {
    let url: string = this.baseUrl + "user/upload_image"
    let formData = new FormData();
    formData.append("user_profile", file)

    try {
      let resp = await axios.post(
        url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return handleResp(resp)
    } catch(err) {
      throw err
    }
  }
}

const handleResp = (resp: any):any => {
    if (resp.data.debug_msg && resp.data.debug_msg !== "") {
        throw new Error(resp.data.debug_msg)
    }

    return resp.data
}