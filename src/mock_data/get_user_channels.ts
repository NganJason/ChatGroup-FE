// GET /api/user/channels

import { userChannels } from "../_shared/types/types";

export const usersChannelsData: { [key: number]: userChannels } = {
  12345: {
    user_info: {
      user_id: 12345,
      user_name: "Jason Ngan",
      email_address: "jason.ngan@mail.com",
      profile_url:
        "https://staticg.sportskeeda.com/editor/2021/12/b5306-16406537216511-1920.jpg",
    },
    channels: [
      {
        channel_id: "123",
        channel_name: "Front-end developers",
        unread: 2,
      },
      {
        channel_id: "124",
        channel_name: "PM and developers",
        unread: 1,
      },
    ],
  },
  12346: {
    user_info: {
      user_id: 12346,
      user_name: "Peter Tan",
      email_address: "peter.tan@mail.com",
      profile_url:
        "https://wegotthiscovered.com/wp-content/uploads/2022/04/Luffy_age_One_Piece_17.jpg",
    },
    channels: [
      {
        channel_id: "123",
        channel_name: "Front-end developers",
        unread: 2,
      },
    ],
  },
  12347: {
    user_info: {
      user_id: 12347,
      user_name: "John Goh",
      email_address: "john.goh@mail.com",
      profile_url:
        "https://www.personality-database.com/profile_images/1217.png",
    },
    channels: [
      {
        channel_id: "124",
        channel_name: "PM and developers",
        unread: 1,
      },
    ],
  },
};

export const getUserChannels = (userID: number): userChannels => {
  return usersChannelsData[userID];
}