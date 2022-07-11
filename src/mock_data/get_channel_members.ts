// GET /api/channel/members
export const channelMembers = {
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
      user_id: 12345,
      user_name: "Peter Tan",
      email_address: "peter.tan@mail.com",
      profile_url:
        "https://wegotthiscovered.com/wp-content/uploads/2022/04/Luffy_age_One_Piece_17.jpg",
    },
  ],
};