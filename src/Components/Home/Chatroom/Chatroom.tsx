import React from "react";

import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Message from "./Message/Message";

const Chatroom = (): JSX.Element => (
  <div className="chatroom">
    <div className="chatbox">
      <Message name={"Jason"} /> <Message name={"Jason1"} />
      <Message name={"Jason2"} />
      <Message name={"Jason3"} />
      <Message name={"Jason4"} />
      <Message name={"Jason2"} />
      <Message name={"Jason3"} />
      <Message name={"Jason4"} />
    </div>
    <div className="input">
      <Input
        className="bg-four text primary"
        placeholder="Type a message here"
      ></Input>
      <Button size="small" type="primary" icon={<SendOutlined />} />
    </div>
  </div>
);

export default Chatroom;
