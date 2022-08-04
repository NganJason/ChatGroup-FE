import { ChannelObj, Message } from "../apis/chat_group";

export type userInfo = {
    user_id?: number;
    user_name?: string;
    email_address?: string;
    profile_url?: string;
}

export type message = {
  message_id: number;
  channel_id?: string;
  content: string;
  created_at: number;
  sender_info: userInfo;
}

export type userChannels = {
  user_info: userInfo;
  channels: ChannelObj[];
}

export type channelMembers = {
  channel_info: ChannelObj;
  members: userInfo[];
};

export type channelMessages = {
  channel_info: ChannelObj;
  messages: message[];
};

export type channelsInfoMap = {
  [channel_id: string]: ChannelObj;
};

export type channelsMessagesMap = {
  [channel_id: string]: channelMessagesInfo;
}

export type channelMessagesInfo = {
  last_fetched?: number;
  messages: Message[];
}

export type channelsMembersMap = {
  [channel_id: string]: userInfo[];
}