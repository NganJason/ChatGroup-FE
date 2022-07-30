import axios from "axios";

export interface AuthLoginRequest {
  username?: string;
  password?: string;
}

export interface AuthLoginResponse {
  debug_msg?: string;
  user_info?: User;
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
  channels?: Channel[];
}

export interface CreateChannelRequest {
  channel_name?: string;
  channel_desc?: string;
}

export interface CreateChannelResponse {
  debug_msg?: string;
  channel?: Channel;
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

export interface Channel {
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
    this.baseUrl = "/api/";
  }

  async login(
    username: string, 
    password: string
  ): Promise<AuthLoginResponse> {
    let url: string = this.baseUrl + "auth/login";

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
    } catch(err) {
        throw err
    }    
  }

  async signup(username:string, password:string):Promise<AuthSignupResponse> {
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
    } catch(err) {
        throw err
    }
  }
}

const handleResp = (resp: any):any => {
    if (resp.data.debug_msg !== "") {
        throw new Error(resp.dat.debug_msg)
    }

    return resp.data
}