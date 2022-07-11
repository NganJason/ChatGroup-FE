// GET /api/user/channels

export const userChannels = {
  user_info: {
    user_id: 12345,
    user_name: "Jason Ngan",
    email_address: "jason.ngan@mail.com",
    profile_url:
      "https://staticg.sportskeeda.com/editor/2021/12/b5306-16406537216511-1920.jpg",
  },
  channels: [
    {
        channel_id: 123,
        channel_name: "Front-end developers",
        unread: 2,
    },
    {
        channel_id: 124,
        channel_name: "PM and developers",
        unread: 0,
    }
  ]
};