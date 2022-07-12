import { channelMessages } from "../_shared/types/types";

// GET /api/channel/messages
export const channelsMessagesData: { [key: number]: channelMessages } = {
  123: {
    channel_info: {
      channel_id: 123,
      channel_name: "Front-end developers",
      unread: 2,
    },
    messages: [
      {
        message_id: 1,
        channel_id: 123,
        content: "hi my name is Jason",
        created_at: 1234512,
        sender_info: {
          user_id: 12345,
          user_name: "Jason Ngan",
          email_address: "jason.ngan@mail.com",
          profile_url:
            "https://staticg.sportskeeda.com/editor/2021/12/b5306-16406537216511-1920.jpg",
        },
      },
      {
        message_id: 2,
        channel_id: 123,
        content: "hi my name is Peter",
        created_at: 1234512,
        sender_info: {
          user_id: 12345,
          user_name: "Peter Tan",
          email_address: "peter.tan@mail.com",
          profile_url:
            "https://wegotthiscovered.com/wp-content/uploads/2022/04/Luffy_age_One_Piece_17.jpg",
        },
      },
    ],
  },
  124: {
    channel_info: {
      channel_id: 124,
      channel_name: "PM and developers",
      unread: 1,
    },
    messages: [
      {
        message_id: 3,
        channel_id: 124,
        content: "hi I'm John Goh",
        created_at: 1234514,
        sender_info: {
          user_id: 12347,
          user_name: "John Goh",
          email_address: "john.goh@mail.com",
          profile_url:
            "https://www.personality-database.com/profile_images/1217.png",
        },
      },
    ],
  },
};

export const getChannelMessages = (channelID: number): channelMessages => {
  return channelsMessagesData[channelID];
}