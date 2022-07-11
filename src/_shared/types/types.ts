export type channel = {
  channel_id: number;
  channel_name: string;
  unread: number;
};

export type userInfo = {
    user_id: number;
    user_name: string;
    email_address: string;
    profile_url: string;
}

export type message = {
  message_id: number;
  channel_id: number;
  content: string;
  created_at: number;
  sender_info: userInfo;
}

export type channelsInfoUnread = {
  [channel_id: number]: channel;
}

export type channelsMessages = {
  [channel_id: number]: message[];
}

export type channelsMembers = {
  [channel_id: number]: userInfo[];
}