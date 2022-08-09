import React, { useState, useContext } from "react";

import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { DataContext } from "../../../_shared/hooks/dataContext";
import Message from "./Message/Message";

type ChatroomProps = {};

const Chatroom = (props: ChatroomProps): JSX.Element => {
  const {currChannel, createMessage, messageLoading, channelsMessagesMap} = useContext(
    DataContext
  )

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
    createMessage(currChannel, value);
    setValue("")
  }

  return (
    <div className="chatroom">
      <div className="chatbox">
        {messageLoading ||
        !channelsMessagesMap ||
        !channelsMessagesMap[currChannel] ? (
          <div></div>
        ) : (
          channelsMessagesMap[currChannel].messages
            .map((message) => {
              return <Message key={message.message_id} msg={message} />;
            })
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
        <Button
          size="small"
          type="primary"
          icon={<SendOutlined />}
          onClick={addMsgHandler}
        />
      </div>
    </div>
  );
};

export default Chatroom;
