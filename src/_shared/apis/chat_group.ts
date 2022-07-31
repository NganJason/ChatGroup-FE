import axios from "axios";

export interface ValidateAuthRequest {}

export interface ValidateAuthResponse {
  debug_msg?: string;
  is_auth?: boolean;
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
  channel_id?: number;
  from_unix_time?: number;
  to_unix_time?: number;
}

export interface GetChannelMessagesResponse {
  debug_msg?: string;
  messages?: Message[];
}

export interface GetChannelMembersRequest {
  channel_id?: number;
  page_size?: number;
  page_number?: number;
}

export interface GetChannelMembersResponse {
  debug_msg?: string;
  members?: User[];
}

export interface CreateMessageRequest {
  channel_id?: number;
  content?: string;
}

export interface CreateMessageResponse {
  debug_msg?: string;
  message?: Message;
}

export interface AddUsersToChannelRequest {
  channel_id?: number;
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
  channel_id?: number;
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

export const NewChatGroupService = (): ChatGroup => {
    let s = new ChatGroup()

    return s
}

class ChatGroup {
  baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8082/api/";
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
      let resp = await axios.post(url, {}, { withCredentials: true });

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
    channelID: number,
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
}

const handleResp = (resp: any):any => {
    if (resp.data.debug_msg && resp.data.debug_msg !== "") {
        throw new Error(resp.dat.debug_msg)
    }

    return resp.data
}