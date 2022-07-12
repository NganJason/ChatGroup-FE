export type channel = {
  channel_id: number;
  channel_name: string;
  unread: number;
};

export type userInfo = {
    user_id?: number;
    user_name?: string;
    email_address?: string;
    profile_url?: string;
}

export type message = {
  message_id: number;
  channel_id: number;
  content: string;
  created_at: number;
  sender_info: userInfo;
}

export type userChannels = {
  user_info: userInfo;
  channels: channel[];
}

export type channelMembers = {
  channel_info: channel;
  members: userInfo[];
}

export type channelMessages = {
  channel_info: channel;
  messages: message[]
}

export type channelsInfoMap = {
  [channel_id: number]: channel;
}

export type channelsMessagesMap = {
  [channel_id: number]: message[];
}

export type channelsMembersMap = {
  [channel_id: number]: userInfo[];
}