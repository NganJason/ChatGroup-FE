import { channelMembers } from "../_shared/types/types";

// GET /api/channel/members
const channelsMembersData: { [key: number]: channelMembers } = {
  123: {
    channel_info: {
      channel_id: 123,
      channel_name: "Front-end developers",
      unread: 2,
    },
    members: [
      {
        user_id: 12345,
        user_name: "Jason Ngan",
        email_address: "jason.ngan@mail.com",
        profile_url:
          "https://staticg.sportskeeda.com/editor/2021/12/b5306-16406537216511-1920.jpg",
      },
      {
        user_id: 12346,
        user_name: "Peter Tan",
        email_address: "peter.tan@mail.com",
        profile_url:
          "https://wegotthiscovered.com/wp-content/uploads/2022/04/Luffy_age_One_Piece_17.jpg",
      },
    ],
  },
  124: {
    channel_info: {
      channel_id: 124,
      channel_name: "PM and developers",
      unread: 1,
    },
    members: [
      {
        user_id: 12347,
        user_name: "John Goh",
        email_address: "john.goh@mail.com",
        profile_url:
          "https://www.personality-database.com/profile_images/1217.png",
      },
      {
        user_id: 12345,
        user_name: "Jason Ngan",
        email_address: "jason.ngan@mail.com",
        profile_url:
          "https://staticg.sportskeeda.com/editor/2021/12/b5306-16406537216511-1920.jpg",
      },
    ],
  },
};

export const getChannelMembers = (channelID: number): channelMembers => {
  return channelsMembersData[channelID];
}