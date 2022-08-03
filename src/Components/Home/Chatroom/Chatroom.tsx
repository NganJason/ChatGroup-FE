import React, { useState, useContext } from "react";

import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Message from "./Message/Message";
import { message } from "../../../_shared/types/types";
import { DataContext } from "../../../_shared/hooks/dataContext";
import { User } from "../../../_shared/apis/chat_group";

type ChatroomProps = {
  currChannelID: string;
  getMessages: (channelID: string) => message[]
  addMessage: (senderInfo: User, channelID: string, content: string) => void
};

const Chatroom = (props: ChatroomProps): JSX.Element => {
  const { currChannelID, getMessages, addMessage } = props;
  const { user } = useContext(DataContext)

  const [rows, setRows] = useState<number>(1)
  const [value, setValue] = useState<string>("")

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key==="Backspace") {
      if (rows === 1) {
        return
      }

      if (value[value.length-1] === "\n") {
        setRows(rows - 1)
        return
      }
    }

    if (e.shiftKey && e.key === "Enter") {
      setRows(rows + 1);
      return;
    } else if (e.key === "Enter") {
      e.preventDefault()
      addMsgHandler();
      setRows(1)
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let rowHeight = 22

    if (e.target.scrollHeight - e.target.clientHeight !== 0) {
      let finalRows = Math.floor(e.target.scrollHeight/rowHeight)
      setRows(finalRows);
    }

    setValue(e.target.value)
  }

  const addMsgHandler = (): void => {
    addMessage(user, currChannelID, value);
    setValue("")
  }

  return (
    <div className="chatroom">
      <div className="chatbox">
        {getMessages(currChannelID) ? (
          getMessages(currChannelID).map((msg) => (
            <Message key={msg.message_id} msg={msg} />
          ))
        ) : (
          <div></div>
        )}
      </div>
      <div className="input">
        <Input.TextArea
          rows={rows}
          value={value}
          className="bg-four text primary"
          placeholder="Type a message here"
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        ></Input.TextArea>
        <Button size="small" type="primary" icon={<SendOutlined />} onClick={addMsgHandler}/>
      </div>
    </div>
  );
};

export default Chatroom;
